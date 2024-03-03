package com.medical.springboot.models.request;

public class DiagnosticImageRequest {

    private String method; // Phương pháp: CT, MRI, X-Quang
    private String content; // Nội dung yêu cầu
    private String urlImage; // Đường dẫn ảnh
    private String conclude; // Kết luận

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

}
