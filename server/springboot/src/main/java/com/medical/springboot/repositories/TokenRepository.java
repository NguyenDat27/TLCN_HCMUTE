package com.medical.springboot.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.medical.springboot.models.entity.TokenEntity;

import java.time.Instant;

public interface TokenRepository extends MongoRepository<TokenEntity, String> {

    public void deleteByToken(String token);

    public Boolean existsByToken(String token);

    public void deleteByAccountId(String accountId);

    @Query(value = "{ 'expiresAt' : { $lt: ?0 } }", delete = true)
    public void deleteByExpiresAtBefore(Instant now);
}
