package com.medical.springboot.models.entity;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "Verifications")
public class VerifyEntity {

    @Id
    private String id;
    @Field
    private String email;
    @Field
    private String verifycode;
    @Field
    private Instant expiresAt;

    public VerifyEntity() {
    }

    public VerifyEntity(String email, String verifycode, Instant expiresAt) {
        this.email = email;
        this.verifycode = verifycode;
        this.expiresAt = expiresAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getVerifycode() {
        return verifycode;
    }

    public void setVerifycode(String verifycode) {
        this.verifycode = verifycode;
    }

    public Instant getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(Instant expiresAt) {
        this.expiresAt = expiresAt;
    }

    @Override
    public String toString() {
        return "VerifyEntity [email=" + email + ", expiresAt=" + expiresAt + ", id=" + id + ", verifycode=" + verifycode
                + "]";
    }
}
