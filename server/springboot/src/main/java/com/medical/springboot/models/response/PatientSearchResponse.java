package com.medical.springboot.models.response;

import java.util.Date;

public class PatientSearchResponse {
    private String id;
    private String email;
    private String fullName;
    private Date date;
    private String phonenumber;

    
    public PatientSearchResponse(String id, String email, String fullName, Date date, String phonenumber) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.date = date;
        this.phonenumber = phonenumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

}
