package com.kang.velogbackend.web.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginRespDto { //프론트서버에 돌려줄 로그인유저객체

    private Long id;
    private String username;
    private String email;
    private String picture;
//    private Role role;

//    private String accessToken;
//    private String refreshToken;

}
