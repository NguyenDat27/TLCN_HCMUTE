package com.medical.springboot.repositories;

import java.time.Instant;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.medical.springboot.models.entity.VerifyEntity;

public interface VerifyRepository extends MongoRepository<VerifyEntity, String> {

    public VerifyEntity findFirstByEmail(String email);

    public Boolean existsByEmailAndVerifycode(String email, String verifycode);

    @Query(value = "{ 'expiresAt' : { $lt: ?0 } }", delete = true)
    public void deleteByExpiresAtBefore(Instant now);
}
