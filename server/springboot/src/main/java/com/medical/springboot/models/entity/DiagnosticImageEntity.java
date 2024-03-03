package com.medical.springboot.models.entity;

/**
 * DiagnosticImageEntity
 */
public class DiagnosticImageEntity {
    private String method; // Phương pháp: CT, MRI, X-Quang
    private String content; // Nội dung yêu cầu
    private String doctorIdPerform; // Id bác sĩ thực hiện
    private String urlImage; // Đường dẫn ảnh
    private String conclude; // Kết luận

    public DiagnosticImageEntity() {
    }

    public DiagnosticImageEntity(String method, String content, String doctorIdPerform, String urlImage,
            String conclude) {
        this.method = method;
        this.content = content;
        this.doctorIdPerform = doctorIdPerform;
        this.urlImage = urlImage;
        this.conclude = conclude;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDoctorIdPerform() {
        return doctorIdPerform;
    }

    public void setDoctorIdPerform(String doctorIdPerform) {
        this.doctorIdPerform = doctorIdPerform;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    public String getConclude() {
        return conclude;
    }

    public void setConclude(String conclude) {
        this.conclude = conclude;
    }

    @Override
    public String toString() {
        return "DiagnosticImageEntity [method=" + method + ", content=" + content + ", doctorIdPerform="
                + doctorIdPerform + ", urlImage=" + urlImage + ", conclude=" + conclude + "]";
    }

}