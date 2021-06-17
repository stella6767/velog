package com.kang.velogbackend.utils;

import com.kang.velogbackend.congfig.auth.PrincipalDetails;
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

    public final static int ACCESS_TOKEN_VALIDATION_SECOND = 1000*60*1; //3분
    public final static int REFRESH_TOKEN_VALIDATION_SECOND = 1000*60*60*24*7; //1주

    final static public String ACCESS_TOKEN_NAME = "accessToken";
    final static public String REFRESH_TOKEN_NAME = "refreshToken";

    @Value("${jwt.secret}")
    private String SECRET_KEY; //doc에 보면 raw secret value를 써야된단다. 이거 못 씀...

    private final RedisService redisService;




    public LoginRespDto makeLoginRespDto(PrincipalDetails principalDetails, String accessToken){

        LoginRespDto loginRespDto = new LoginRespDto();
        loginRespDto = loginRespDto.builder()
                .id(principalDetails.getUser().getId())
                .picture(principalDetails.getUser().getPicture())
                .email(principalDetails.getUser().getEmail())
                .username(principalDetails.getUser().getUsername())
                .accessToken(accessToken)
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
        return doGenerateToken(userId, ACCESS_TOKEN_VALIDATION_SECOND);
    }

    public String generateRefreshToken(Long userId) {
        return doGenerateToken(userId, REFRESH_TOKEN_VALIDATION_SECOND);
    }

    public String doGenerateToken(Long userId, long expireTime) {

        Claims claims = Jwts.claims();
        claims.put("id", userId);

        String jwt = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireTime))
                .signWith(getSigningKey(SECRET_KEY), SignatureAlgorithm.HS256)
                .compact();

        return jwt;
    }


    public Boolean validateToken(String token, PrincipalDetails principalDetails) {
        final Long userId = getUserId(token);

        return (userId.equals(principalDetails.getUser().getId()) && !isTokenExpired(token));
    }



}
