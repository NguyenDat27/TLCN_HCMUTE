package com.medical.springboot.services;

import java.util.Base64;

import javax.crypto.Cipher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medical.springboot.configs.RsaKeyConfig;

@Service
public class CryptographyService {
    @Autowired
    private RsaKeyConfig rsaKeyConfig;

    public String Encrypt(String message) throws Exception {
        byte[] messageBytes = message.getBytes();
        Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
        cipher.init(Cipher.ENCRYPT_MODE, rsaKeyConfig.getPublicKey());
        byte[] encryptByte = cipher.doFinal(messageBytes);
        return encode(encryptByte);
    }

    private String encode(byte[] data) {
        return Base64.getEncoder().encodeToString(data);
    }

    public String Decrypt(String message) throws Exception {
        byte[] decryptBytes = decode(message);
        Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
        cipher.init(Cipher.DECRYPT_MODE, rsaKeyConfig.getPrivateKey());
        byte[] decryptMessage = cipher.doFinal(decryptBytes);
        return new String(decryptMessage, "UTF-8");
    }

    private byte[] decode(String data) {
        return Base64.getDecoder().decode(data);
    }
}
