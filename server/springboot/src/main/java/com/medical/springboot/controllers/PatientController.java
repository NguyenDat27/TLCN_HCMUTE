package com.medical.springboot.controllers;

import java.util.HashMap;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medical.springboot.models.entity.AccountEntity;
import com.medical.springboot.models.entity.PatientEntity;
import com.medical.springboot.models.request.PatientRequest;
import com.medical.springboot.models.response.BaseResponse;
import com.medical.springboot.models.response.PatientSearchResponse;
import com.medical.springboot.services.AccountService;
import com.medical.springboot.services.PatientService;
import com.medical.springboot.utils.IAuthenticationFacade;

/**
 * PapatientRecordController
 */
@RestController
@RequestMapping("/api/auth/patientrecord")
public class PatientController {

    private static final Logger logger = LoggerFactory.getLogger(PatientController.class);

    @Autowired
    private PatientService patientService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private IAuthenticationFacade authenticationFacade;

    @PreAuthorize("hasRole('ROLE_PATIENT')")
    @PostMapping("/create/me")
    public ResponseEntity<BaseResponse> createMe(@RequestBody PatientRequest patientRequest) {
        String personId = authenticationFacade.getAuthentication().getName().split(",")[0];
        BaseResponse response = new BaseResponse();
        logger.info("Create patient record request");
        // update isDeleted = false
        patientService.findById(personId).map(patient -> {
            patient.setFullName(patientRequest.getFullname());
            patient.setBirthday(patientRequest.getBirthday());
            patient.setGender(patientRequest.getGender());
            patient.setAddress(patientRequest.getAddress());
            patient.setPhoneNumber(patientRequest.getPhonenumber());
            patient.setIdentificationCard(patientRequest.getIdentificationCard());
            patient.setAllergy(patientRequest.getAllergy());
            patient.setHealthInsurance(patientRequest.getHealthinsurance());
            patient.setIsDeleted(false);
            return patientService.create(patient);
        }).orElseThrow(() -> new RuntimeException("Error: Patient not found"));
        // response
        response.setMessage("Create patient record successfully");
        response.setData(null);
        return ResponseEntity.status(201).body(response);
    }

    // API Create patient record
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DOCTOR')")
    @PostMapping("/create")
    public ResponseEntity<BaseResponse> create(@RequestBody PatientRequest patientRequest) {
        BaseResponse response = new BaseResponse();
        logger.info("Create patient record request");
        // create patient record
        accountService.create(new AccountEntity(patientRequest.getEmail(),
                "$2a$10$ftww/fPnJphDVEze5D0QveUhDdK3ZXy0yczMNEaNiaLmh9RNIOUGy", "PATIENT", true));
        //
        patientService.create(new PatientEntity(patientRequest.getFullname(), patientRequest.getBirthday(),
                patientRequest.getGender(), patientRequest.getAddress(), patientRequest.getPhonenumber(),
                patientRequest.getEmail(), patientRequest.getIdentificationCard(), patientRequest.getAllergy(),
                patientRequest.getHealthinsurance(), false));
        // response
        response.setMessage("Create patient record successfully");
        response.setData(null);
        return ResponseEntity.status(201).body(response);
    }

    // API Read patient record
    @PreAuthorize("hasRole('ROLE_PATIENT')")
    @GetMapping("/read/me")
    public ResponseEntity<BaseResponse> read() {
        String personId = authenticationFacade.getAuthentication().getName().split(",")[0];
        return readPatient(personId);
    }

