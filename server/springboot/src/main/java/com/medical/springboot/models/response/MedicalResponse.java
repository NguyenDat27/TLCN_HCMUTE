
package com.medical.springboot.models.response;

import java.util.Date;

/**
 * MedicalResponse
 */
public class MedicalResponse {

    private String id; // Id bệnh án
    private Date date; // Ngày khám
    private String namePatient; // Tên bệnh nhân
    private String nameDoctor; // Tên bác sĩ

    public MedicalResponse() {
    }

    
    public MedicalResponse(String id, Date date, String namePatient, String nameDoctor) {
        this.id = id;
        this.date = date;
        this.namePatient = namePatient;
        this.nameDoctor = nameDoctor;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getNamePatient() {
        return namePatient;
    }

    public void setNamePatient(String namePatient) {
        this.namePatient = namePatient;
    }

    public String getNameDoctor() {
        return nameDoctor;
    }

    public void setNameDoctor(String nameDoctor) {
        this.nameDoctor = nameDoctor;
    }

}