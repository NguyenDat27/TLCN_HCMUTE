package com.medical.springboot.configs;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import com.medical.springboot.services.CryptographyService;

@Configuration
public class MailConfiguration {

    @Value("${spring.mail.host}")
    private String mailServerHost;

    @Value("${spring.mail.port}")
    private Integer mailServerPort;

    @Value("${spring.mail.username}")
    private String mailServerUsername;

    @Value("${spring.mail.password}")
    private String mailServerPassword;

    @Value("${spring.mail.properties.mail.smtp.auth}")
    private String mailServerAuth;

    @Value("${spring.mail.properties.mail.smtp.starttls.enable}")
    private String mailServerStartTls;

    @Autowired
    private CryptographyService cryptographyService;

    @Bean
    public JavaMailSender getJavaMailSender() {
        //
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", mailServerAuth);
        properties.put("mail.smtp.starttls.enable", mailServerStartTls);
        //
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(mailServerHost);
        mailSender.setPort(mailServerPort);
        try {
            mailSender.setUsername(cryptographyService.Decrypt(mailServerUsername));
            mailSender.setPassword(cryptographyService.Decrypt(mailServerPassword));
        } catch (Exception e) {
            e.printStackTrace();
        }
        mailSender.setJavaMailProperties(properties);

        return mailSender;
    }
}
