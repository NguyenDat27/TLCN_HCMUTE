package com.medical.springboot.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.medical.springboot.models.response.BaseResponse;

@ControllerAdvice
public class Exceptionhandler {
    private static final Logger logger = LoggerFactory.getLogger(Exceptionhandler.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseResponse> handleException(Exception exception) {

        if (exception instanceof AuthenticationException) {
            logger.error("Unauthorized", exception);
            BaseResponse response = new BaseResponse();
            response.setMessage("Unauthorized");
            response.setData(null);
            return ResponseEntity.status(401).body(response);
        }

        if (exception instanceof AccessDeniedException) {
            logger.error("Access Denied", exception);
            BaseResponse response = new BaseResponse();
            response.setMessage("Access Denied");
            response.setData(null);
            return ResponseEntity.status(403).body(response);
        }
        if (exception instanceof RuntimeException) {
            logger.error("Bad Request", exception);
            BaseResponse response = new BaseResponse();
            response.setMessage("Bad Request");
            response.setData(null);
            return ResponseEntity.status(400).body(response);
        }
        if(exception instanceof NullPointerException || exception instanceof HttpRequestMethodNotSupportedException){
            logger.error("Not Found", exception);
            BaseResponse response = new BaseResponse();
            response.setMessage("Not Found");
            response.setData(null);
            return ResponseEntity.status(404).body(response);
        }

        logger.error("Internal Server Error", exception);
        BaseResponse response = new BaseResponse();
        response.setMessage("Internal Server Error");
        response.setData(null);
        return ResponseEntity.status(500).body(response);
    }

}
