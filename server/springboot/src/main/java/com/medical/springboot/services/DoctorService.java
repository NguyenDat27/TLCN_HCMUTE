package com.medical.springboot.services;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;

import com.medical.springboot.models.entity.DoctorEntity;
import com.medical.springboot.repositories.DoctorRepository;

@Service
public class DoctorService implements IDao<DoctorEntity> {
    private static final Logger logger = LoggerFactory.getLogger(DoctorService.class);
    @Autowired
    private DoctorRepository doctorRepository;

    // Create
    @Override
    public DoctorEntity create(DoctorEntity t) {
        return doctorRepository.save(t);

    }

    // Read all
    @Override
    public Page<DoctorEntity> readAll(Pageable pageable) {
        return doctorRepository.findByIsDeleted(false, pageable);
    }

    // find fullName by id
    public String findFullNameById(String id) {
        return doctorRepository.findFullNameById(id);
    }

    public Optional<DoctorEntity> findById(String id) {
        logger.debug("find doctor by id: {}", id);
        return doctorRepository.findById(id);
    }

    // Update
    @Override
    public DoctorEntity update(DoctorEntity t) {
        return doctorRepository.save(t);
    }

    // Delete
    @Override
    public boolean delete(String key) {
        try {
            DoctorEntity doctorEntity = doctorRepository.findFirstById(key);
            doctorEntity.setIsDeleted(true);
            logger.debug("delete doctor by id: {}", key);
            doctorRepository.save(doctorEntity);
            return true;
        } catch (Exception e) {
            logger.error("delete doctor by id: {}", key);
            logger.error(e.getMessage());
            return false;
        }
    }

    // Others methods
    // Find by email
    public Optional<DoctorEntity> findByEmail(String email) {
        logger.debug("find doctor by email: {}", email);
        return Optional.ofNullable(doctorRepository.findFirstByEmail(email));
    }

    // Diagnosis image
    public String diagnosisImage(String urlImage) {
        // String url = "http://localhost:5000/image/predict"; // url nomal
        String url = "http://PythonAPI:5000/image/predict"; // url docker
        //
        RestTemplate restTemplate = new RestTemplate();
        //
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        //
        Map<String, String> body = new HashMap<>() {
            {
                put("imageURL", urlImage);
            }
        };
        //
        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);
        //
        return restTemplate.postForObject(url, request, String.class);
    }
}
