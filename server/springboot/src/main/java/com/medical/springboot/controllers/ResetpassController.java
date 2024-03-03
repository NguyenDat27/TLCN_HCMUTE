package com.medical.springboot.controllers;


import org.mindrot.jbcrypt.BCrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medical.springboot.models.request.ChangePasswordRequest;
import com.medical.springboot.models.request.ResetpassRequest;
import com.medical.springboot.models.response.BaseResponse;
import com.medical.springboot.services.AccountService;
import com.medical.springboot.services.VerifyService;
import com.medical.springboot.utils.IAuthenticationFacade;

/**
 * ResetpassController
 */
@RestController
@RequestMapping("/api")
public class ResetpassController {

    private static final Logger logger = LoggerFactory.getLogger(ResetpassController.class);

    @Autowired
    private VerifyService verifyService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private IAuthenticationFacade authenticationFacade;

    // API Reset Password
    @PostMapping("/resetpass")
    public ResponseEntity<BaseResponse> resetPass(@RequestBody ResetpassRequest resetPassRequest) throws Exception {
        BaseResponse response = new BaseResponse();
        logger.info("ResetPass request");
        // // Check email exists
        if (!accountService.isExistsByEmail(resetPassRequest.getEmail())) {
            logger.info("Email not exists");
            response.setMessage("Email not exists");
            response.setData(null);
            return ResponseEntity.status(404).body(response);
        }
        // Verify code
        if (!verifyService.verifyCode(resetPassRequest.getEmail(), resetPassRequest.getVerifycode())) {
            logger.info("Verify code is incorrect");
            response.setMessage("Verify code is incorrect");
            response.setData(null);
            return ResponseEntity.status(401).body(response);
        }
        // Update password
        accountService.findFirstByEmail(resetPassRequest.getEmail()).map(account -> {
            account.setPassword(BCrypt.hashpw(resetPassRequest.getPassword(),
                    BCrypt.gensalt(10)));
            return accountService.update(account);
        }).orElseThrow(() -> new Exception("Account not found"));
        response.setMessage("Update password successfully");
        response.setData(null);
        // delete verify code
        verifyService.delete(resetPassRequest.getEmail());

        logger.info("Update password successfully");
        return ResponseEntity.status(200).body(response);
    }

    // API Change Password auth
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DOCTOR', 'ROLE_PATIENT')")
    @PostMapping("/auth/changepass/me")
    public ResponseEntity<BaseResponse> changePass(@RequestBody ChangePasswordRequest changePasswordRequest)
            throws Exception {
        String id = authenticationFacade.getAuthentication().getName().split(",")[1];
        BaseResponse response = new BaseResponse();
        logger.info("ChangePass request");
        //
        // Verify password old
        String passOld = accountService.findById(id).orElseThrow(() -> new RuntimeException("Error: account not found"))
                .getPassword();
        if (!BCrypt.checkpw(changePasswordRequest.getPasswordOld(), passOld)) {
            logger.info("Password not match");
            response.setMessage("Password is Incorrect");
            response.setData(null);
            return ResponseEntity.status(401).body(response);
        }
        // Update password new
        accountService.findById(id)
                .map(account -> {
                    account.setPassword(
                            BCrypt.hashpw(changePasswordRequest.getPasswordNew(),
                                    BCrypt.gensalt(10)));
                    return accountService.update(account);
                }).orElseThrow(() -> new Exception("Account not found"));
        response.setMessage("Change password successfully");
        response.setData(null);
        return ResponseEntity.status(200).body(response);
    }
}