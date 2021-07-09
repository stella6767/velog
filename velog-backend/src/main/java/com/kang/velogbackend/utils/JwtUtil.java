package com.kang.velogbackend.utils;

import com.kang.velogbackend.domain.user.User;
import com.kang.velogbackend.service.RedisService;
import com.kang.velogbackend.web.dto.auth.LoginRespDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtUtil {

    public final static int ACCESS_TOKEN_VALIDATION_SECOND = 1000*60*10; //10분
    public final static int REFRESH_TOKEN_VALIDATION_SECOND = 1000*60*60*24*7; //1주

    final static public String ACCESS_TOKEN_NAME = "accessToken";
    final static public String REFRESH_TOKEN_NAME = "refreshToken";

    @Value("${jwt.secret}")
    private String SECRET_KEY; //doc에 보면 raw secret value를 써야된단다. 이거 못 씀...

    private final RedisService redisService;




    public LoginRespDto makeLoginRespDto(User principalDetails){

        LoginRespDto loginRespDto = new LoginRespDto();
        loginRespDto = loginRespDto.builder()
                .id(principalDetails.getId())
                .picture(principalDetails.getPicture())
                .email(principalDetails.getEmail())
                .username(principalDetails.getUsername())
                .build();

        return loginRespDto;
    }

    public void saveTokenInRedis(String key, String value){  //refreshToken을 reids에 저장
        //UUID uuid = UUID.randomUUID(); //고유키값 만들기
        redisService.setDataExpire(key,value, REFRESH_TOKEN_VALIDATION_SECOND);
    }





    private Key getSigningKey(String secretKey) {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Claims extractAllClaims(String token) throws ExpiredJwtException {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey(SECRET_KEY))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Long getUserId(String token) {


        return extractAllClaims(token).get("userId", Long.class);
    }

    public Boolean isTokenExpired(String token) {
        final Date expiration = extractAllClaims(token).getExpiration();
        return expiration.before(new Date());
    }





    public String generateAccessToken(Long userId) {

        log.info("검증에 활용할 userId: " + userId);
        return doGenerateToken(userId, ACCESS_TOKEN_VALIDATION_SECOND);
    }

    public String generateRefreshToken(Long userId) {
        return doGenerateToken(userId, REFRESH_TOKEN_VALIDATION_SECOND);
    }

    public String doGenerateToken(Long userId, long expireTime) {

        log.info("토큰을 만드는데 인증이 에러가 나네..");
        Claims claims = Jwts.claims();
        claims.put("userId", userId);

        String jwt = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireTime))
                .signWith(getSigningKey(SECRET_KEY), SignatureAlgorithm.HS256)
                .compact();

        return jwt;
    }


    public Boolean validateToken(String token, User user) {
        final Long userId = getUserId(token);

        return (userId == user.getId() && !isTokenExpired(token));
    }



}
