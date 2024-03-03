package com.medical.springboot.controllers;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medical.springboot.models.entity.PatientEntity;
import com.medical.springboot.models.request.EmailsignupRequest;
import com.medical.springboot.models.response.BaseResponse;
import com.medical.springboot.services.AccountService;
import com.medical.springboot.services.EmailService;
import com.medical.springboot.services.PatientService;
import com.medical.springboot.services.VerifyService;

@RestController
@RequestMapping("/api")
public class EmailController {

    @Autowired
    private EmailService emailService;
    @Autowired
    private VerifyService verifyService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private PatientService patientService;

    private static final Logger logger = LoggerFactory.getLogger(EmailController.class);

    // API Send Email Verify Code for Sign Up
    @PostMapping("/sendemailsignup")
    public ResponseEntity<BaseResponse> sendEmailSignUp(@RequestBody EmailsignupRequest request) throws Exception {
        BaseResponse response = new BaseResponse();
        //
        if (accountService.isExistsByEmail(request.getToemail())) {
            response.setMessage("Email already exists");
            response.setData(null);
            return ResponseEntity.status(409).body(response);
        }
        //
        return sendEmail(request.getToemail(), request.getUsername());
    }

    // API Send Email Verify Code for Reset Password
    @PostMapping("/sendemailresetpass")
    public ResponseEntity<BaseResponse> sendEmailResetPass(@RequestBody Map<String, String> requestBody)
            throws Exception {
        String email = requestBody.get("email");
        BaseResponse response = new BaseResponse();
        logger.info("ResetPass request");
        logger.info("Email: " + email);
        //
        if (!accountService.isExistsByEmail(email)) {
            response.setMessage("Email does not exist");
            response.setData(null);
            return ResponseEntity.status(404).body(response);
        }
        if (accountService.isExistsByEmailAndStatus(email, false)) {
            logger.info("Email already exists but not active");
            response.setMessage("Account has been locked");
            response.setData(null);
            return ResponseEntity.status(403).body(response);
        }
        //
        PatientEntity patient = patientService.findByEmail(email).orElseThrow(() -> new Exception("Patient not found"));
        return sendEmail(patient.getEmail(), patient.getFullName());
    }

    // Method Send Email Verify Code
    private ResponseEntity<BaseResponse> sendEmail(String toemail, String username) throws Exception {
        //
        BaseResponse response = new BaseResponse();
        logger.info("Method SendEmail");
        logger.info("To email: " + toemail);
        logger.info("User name: " + username);
        //
        emailService.sendEmail(toemail, username,
                verifyService.create(toemail));

        //
        logger.info("Email sent successfully");
        response.setMessage("Email sent successfully");
        response.setData(null);
        return ResponseEntity.status(200).body(response);
    }
}
