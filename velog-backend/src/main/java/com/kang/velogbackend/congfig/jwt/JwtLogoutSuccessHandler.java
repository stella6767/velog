package com.kang.velogbackend.congfig.jwt;

import com.kang.velogbackend.service.RedisService;
import com.kang.velogbackend.utils.CookieUtill;
import com.kang.velogbackend.utils.JwtUtil;
import com.kang.velogbackend.utils.Script;
import com.kang.velogbackend.web.dto.CMRespDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Component
public class JwtLogoutSuccessHandler implements LogoutSuccessHandler {

    private static final Logger log = LoggerFactory.getLogger(JwtLogoutSuccessHandler.class);
    private final RedisService redisService;
    private final CookieUtill cookieUtill;

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        Cookie refreshToken = cookieUtill.getCookie(request, JwtUtil.REFRESH_TOKEN_NAME);
        log.info("여기 안 타는데??");

        if(refreshToken!=null){
            String refreshJwt = refreshToken.getValue();
            log.info("refreshToken: " + refreshJwt);

            if(refreshJwt != null){
                log.info("logout이 되면...");
                redisService.deleteData(refreshJwt);

                Cookie accessNullToken = cookieUtill.createNullCookie(JwtUtil.ACCESS_TOKEN_NAME);
                Cookie refreshNullToken = cookieUtill.createNullCookie(JwtUtil.REFRESH_TOKEN_NAME);

                response.addCookie(accessNullToken);
                response.addCookie(refreshNullToken);

                CMRespDto<?> cmRespDto = new CMRespDto(1,"로그아웃되었습니다.",null);;
                Script.responseData(response, cmRespDto);
            }
        }

//        RequestDispatcher rd = request.getRequestDispatcher("/logout");
//        rd.forward(request, response);
    }





}
