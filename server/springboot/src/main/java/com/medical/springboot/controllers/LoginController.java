package com.medical.springboot.controllers;

import java.util.HashMap;

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
import com.medical.springboot.models.entity.DoctorEntity;
import com.medical.springboot.models.entity.PatientEntity;
import com.medical.springboot.models.request.LoginRequest;
import com.medical.springboot.models.response.BaseResponse;
import com.medical.springboot.services.AccountService;
import com.medical.springboot.services.DoctorService;
import com.medical.springboot.services.PatientService;
import com.medical.springboot.services.TokenService;

/**
 * AuthController
 */
@RestController
@RequestMapping("/api")
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private TokenService tokenService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private PatientService patientService;
    @Autowired
    private DoctorService doctorService;

    // API Login
    @PostMapping("/login")
    public ResponseEntity<BaseResponse> generateToken(@RequestBody LoginRequest loginRequest) throws Exception {
        BaseResponse response = new BaseResponse();
        logger.info("Login request");

        if (accountService.isExistsByEmail(loginRequest.getEmail())) {
            if (accountService.isExistsByEmailAndStatus(loginRequest.getEmail(), false)) {
                logger.info("Email already exists but not active");
                response.setMessage("Account has been locked");
                response.setData(null);
                return ResponseEntity.status(403).body(response);
            }
            AccountEntity account = accountService.findFirstByEmail(loginRequest.getEmail()).get();
            if (!BCrypt.checkpw(loginRequest.getPassword(), account.getPassword())) {
                logger.info("Password not match");
                response.setMessage("The Username or Password is Incorrect");
                response.setData(null);
                return ResponseEntity.status(401).body(response);
            }
            //
            String person_FullName = "";
            String person_Id = "";
            switch (account.getRole()) {
                case "ADMIN":
                    logger.info("Role: {}", account.getRole());
                    person_FullName = "ADMIN";
                    person_Id = "ADMIN";
                    break;
                case "DOCTOR":
                    logger.info("Role: {}", account.getRole());
                    DoctorEntity doctor = doctorService.findByEmail(loginRequest.getEmail()).orElseThrow(
                            () -> new NullPointerException("Doctor not found"));
                    person_FullName = doctor.getFullName();
                    person_Id = doctor.getId();
                    break;
                case "PATIENT":
                    logger.info("Role: {}", account.getRole());
                    PatientEntity patient = patientService.findByEmail(loginRequest.getEmail())
                            .orElseThrow(() -> new NullPointerException("Patient not found"));
                    person_FullName = patient.getFullName();
                    person_Id = patient.getId();
                    break;
                default:
                    break;
            }

            String token = tokenService.generateToken(account, person_Id);
            logger.info("Token generated: {}", token);
            logger.info("For Username: {}", loginRequest.getEmail());
            //
            String userName = person_FullName;
            response.setMessage("Create token successfully");
            response.setData(new HashMap<String, String>() {
                {
                    put("token", token);
                    put("fullname", userName);
                    put("email", loginRequest.getEmail());
                    put("role", account.getRole());
                }
            });
            //
            return ResponseEntity.status(200).body(response);
        }
        logger.info("Email not match");
        response.setMessage("The Username or Password is Incorrect");
        response.setData(null);
        return ResponseEntity.status(401).body(response);
    }
}