package com.medical.springboot.controllers;

import org.mindrot.jbcrypt.BCrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medical.springboot.models.entity.AccountEntity;
import com.medical.springboot.models.entity.PatientEntity;
import com.medical.springboot.models.request.SignupRequest;
import com.medical.springboot.models.response.BaseResponse;
import com.medical.springboot.services.AccountService;
import com.medical.springboot.services.PatientService;
import com.medical.springboot.services.VerifyService;

@RestController
@RequestMapping("/api")
public class SignupController {

    private final static Logger logger = LoggerFactory.getLogger(SignupController.class);

    @Autowired
    private VerifyService verifyService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private PatientService patientService;

    @PostMapping("/signup")
    public ResponseEntity<BaseResponse> signUp(@RequestBody SignupRequest signupRequest) throws Exception {
        BaseResponse response = new BaseResponse();

        logger.info("SignUp request");
        logger.info("Username: " + signupRequest.getFullname());
        //
        // Verify code
        if (!verifyService.verifyCode(signupRequest.getEmail(), signupRequest.getVerifycode())) {
            response.setMessage("Verify code is incorrect");
            response.setData(null);
            return ResponseEntity.status(401).body(response);
        }
        // Create account
        String encryptPass = BCrypt.hashpw(signupRequest.getPassword(), BCrypt.gensalt(10));
        accountService.create(new AccountEntity(signupRequest.getEmail(), encryptPass, "PATIENT", true));
        //
        patientService.create(new PatientEntity(signupRequest.getFullname(), null, null,
                null, null, signupRequest.getEmail(), "",
                null, null, true));
        // delete verify code
        verifyService.delete(signupRequest.getEmail());

        logger.info("Sign up successfully");
        response.setMessage("Sign up successfully");
        response.setData(null);
        return ResponseEntity.status(201).body(response);
    }
}
