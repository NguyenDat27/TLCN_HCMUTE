package com.medical.springboot.models.entity;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "MedicalRecords")
public class MedicalEntity {

    @Id
    private String id;
    @Field
    private String clinics; // Phòng khám
    @Field
    private Date date; // Ngày khám
    @Field
    private String doctorId; // Id bác sĩ khám
    @Field
    private String clinicalDiagnosis; // Chẩn đoán lâm sàng
    @Field
    private DiagnosticImageEntity diagnosticImages; // Chẩn đoán hình ảnh
    @Field
    private String diagnosis; // Kết luận chẩn đoán
    @Field
    private String patientId; // Id hồ sơ bệnh nhân
    @Field
    private String bloodPressure; // Huyết áp

    public MedicalEntity() {
    }

    public MedicalEntity(String clinics, Date date, String doctorId, String clinicalDiagnosis,
            DiagnosticImageEntity diagnosticImages, String diagnosis, String patientId, String bloodPressure) {
        this.clinics = clinics;
        this.date = date;
        this.doctorId = doctorId;
        this.clinicalDiagnosis = clinicalDiagnosis;
        this.diagnosticImages = diagnosticImages;
        this.diagnosis = diagnosis;
        this.patientId = patientId;
        this.bloodPressure = bloodPressure;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClinics() {
        return clinics;
    }

    public void setClinics(String clinics) {
        this.clinics = clinics;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    public String getClinicalDiagnosis() {
        return clinicalDiagnosis;
    }

    public void setClinicalDiagnosis(String clinicalDiagnosis) {
        this.clinicalDiagnosis = clinicalDiagnosis;
    }

    public DiagnosticImageEntity getDiagnosticImages() {
        return diagnosticImages;
    }

    public void setDiagnosticImages(DiagnosticImageEntity diagnosticImages) {
        this.diagnosticImages = diagnosticImages;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    @Override
    public String toString() {
        return "Medical [id=" + id + ", clinics=" + clinics + ", date=" + date
                + ", doctorId=" + doctorId + ", clinicalDiagnosis=" + clinicalDiagnosis + ", diagnosticImages="
                + diagnosticImages + ", diagnosis=" + diagnosis + ", patientId=" + patientId + "]";
    }

    public String getBloodPressure() {
        return bloodPressure;
    }

    public void setBloodPressure(String bloodPressure) {
        this.bloodPressure = bloodPressure;
    }
    
}
