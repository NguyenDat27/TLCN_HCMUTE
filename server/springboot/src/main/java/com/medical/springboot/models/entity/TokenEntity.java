package com.medical.springboot.models.entity;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "Tokens")
public class TokenEntity {

    @Id
    private String id;
    @Field
    private String token;
    @Field
    private Instant expiresAt;
    @Field
    private String accountId;

    public TokenEntity() {
    }

    public TokenEntity(String token, Instant expiresAt, String accountId) {
        this.token = token;
        this.expiresAt = expiresAt;
        this.accountId = accountId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Instant getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(Instant expiresAt) {
        this.expiresAt = expiresAt;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    @Override
    public String toString() {
        return "TokenEntity [accountId=" + accountId + ", expiresAt=" + expiresAt + ", id=" + id + ", token=" + token
                + "]";
    }
}
