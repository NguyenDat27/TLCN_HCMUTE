package com.medical.springboot.models.entity;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "Doctors")
public class DoctorEntity extends PersonAbstractEntity {

    @Field
    private String department; // Khoa
    @Field
    private String title; // Chức danh
    //
    @Field
    private Boolean isDeleted = false; // Đã xóa
    public DoctorEntity() {
    }

    public DoctorEntity(String fullName, Date birthday, Boolean gender, String address, String phoneNumber,
            String email, String identificationCard, String department, String title) {
        super(fullName, birthday, gender, address, phoneNumber, email, identificationCard);
        this.department = department;
        this.title = title;
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

    @Override
    public String toString() {
        return "DoctorEntity [id=" + this.getId() + ", fullname=" + this.getFullName() + ", birthday="
                + this.getBirthday() + ", gender=" + this.getGender() + ", address=" + this.getAddress()
                + ", phoneNumber=" + this.getPhoneNumber() + ", email=" + this.getEmail() + ", identificationCard="
                + this.getIdentificationCard() + ", department=" + department + ", title=" + title
                + "]";
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

}
