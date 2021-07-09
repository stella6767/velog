package com.kang.velogbackend.web;

import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.web.dto.CMRespDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

@RestController
public class TestController {

    private static final Logger log = LoggerFactory.getLogger(TestController.class);

    @GetMapping("user/test")
    public CMRespDto<?> testUser(@AuthenticationPrincipal PrincipalDetails principalDetails){

        log.info("token이 만료되었다면 여기를 못 탈 것이여..");

        log.info(principalDetails.getUser().toString());

        return new CMRespDto<>(1, "토큰이 만료되지 않았네",null );
    }

    @GetMapping("test")
    public CMRespDto<?> test(HttpServletRequest req) throws IOException {

        log.info("권한이 필요없는 주소 요청할 때");

        InputStream in = System.in;
        InputStreamReader ir = new InputStreamReader(in);
        BufferedReader br = new BufferedReader(ir);

        br = req.getReader(); // http body 데이터 순수하게 읽기
        String requestData = null;
        while((requestData = br.readLine()) != null) {
            log.info(requestData);
        }


        return null;
    }



    @GetMapping("admin/test")
    public CMRespDto<?> testAdmin(@AuthenticationPrincipal PrincipalDetails principalDetails){

        log.info("jwt 예외처리 테스트중");
        log.info(principalDetails.getUser().toString());

        return new CMRespDto<>(1, "ㅁㅇㄴㅇㄴㅁ",null );
    }



    @GetMapping("test/{username}/{id}")
    public void testParam(@PathVariable String username, @PathVariable int id){

        log.info("id는 " + id +" name은" + username);
    }



    @GetMapping("user/logout")
    public void routerTest(@PathVariable String username, @PathVariable int id){

        log.info("왜 이러냐..");
    }

}
