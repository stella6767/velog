package com.kang.velogbackend.utills;

import com.kang.velogbackend.domain.post.PostRepository;
import com.kang.velogbackend.utils.CookieUtill;
import com.kang.velogbackend.utils.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import javax.servlet.http.Cookie;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class JwtUtillsTest {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CookieUtill cookieUtill;


    @Autowired
    private PostRepository postRepository;


    @Test
    public void 토큰검증_테스트()  {

        try {
//            String accessToken = jwtUtil.generateAccessToken(1L);
//            System.out.println(accessToken);
//            Cookie accessCookie = cookieUtill.createCookie(JwtUtil.ACCESS_TOKEN_NAME, accessToken);

            Long userId = jwtUtil.getUserId("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyNDYwOTEwOCwiZXhwIjoxNjI0NjA5MTY4fQ.poNWjVkP_trpwWHUg7ghtedcmqjnxQvgcqVyN-IRJMU");
            System.out.println(userId);
        } catch (ExpiredJwtException e) {
            e.printStackTrace();
            String newToken =jwtUtil.generateAccessToken(1L);
            Cookie newAccessToken = cookieUtill.createCookie(JwtUtil.ACCESS_TOKEN_NAME,newToken);
            System.out.println(newToken);
            String jwt = newAccessToken.getValue();

            Long userId = jwtUtil.getUserId(jwt);
            System.out.println("다시 검증 " + userId);
        }
    }



    @Test
    public void likeCount_Test () {





    }




}
