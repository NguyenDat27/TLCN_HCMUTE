package com.medical.springboot.models.response;

public class MedicalDetailResponse extends MedicalResponse {
    private String clinics;
    private String clinicalDiagnosis;
    private String diagnosis;
    private Object diagnosticImages;

    public String getClinics() {
        return clinics;
    }

    public void setClinics(String clinics) {
        this.clinics = clinics;
    }

    public String getClinicalDiagnosis() {
        return clinicalDiagnosis;
    }

    public void setClinicalDiagnosis(String clinicalDiagnosis) {
        this.clinicalDiagnosis = clinicalDiagnosis;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public Object getDiagnosticImages() {
        return diagnosticImages;
    }

    public void setDiagnosticImages(Object diagnosticImages) {
        this.diagnosticImages = diagnosticImages;
    }

}
