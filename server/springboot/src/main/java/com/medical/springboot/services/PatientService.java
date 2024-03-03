package com.medical.springboot.services;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.medical.springboot.models.entity.PatientEntity;
import com.medical.springboot.repositories.PatientRepository;

@Service
public class PatientService implements IDao<PatientEntity> {
    private static final Logger logger = LoggerFactory.getLogger(PatientService.class);
    @Autowired
    private PatientRepository patientRepository;

    // Create
    @Override
    public PatientEntity create(PatientEntity t) {
        logger.debug("create patient: {}", t);
        return patientRepository.save(t);
    }

    // Read all
    @Override
    public Page<PatientEntity> readAll(Pageable pageable) {
        logger.debug("read all patients");
        return patientRepository.findByIsDeleted(false, pageable);
    }

    public PatientEntity findFirstById(String id) {
        return patientRepository.findFirstById(id);
    }

    public Optional<PatientEntity> findById(String id) {
        return patientRepository.findById(id);
    }

    // Update
    @Override
    public PatientEntity update(PatientEntity t) {
        logger.debug("update patient: {}", t);
        return patientRepository.save(t);
    }

    // Delete
    @Override
    public boolean delete(String id) { // set isDeleted = true
        try {
            PatientEntity patientEntity = patientRepository.findFirstById(id);
            patientEntity.setBirthday(null);
            patientEntity.setGender(null);
            patientEntity.setAddress(null);
            patientEntity.setPhoneNumber(null);
            patientEntity.setIdentificationCard(null);
            patientEntity.setAllergy(null);
            patientEntity.setHealthInsurance(null);
            patientEntity.setIsDeleted(true);
            logger.debug("delete patient by id: {}", id);
            patientRepository.save(patientEntity);
            return true;
        } catch (Exception e) {
            logger.error("delete patient by id: {}", id);
            logger.error(e.getMessage());
            return false;
        }
    }

    // Other methods
    public Optional<PatientEntity> findByEmail(String email) {
        return Optional.ofNullable(patientRepository.findFirstByEmail(email));
    }

    public Boolean isexistsByEmail(String email) {
        return patientRepository.existsByEmail(email);
    }

    public Boolean isexistsById(String id) {
        return patientRepository.existsById(id);
    }

    public Boolean isexistsByIdAndIsDeleted(String id, Boolean isDeleted) {
        return patientRepository.existsByIdAndIsDeleted(id, isDeleted);
    }

    // Search
    public Page<PatientEntity> search(String keyword, int page, int size, String sortBy,
            String sortDir) {
        logger.debug("search patients");
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        keyword = ".*" + keyword + ".*";
        return patientRepository.search(keyword, pageable);
    }
    
}
