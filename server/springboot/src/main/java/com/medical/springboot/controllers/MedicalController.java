package com.medical.springboot.controllers;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medical.springboot.models.entity.MedicalEntity;
import com.medical.springboot.models.request.MedicalRequest;
import com.medical.springboot.models.response.BaseResponse;
import com.medical.springboot.models.response.MedicalDetailResponse;
import com.medical.springboot.models.response.MedicalResponse;
import com.medical.springboot.services.DoctorService;
import com.medical.springboot.services.MedicalService;
import com.medical.springboot.services.PatientService;
import com.medical.springboot.utils.IAuthenticationFacade;

// MedicalController
@RestController
@RequestMapping("/api/auth/medical")
public class MedicalController {
    private static final Logger LOGGER = LoggerFactory.getLogger(LogoutController.class);
    @Autowired
    private MedicalService medicalService;
    @Autowired
    private PatientService patientService;
    @Autowired
    private DoctorService doctorService;
    @Autowired
    private IAuthenticationFacade authenticationFacade;

    // Doctor create for patient
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DOCTOR')")
    @PostMapping("/create")
    public ResponseEntity<BaseResponse> create(@RequestBody MedicalRequest request) {
        String doctorId = authenticationFacade.getAuthentication().getName().split(",")[0];
        BaseResponse response = new BaseResponse();
        LOGGER.info("Create medical request");
        LOGGER.info("Medical of patient: {}", request.getPatientId());
        MedicalEntity medicalResult = medicalService.create(new MedicalEntity(request.getClinics(), request.getDate(),
                doctorId, request.getClinicalDiagnosis(), null,
                "", request.getPatientId(), request.getBloodPressure()));
        if (medicalResult != null) {
            response.setMessage("Create medical success for patient: " + request.getPatientId());
            response.setData(null);
            return ResponseEntity.status(201).body(response);
        }
        response.setMessage("Create medical failed");
        response.setData(null);
        return ResponseEntity.status(500).body(response);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DOCTOR')")
    @GetMapping("/read/{id}")
    public ResponseEntity<BaseResponse> read(@PathVariable("id") String patientId,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "5", required = false) int size,
            @RequestParam(name = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(name = "sortDir", defaultValue = "asc", required = false) String sortDir) {
        LOGGER.info("Read medicals for doctor request");
        return readMedical(patientId, page, size, sortBy, sortDir, false);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DOCTOR')")
    @GetMapping("/reads/{id}")
    public ResponseEntity<BaseResponse> read(@PathVariable("id") String patientId) {
        LOGGER.info("Read all medicals for doctor request");
        return readMedical(patientId, 0, 0, "", "", true);
    }

    // Read medicals of patientId
    private ResponseEntity<BaseResponse> readMedical(String patientId, int page, int size, String sortBy,
            String sortDir, boolean isReadAll) {
        BaseResponse response = new BaseResponse();
        LOGGER.info("Read medicals request");
        LOGGER.info("Patient id: {}", patientId);
        response.setMessage("Read medicals success");
        Page<MedicalEntity> result = medicalService.readAllByPatientId(patientId, page, size, sortBy, sortDir,
                isReadAll);

        response.setData(new HashMap<>() {
            {
                put("count", result.getNumberOfElements());
                put("total", result.getTotalElements());
                put("medicals", result.getContent().stream().map(medical -> {
                    String namePatient = patientService.findById(medical.getPatientId())
                            .orElseThrow(() -> new RuntimeException("Patient not found")).getFullName();
                    String nameDoctor = medical.getDoctorId().equals("ADMIN") ? "ADMIN"
                            : doctorService.findById(medical.getDoctorId())
                                    .orElseThrow(() -> new RuntimeException("Doctor not found")).getFullName();
                    return new MedicalResponse(medical.getId(), medical.getDate(), namePatient, nameDoctor);
                }).collect(Collectors.toList()));
            }
        });
        return ResponseEntity.status(200).body(response);
    }

    // Read medicals detail
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DOCTOR', 'ROLE_PATIENT')")
    @GetMapping("/read/detail/{id}")
    public ResponseEntity<BaseResponse> readDetail(@PathVariable("id") String medicalId) {
        BaseResponse response = new BaseResponse();
        LOGGER.info("Read medicals detail request");
        LOGGER.info("Medical id: {}", medicalId);
        MedicalDetailResponse medicalResponse = medicalService.findById(medicalId).map(medical -> {
            MedicalDetailResponse medicalDetail = new MedicalDetailResponse();
            medicalDetail.setId(medical.getId());
            medicalDetail.setClinics(medical.getClinics());
            medicalDetail.setDate(medical.getDate());
            medicalDetail.setNameDoctor(medical.getDoctorId().equals("ADMIN") ? "ADMIN"
                    : doctorService.findById(medical.getDoctorId())
                            .orElseThrow(() -> new RuntimeException("Doctor not found")).getFullName());
            medicalDetail.setNamePatient(patientService.findById(medical.getPatientId())
                    .orElseThrow(() -> new RuntimeException("Patient not found")).getFullName());
            medicalDetail.setClinicalDiagnosis(medical.getClinicalDiagnosis());
            medicalDetail.setDiagnosis(medical.getDiagnosis());
            medicalDetail.setDiagnosticImages(medical.getDiagnosticImages() == null ? null : new HashMap<>() {
                {
                    put("method", medical.getDiagnosticImages().getMethod());
                    put("content", medical.getDiagnosticImages().getContent());
                    put("doctor", medical.getDiagnosticImages().getDoctorIdPerform().equals("ADMIN") ? "ADMIN" : (doctorService.findById(medical.getDiagnosticImages().getDoctorIdPerform())
                            .orElseThrow(() -> new RuntimeException("Doctor not found")).getFullName()));
                    put("urlImage", medical.getDiagnosticImages().getUrlImage());
                    put("conclude", medical.getDiagnosticImages().getConclude());
                }
            });
            return medicalDetail;
        }).orElseThrow(() -> new RuntimeException("Medical not found"));

        response.setMessage("Read medicals detail success");
        response.setData(new HashMap<>() {
            {
                put("medical", medicalResponse);
            }
        });
        return ResponseEntity.status(200).body(response);
    }

    // Update medical for doctor
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DOCTOR')")
    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse> update(@RequestBody MedicalRequest request,
            @PathVariable("id") String medicalId) {
        String doctorId = authenticationFacade.getAuthentication().getName().split(",")[0];
        BaseResponse response = new BaseResponse();
        LOGGER.info("Update medical of patient request");
        LOGGER.info("Medical of patient: {}", request.getPatientId());
        MedicalEntity medicalResult = medicalService.findById(medicalId).map(medical -> {
            medical.setClinics(request.getClinics());
            medical.setDate(request.getDate());
            medical.setDoctorId(doctorId);
            medical.setClinicalDiagnosis(request.getClinicalDiagnosis());
            medical.setDiagnosis(request.getDiagnosis());
            return medicalService.update(medical);
        }).orElseThrow(() -> new RuntimeException("Medical not found"));
        if (medicalResult != null) {
            response.setMessage("Update medical success for patient: " + medicalResult.getPatientId());
            response.setData(new HashMap<>() {
                {
                    put("medical", medicalResult);
                }
            });
            return ResponseEntity.status(200).body(response);

        }
        response.setMessage("Update medical failed");
        response.setData(null);
        return ResponseEntity.status(500).body(response);
    }

    // Delete medical
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse> delete(@PathVariable("id") String medicalId) {
        BaseResponse response = new BaseResponse();
        LOGGER.info("Delete medical request");
        LOGGER.info("Medical id: {}", medicalId);

        if (medicalService.delete(medicalId)) {
            response.setMessage("Delete medical success");
            response.setData(null);
            return ResponseEntity.status(200).body(response);
        }

        response.setMessage("Delete medical failed");
        response.setData(null);
        return ResponseEntity.status(500).body(response);
    }

    // Search medicals
    @PreAuthorize("hasRole('ROLE_PATIENT')")
    @GetMapping("/search/me")
    public ResponseEntity<BaseResponse> searchPatient(
            @RequestParam(name = "keyword", defaultValue = "", required = false) String keyword,
            @RequestParam(name = "doctorId", defaultValue = "", required = false) String doctorId,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "5", required = false) int size,
            @RequestParam(name = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(name = "sortDir", defaultValue = "asc", required = false) String sortDir) {
        BaseResponse response = new BaseResponse();
        LOGGER.info("Search medicals request");
        LOGGER.info("Keyword: {}", keyword);
        //
        String patientId = authenticationFacade.getAuthentication().getName().split(",")[0];
        response.setMessage("Search medicals success");
        Page<MedicalEntity> result = medicalService.search(keyword, patientId, doctorId, page, size, sortBy, sortDir);
        response.setData(new HashMap<>() {
            {
                put("count", result.getNumberOfElements());
                put("total", result.getTotalElements());
                put("medicals", result.getContent().stream().map(medical -> {
                    String namePatient = patientService.findById(medical.getPatientId())
                            .orElseThrow(() -> new RuntimeException("Patient not found")).getFullName();
                    String nameDoctor = medical.getDoctorId().equals("ADMIN") ? "ADMIN"
                            : doctorService.findById(medical.getDoctorId())
                                    .orElseThrow(() -> new RuntimeException("Doctor not found")).getFullName();
                    return new MedicalResponse(medical.getId(), medical.getDate(), namePatient, nameDoctor);
                }).collect(Collectors.toList()));
            }
        });
        return ResponseEntity.status(200).body(response);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DOCTOR')")
    @GetMapping("/search")
    public ResponseEntity<BaseResponse> search(
            @RequestParam(name = "keyword", defaultValue = "", required = false) String keyword,
            @RequestParam(name = "patientId", defaultValue = "", required = false) String patientId,
            @RequestParam(name = "doctorId", defaultValue = "", required = false) String doctorId,
            @RequestParam(name = "isReadAll", defaultValue = "false", required = false) boolean isReadAll,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "5", required = false) int size,
            @RequestParam(name = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(name = "sortDir", defaultValue = "asc", required = false) String sortDir) {
        BaseResponse response = new BaseResponse();
        LOGGER.info("Search medicals request");
        LOGGER.info("Keyword: {}", keyword);
        String doctor = "";
        if (doctorId.isEmpty()) {
            doctor = authenticationFacade.getAuthentication().getName().split(",")[0];
        } else {
            if (authenticationFacade.getAuthentication().getName().split(",")[0].equals("ADMIN")) {
                doctor = doctorId;
            } else {
                doctor = authenticationFacade.getAuthentication().getName().split(",")[0];
            }
        }
        if (isReadAll) {
            doctor = "";
        }
        Page<MedicalEntity> result = medicalService.search(keyword, patientId, doctor, page, size, sortBy, sortDir);
        //
        response.setMessage("Search medicals success");
        response.setData(new HashMap<>() {
            {
                put("count", result.getNumberOfElements());
                put("total", result.getTotalElements());
                put("medicals", result.getContent().stream().map(medical -> {
                    String namePatient = patientService.findById(medical.getPatientId())
                            .orElseThrow(() -> new RuntimeException("Patient not found")).getFullName();
                    String nameDoctor = medical.getDoctorId().equals("ADMIN") ? "ADMIN"
                            : doctorService.findById(medical.getDoctorId())
                                    .orElseThrow(() -> new RuntimeException("Doctor not found")).getFullName();
                    return new MedicalResponse(medical.getId(), medical.getDate(), namePatient, nameDoctor);
                }).collect(Collectors.toList()));
            }
        });
        return ResponseEntity.status(200).body(response);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/statistical")
    public ResponseEntity<BaseResponse> statistical(
            @RequestParam(name = "doctor", defaultValue = "", required = false) String doctor,
            @RequestBody Map<String, String> request) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        try {
            BaseResponse response = new BaseResponse();
            Date startDate = formatter.parse(request.get("startDate"));
            Date endDate = formatter.parse(request.get("endDate"));
            if (startDate.after(endDate)) {
                throw new RuntimeException("Date invalid");
            }
            LOGGER.info("Statistical medicals request");
            LOGGER.info("doctor: {}", doctor.isEmpty() ? "All" : doctor);
            List<Map<String, Object>> result = medicalService.statistical(doctor, startDate, endDate);
            response.setMessage("Statistical medicals success");
            response.setData(new HashMap<>() {
                {
                    put("statistical", result);
                }
            });
            return ResponseEntity.status(200).body(response);
        } catch (Exception e) {
            throw new RuntimeException("Date invalid");
        }
    }

    // Count medicals of doctor
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/count")
    public ResponseEntity<BaseResponse> count(
            @RequestParam(name = "doctor", defaultValue = "", required = false) String doctor) {
        BaseResponse response = new BaseResponse();
        LOGGER.info("Count medicals request");
        LOGGER.info("doctor: {}", doctor.isEmpty() ? "All" : doctor);
        int result = medicalService.countByDoctorId(doctor);
        response.setMessage("Count medicals success");
        response.setData(new HashMap<>() {
            {
                put("count", result);
            }
        });
        return ResponseEntity.status(200).body(response);
    }

    // statistical blood pressure of patient
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DOCTOR')")
    @PostMapping("/statistical/blood-pressure/{patientId}")
    public ResponseEntity<BaseResponse> bloodPressure(@PathVariable("patientId") String patientId,
            @RequestBody Map<String, String> request) {
        return statisticalBloodPressure(patientId, request);
    }

    @PreAuthorize("hasRole('ROLE_PATIENT')")
    @PostMapping("/me/statistical/blood-pressure")
    public ResponseEntity<BaseResponse> meStatisticalBloodPressure(@RequestBody Map<String, String> request) {
        String patientId = authenticationFacade.getAuthentication().getName().split(",")[0];
        return statisticalBloodPressure(patientId, request);
    }

    private ResponseEntity<BaseResponse> statisticalBloodPressure(String patientId, Map<String, String> request) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        try {
            BaseResponse response = new BaseResponse();
            Date startDate = formatter.parse(request.get("startDate"));
            Date endDate = formatter.parse(request.get("endDate"));
            if (startDate.after(endDate)) {
                throw new RuntimeException("Date invalid");
            }
            LOGGER.info("Statistical blood pressure of patient request");
            LOGGER.info("patientId: {}", patientId);
            List<MedicalEntity> medicals = medicalService.statisticalBloodPressure(patientId, startDate, endDate);
            List<Map<String, Object>> result = new ArrayList<>();
            Calendar calendar = Calendar.getInstance();
            medicals.stream().forEach(medical -> {
                calendar.setTime(medical.getDate());
                Map<String, Object> item = new HashMap<>();
                item.put("Date", (calendar.get(Calendar.YEAR) + "-" + (calendar.get(Calendar.MONTH) + 1) + "-"
                        + calendar.get(Calendar.DAY_OF_MONTH)));
                item.put("scales", Integer.parseInt(medical.getBloodPressure()));
                result.add(item);
            });
            response.setMessage("Statistical blood pressure of patient success");
            response.setData(new HashMap<>() {
                {
                    put("statistical", result);
                }
            });
            return ResponseEntity.status(200).body(response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