    // API Read all patient record
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DOCTOR')")
    @GetMapping("/reads")
    public ResponseEntity<BaseResponse> readAll() {
        BaseResponse response = new BaseResponse();
        logger.info("Read all patient records request");
        // read all patient records
        Pageable pageable = Pageable.unpaged();
        Page<PatientEntity> result = patientService.readAll(pageable);
        // response
        response.setMessage("Read all patient records successfully");
        response.setData(new HashMap<String, Object>() {
            {
                put("count", result.getNumberOfElements());
                put("total", result.getTotalElements());
                put("patients", result.getContent().stream().map(patient -> {
                    return new PatientSearchResponse(patient.getId(), patient.getEmail(), patient.getFullName(),
                            patient.getBirthday(), patient.getPhoneNumber());
                }).collect(Collectors.toList()));
            }
        });
        return ResponseEntity.status(200).body(response);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DOCTOR')")
    @GetMapping("/read/{id}")
    public ResponseEntity<BaseResponse> read(@PathVariable("id") String personId) {
        return readPatient(personId);
    }

    private ResponseEntity<BaseResponse> readPatient(String personId) {
        BaseResponse response = new BaseResponse();
        logger.info("Read patient record request");
        logger.info("Patient id: {}", personId);
        // Check patient record exists
        if (!patientService.isexistsByIdAndIsDeleted(personId, false)) {
            response.setMessage(
                    "Patient record of " + personId + " does not exist. " + "Please create new patient record");
            response.setData(null);
            return ResponseEntity.status(404).body(response);
        }
        PatientEntity patient = patientService.findFirstById(personId);
        // response
        response.setMessage("Read patient record successfully");
        response.setData(new HashMap<String, Object>() {
            {
                put("patient", patient);
            }
        });
        return ResponseEntity.status(200).body(response);
    }

    // API Update patient record
    @PreAuthorize("hasRole('ROLE_PATIENT')")
    @PutMapping("/update/me")
    public ResponseEntity<BaseResponse> update(@RequestBody PatientRequest patientRequest) {
        String personId = authenticationFacade.getAuthentication().getName().split(",")[0];
        return updatePatient(personId, patientRequest);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DOCTOR')")
    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse> update(@PathVariable("id") String personId,
            @RequestBody PatientRequest patientRequest) {
        return updatePatient(personId, patientRequest);
    }

    private ResponseEntity<BaseResponse> updatePatient(String id, PatientRequest patientRequest) {
        BaseResponse response = new BaseResponse();
        logger.info("Update patient record request");
        logger.info("Patient id: {}", id);
        // Check patient record exists
        if (!patientService.isexistsByIdAndIsDeleted(id, false)) {
            response.setMessage("Patient record of " + id + " does not exist. "
                    + "Please create new patient record");
            response.setData(null);
            return ResponseEntity.status(404).body(response);
        }
        // update patient record
        PatientEntity patientResult = patientService.findById(id).map(patient -> {
            patient.setFullName(patientRequest.getFullname());
            patient.setBirthday(patientRequest.getBirthday());
            patient.setGender(patientRequest.getGender());
            patient.setAddress(patientRequest.getAddress());
            patient.setPhoneNumber(patientRequest.getPhonenumber());
            patient.setIdentificationCard(patientRequest.getIdentificationCard());
            patient.setAllergy(patientRequest.getAllergy());
            patient.setHealthInsurance(patientRequest.getHealthinsurance());
            return patientService.update(patient);
        }).orElseThrow(() -> new RuntimeException("Error: Patient not found"));

        response.setMessage("Update patient record successfully");
        response.setData(new HashMap<String, Object>() {
            {
                put("patient", patientResult);
            }
        });
        return ResponseEntity.status(200).body(response);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse> delete(@PathVariable("id") String id) {
        BaseResponse response = new BaseResponse();
        logger.info("Delete patient record request");
        // Check Patient record exists
        if (!patientService.isexistsById(id)) {
            response.setMessage("Patient record does not exist");
            response.setData(null);
            return ResponseEntity.status(404).body(response);
        }
        // delete patient record
        if (patientService.delete(id)) {
            response.setMessage("Delete patient record successfully");
            response.setData(null);
            return ResponseEntity.status(200).body(response);
        }
        response.setMessage("Delete patient record failed");
        response.setData(null);
        return ResponseEntity.status(500).body(response);
    }

    // API Search patient record
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DOCTOR')")
    @GetMapping("/search")
    public ResponseEntity<BaseResponse> search(
            @RequestParam(name = "keyword", defaultValue = "", required = false) String keyword,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "5", required = false) int size,
            @RequestParam(name = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(name = "sortDir", defaultValue = "asc", required = false) String sortDir) {
        BaseResponse response = new BaseResponse();
        logger.info("Search patient records request");
        logger.info("Keyword: {}", keyword);
        // search
        Page<PatientEntity> result = patientService.search(keyword, page, size, sortBy, sortDir);
        response.setMessage("Search patient records successfully");
        response.setData(new HashMap<>() {
            {
                put("count", result.getNumberOfElements());
                put("total", result.getTotalElements());
                put("medicals", result.getContent().stream().map(patient -> {
                    return new PatientSearchResponse(patient.getId(), patient.getEmail(), patient.getFullName(),
                            patient.getBirthday(), patient.getPhoneNumber());
                }).collect(Collectors.toList()));
            }
        });
        return ResponseEntity.status(200).body(response);
    }
}