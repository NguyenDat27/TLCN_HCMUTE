package com.medical.springboot.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.medical.springboot.models.entity.MedicalEntity;
import com.medical.springboot.repositories.MedicalRepository;

@Service
public class MedicalService implements IDao<MedicalEntity> {

    private static final Logger logger = LoggerFactory.getLogger(MedicalService.class);
    @Autowired
    private MedicalRepository medicalRepository;

    // Create
    @Override
    public MedicalEntity create(MedicalEntity t) {
        logger.info("create medical: {}", t);
        return medicalRepository.save(t);
    }

    // Read medicals of patient
    @Override
    public Page<MedicalEntity> readAll(Pageable pageable) {
        throw new UnsupportedOperationException("Not supported read all medicals");
    }

    // Read medicals of patient
    public Page<MedicalEntity> readAllByPatientId(String patientId, int page, int size, String sortBy,
            String sortDir, boolean isReadAll) {
        Pageable pageable = null;
        if (isReadAll) {
            pageable = Pageable.unpaged();
        } else {
            Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                    : Sort.by(sortBy).descending();
            pageable = PageRequest.of(page, size, sort);
        }
        logger.info("read all medicals of patient: {}", patientId);
        return medicalRepository.findByPatientId(patientId, pageable);
    }

    // Read one
    public Optional<MedicalEntity> findById(String key) {
        logger.info("read one medical");
        return medicalRepository.findById(key);
    }

    // Update
    @Override
    public MedicalEntity update(MedicalEntity t) {
        logger.info("update medical: {}", t);
        return medicalRepository.save(t);
    }

    // Delete
    @Override
    public boolean delete(String key) {
        try {
            medicalRepository.deleteById(key);
            logger.info("delete medical by id: {}", key);
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    // Other methods
    // Search
    public Page<MedicalEntity> search(String keyword, String patientId, String doctorId, int page, int size,
            String sortBy,
            String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        logger.info("search medicals");
        keyword = ".*" + keyword + ".*";
        patientId = patientId.isEmpty() ? ".*" + patientId + ".*" : "^" + patientId + "$";
        doctorId = doctorId.isEmpty() ? ".*" + doctorId + ".*" : "^" + doctorId + "$";

        return medicalRepository.find(keyword, patientId, doctorId, pageable);
    }

    // Statistical
    public List<Map<String, Object>> statistical(String doctor, Date startDate, Date endDate) {
        logger.info("statistical medicals");
        doctor = doctor.isEmpty() ? ".*" + doctor + ".*" : "^" + doctor + "$";

        List<MedicalEntity> medicals = medicalRepository.findByDateBetween(doctor, startDate, endDate);
        List<Map<String, Object>> result = new ArrayList<>();
        Calendar calendar = Calendar.getInstance();
        Date current = new Date(startDate.getTime());
        Date end = new Date(endDate.getTime());
        while (current.before(end) || current.equals(end)) {
            calendar.setTime(current);
            int count = 0;
            for (MedicalEntity medical : medicals) {
                if (current.getMonth() == medical.getDate().getMonth()
                        && current.getYear() == medical.getDate().getYear()) {
                    count++;
                }
            }
            Map<String, Object> item = new HashMap<>();
            item.put("Date", (calendar.get(Calendar.YEAR) + "-" + (calendar.get(Calendar.MONTH) + 1)));
            item.put("scales", count);
            result.add(item);

            calendar.add(Calendar.MONTH, 1);
            current = calendar.getTime();
        }
        return result;
    }

    // Count medicals
    public int countByDoctorId(String doctor) {
        logger.info("count medicals");
        doctor = doctor.isEmpty() ? ".*" + doctor + ".*" : "^" + doctor + "$";
        System.out.println(doctor);
        return medicalRepository.countByDoctorId(doctor);
    }

    // Get all patients of doctor
    public List<MedicalEntity> getAllPatients(String doctorId) {
        logger.info("get all patients of doctor");
        return medicalRepository.findAllPatientIdByDoctorId(doctorId);
    }

    // statistical blood pressure of patient
    public List<MedicalEntity> statisticalBloodPressure(String patientId, Date startDate, Date endDate) {
        logger.info("statistical blood pressure of patient");
        return medicalRepository.findByPatientIdAndDateBetween(patientId, startDate, endDate);
    }
}
