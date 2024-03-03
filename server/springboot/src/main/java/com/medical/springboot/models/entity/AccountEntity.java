package com.medical.springboot.models.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "Accounts")
public class AccountEntity {

    @Id
    private String id;
    @Field
    private String email;
    @Field
    private String password;
    @Field
    private String role;
    @Field
    private Boolean status; // true: active, false: inactive

    public AccountEntity() {
    }

    public AccountEntity(String email, String password, String role, Boolean status) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.status = status;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Account [id=" + id + ", email=" + email + ", password=" + password + ", role=" + role + ", status="
                + status + "]";
    }
}
