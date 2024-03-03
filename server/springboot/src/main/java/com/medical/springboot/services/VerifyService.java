package com.medical.springboot.services;

import java.time.Instant;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medical.springboot.models.entity.VerifyEntity;
import com.medical.springboot.repositories.VerifyRepository;

@Service
public class VerifyService {

    @Autowired
    private VerifyRepository verifyRepository;

    // Create
    public String create(String email) {
        delete(email);
        String verifyCode = "";
        Random random = new Random();
        for (int i = 0; i < 6; i++) {
            verifyCode += random.nextInt(10);
        }
        VerifyEntity verifyEntity = new VerifyEntity();
        verifyEntity.setEmail(email);
        verifyEntity.setVerifycode(verifyCode);
        verifyEntity.setExpiresAt(Instant.now().plusSeconds(60 * 5)); // 5 minutes
        verifyRepository.save(verifyEntity);
        return verifyCode;
    }

    // Read
    // Update
    // Delete
    public void delete(String email) {
        VerifyEntity verifyEntities = verifyRepository.findFirstByEmail(email);
        if (verifyEntities != null) {
            verifyRepository.delete(verifyEntities);
        }
    }

    // Other methods
    public boolean verifyCode(String email, String verifyCode) {
        if (!verifyRepository.existsByEmailAndVerifycode(email, verifyCode) || !isCheckTimeExpire(email)) {
            return false;
        }
        return true;
    }

    private boolean isCheckTimeExpire(String email) {
        VerifyEntity verifyEntity = verifyRepository.findFirstByEmail(email);
        if (verifyEntity == null) {
            return false;
        }
        boolean isCheck = verifyEntity.getExpiresAt().isAfter(Instant.now()); // true if not expire
        if (!isCheck) {
            verifyRepository.delete(verifyEntity);
        }
        return isCheck;
    }

    //Delete verify code expiresAt before
    public void deleteVerifyCodeExpiresAt() {
        verifyRepository.deleteByExpiresAtBefore(Instant.now());
    }
}
