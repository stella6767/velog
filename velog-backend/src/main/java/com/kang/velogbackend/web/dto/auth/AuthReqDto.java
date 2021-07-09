package com.kang.velogbackend.web.dto.auth;

import com.kang.velogbackend.domain.user.User;
import lombok.Data;

@Data
public class AuthReqDto { //일반 유저 로그인과 회원가입 둘 다
    private String username;
    private String password;


    public User toEntity(){
        return User.builder()
                .username(username)
                .password(password)
                .build();
    }
}