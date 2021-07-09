package com.kang.velogbackend.utils;

import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@Component //내가 직접 만든 클래스에는 @Component로 DI 주입하자.
public class CookieUtill {

    public Cookie createNullCookie(String cookieName){
        Cookie token = new Cookie(cookieName, null);
        token.setHttpOnly(false);
        token.setMaxAge(0);// Don't set to -1 or it will become a session cookie!
        token.setPath("/");
        return token;
    }

    public Cookie createCookie(String cookieName, String value){
        Cookie token = new Cookie(cookieName,value);
        token.setHttpOnly(false);
        token.setMaxAge((int)JwtUtil.ACCESS_TOKEN_VALIDATION_SECOND);
        token.setPath("/");
        return token;
    }

    public Cookie getCookie(HttpServletRequest req, String cookieName){
        final Cookie[] cookies = req.getCookies();
        if(cookies==null) return null;
        for(Cookie cookie : cookies){
            if(cookie.getName().equals(cookieName))
                return cookie;
        }
        return null;
    }

}
