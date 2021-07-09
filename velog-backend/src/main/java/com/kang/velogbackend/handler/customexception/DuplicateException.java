package com.kang.velogbackend.handler.customexception;

public class DuplicateException extends RuntimeException {
    public DuplicateException(String msg) {
        super(msg);
    }
}