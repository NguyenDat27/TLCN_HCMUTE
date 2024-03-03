package com.medical.springboot.models.request;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class DoctorRequest {
    private String fullName; // Họ và tên
    @JsonFormat(pattern = "MM/dd/yyyy")
    private Date birthday; // Ngày sinh
    private Boolean gender; // Nam = 1, Nữ = 0
    private String address; // Địa chỉ
    private String phoneNumber; // Số điện thoại
    private String email; // Email
    private String password; // Mật khẩu
    private String identificationCard; // CCCD
    private String department; // Khoa
    private String title; // Chức danh

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

}
