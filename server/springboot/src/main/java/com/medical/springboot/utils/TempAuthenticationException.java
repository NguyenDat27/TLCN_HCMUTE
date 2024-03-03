package com.medical.springboot.utils;

import org.springframework.security.core.AuthenticationException;

public class TempAuthenticationException extends AuthenticationException {

    public TempAuthenticationException(String msg) {
        super(msg);
    }

}