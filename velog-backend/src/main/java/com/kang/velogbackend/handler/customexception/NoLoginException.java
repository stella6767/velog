package com.kang.velogbackend.handler.customexception;

public class NoLoginException extends RuntimeException {
    public NoLoginException(String msg) {
        super(msg);
    }
}