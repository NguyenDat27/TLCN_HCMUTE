package com.medical.springboot.models.entity;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

public abstract class PersonAbstractEntity {
    @Id
    private String id;
    @Field
    private String fullName; // Họ và tên
    @Field
    private Date birthday; // Ngày sinh
    @Field
    private Boolean gender; // Nam = 1, Nữ = 0
    @Field
    private String address; // Địa chỉ
    @Field
    private String phoneNumber; // Số điện thoại
    @Field
    private String email; // Email
    @Field
    private String identificationCard; // CCCD

    public PersonAbstractEntity() {
    }

    public PersonAbstractEntity(String fullName, Date birthday, Boolean gender, String address, String phoneNumber,
            String email, String identificationCard) {
        this.fullName = fullName;
        this.birthday = birthday;
        this.gender = gender;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.identificationCard = identificationCard;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public Boolean getGender() {
        return gender;
    }

    public void setGender(Boolean gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIdentificationCard() {
        return identificationCard;
    }

    public void setIdentificationCard(String identificationCard) {
        this.identificationCard = identificationCard;
    }
}
