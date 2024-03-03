package com.medical.springboot.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medical.springboot.models.entity.DiagnosticImageEntity;
import com.medical.springboot.models.entity.DoctorEntity;
import com.medical.springboot.models.entity.MedicalEntity;
import com.medical.springboot.models.entity.PatientEntity;
import com.medical.springboot.models.request.DiagnosticImageRequest;
import com.medical.springboot.models.request.DoctorRequest;
import com.medical.springboot.models.response.BaseResponse;
import com.medical.springboot.services.AccountService;
import com.medical.springboot.services.DoctorService;
import com.medical.springboot.services.MedicalService;
import com.medical.springboot.services.PatientService;
import com.medical.springboot.utils.IAuthenticationFacade;

@RestController
@RequestMapping("/api/auth/doctor")
public class DoctorController {
    private static final Logger logger = LoggerFactory.getLogger(DoctorController.class);
    @Autowired
    private DoctorService doctorService;
    @Autowired
    private MedicalService medicalService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private PatientService patientService;
    @Autowired
    private IAuthenticationFacade authenticationFacade;

    // Get all doctors
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/reads")
    public ResponseEntity<BaseResponse> getAll(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "5", required = false) int size,
            @RequestParam(name = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(name = "sortDir", defaultValue = "asc", required = false) String sortDir) {
        BaseResponse response = new BaseResponse();
        logger.info("Get all doctors");
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<DoctorEntity> result = doctorService.readAll(pageable);
        response.setMessage("Get all doctors successfully");
        response.setData(new HashMap<>() {
            {
                put("doctors", result.getContent());
                put("total", result.getTotalElements());
                put("count", result.getNumberOfElements());
            }
        });
        return ResponseEntity.status(200).body(response);
    }

    // Read detail doctor
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/read/{id}")
    public ResponseEntity<BaseResponse> read(@PathVariable("id") String id) {
        BaseResponse response = new BaseResponse();
        logger.info("Read detail doctor");
        DoctorEntity doctorResult = doctorService.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        response.setMessage("Read detail doctor successfully");
        response.setData(new HashMap<>() {
            {
                put("doctor", doctorResult);
            }
        });
        return ResponseEntity.status(200).body(response);
    }

    // update doctor
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse> update(@RequestBody DoctorRequest doctor,
            @PathVariable("id") String id) {
        BaseResponse response = new BaseResponse();
        logger.info("Update doctor");
        DoctorEntity doctorResult = doctorService.findById(id).map(doctorEntity -> {
            doctorEntity.setFullName(doctor.getFullName());
            doctorEntity.setBirthday(doctor.getBirthday());
            doctorEntity.setGender(doctor.getGender());
            doctorEntity.setAddress(doctor.getAddress());
            doctorEntity.setPhoneNumber(doctor.getPhoneNumber());
            doctorEntity.setIdentificationCard(doctor.getIdentificationCard());
            doctorEntity.setDepartment(doctor.getDepartment());
            doctorEntity.setTitle(doctor.getTitle());
            return doctorService.update(doctorEntity);
        }).orElseThrow(() -> new RuntimeException("Doctor not found"));
        response.setMessage("Update doctor successfully");
        response.setData(new HashMap<>() {
            {
                put("doctor", doctorResult);
            }
        });
        return ResponseEntity.status(200).body(response);
    }

    // delete doctor
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse> delete(@PathVariable("id") String id) {
        BaseResponse response = new BaseResponse();
        logger.info("Delete doctor");
        Optional<DoctorEntity> doctor = doctorService.findById(id);
        if (doctor.isPresent()) {
            doctorService.delete(id);
            accountService.findFirstByEmail(doctor.get().getEmail()).ifPresent(account -> {
                accountService.deactiveAccount(account.getId());
            });
            response.setMessage("Delete doctor successfully");
            response.setData(null);
            return ResponseEntity.status(200).body(response);
        }
        response.setMessage("Doctor not found");
        response.setData(null);
        return ResponseEntity.status(404).body(response);
    }

    // Predict image
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DOCTOR')")
    @PostMapping("/predict")
    public ResponseEntity<BaseResponse> predict(@RequestBody Map<String, String> request) {
        String urlImage = request.get("image");
        BaseResponse response = new BaseResponse();
        logger.info("Predict image");
        //
        String result = doctorService.diagnosisImage(urlImage);
        //
        response.setMessage("Predict image successfully");
        response.setData(new HashMap<>() {
            {
                put("result", result);
            }
        });
        return ResponseEntity.status(200).body(response);
    }

    // Save result to database
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DOCTOR')")
    @PostMapping("/save/{id}")
    public ResponseEntity<BaseResponse> save(@RequestBody DiagnosticImageRequest request,
            @PathVariable("id") String id) {
        String doctorId = authenticationFacade.getAuthentication().getName().split(",")[0];
        BaseResponse response = new BaseResponse();
        logger.info("Save result predict image");
        // Create object diagnosis image
        DiagnosticImageEntity diagnosticImage = new DiagnosticImageEntity(request.getMethod(), request.getContent(),
                doctorId, request.getUrlImage(), request.getConclude());
        // Save to database
        // find medical by id
        MedicalEntity medicalResult = medicalService.findById(id).map(medical -> {
            // set diagnosis image
            medical.setDiagnosticImages(diagnosticImage);
            // return medical
            return medicalService.update(medical);
        }).orElseThrow(() -> new RuntimeException("Medical not found"));
        // Return response
        response.setMessage("Save result successfully");
        response.setData(new HashMap<>() {
            {
                put("medical", medicalResult);
            }
        });
        return ResponseEntity.status(200).body(response);
    }

    // Get all patients of doctor

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/patients/{id_doctor}")
    public ResponseEntity<BaseResponse> getAllPatientsOfDoctor(@PathVariable("id_doctor") String id_doctor) {
        return getPatients(id_doctor);
    }

    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    @GetMapping("/patients")
    public ResponseEntity<BaseResponse> getAllPatients() {
        String doctorId = authenticationFacade.getAuthentication().getName().split(",")[0];
        return getPatients(doctorId);
    }

    private ResponseEntity<BaseResponse> getPatients(String doctorId) {
        BaseResponse response = new BaseResponse();
        logger.info("Get all patients of doctor");

        List<MedicalEntity> patients = medicalService.getAllPatients(doctorId);
        Set<String> patientIds = new HashSet<>();
        patients.stream().forEach(medical -> {
            patientIds.add(medical.getPatientId());
        });
        Set<MedicalEntity> uniquePatients = new HashSet<>();
        patientIds.stream().forEach(patientId -> {
            for (MedicalEntity medical : patients) {
                if (medical.getPatientId().equals(patientId)) {
                    uniquePatients.add(medical);
                    break;
                }
            }
        });

        response.setMessage("Get all patients of doctor successfully");
        List<Map<String, Object>> result = new ArrayList<>();
        uniquePatients.stream().forEach(medical -> {
            PatientEntity patientEntity = patientService.findById(medical.getPatientId()).get();
            Map<String, Object> item = new HashMap<>();
            item.put("id", patientEntity.getId());
            item.put("fullName", patientEntity.getFullName());
            result.add(item);
        });
        response.setData(new HashMap<>() {
            {
                put("patients", result);
            }
        });
        return ResponseEntity.status(200).body(response);
    }
}
