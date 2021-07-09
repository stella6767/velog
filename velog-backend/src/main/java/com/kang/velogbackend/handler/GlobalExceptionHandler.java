package com.kang.velogbackend.handler;

import com.kang.velogbackend.handler.customexception.DuplicateException;
import com.kang.velogbackend.handler.customexception.NoLoginException;
import com.kang.velogbackend.web.dto.CMRespDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController //데이터를 리턴하기 위해서
@ControllerAdvice //모든 익셉션을 낚아챔.
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);


    @ExceptionHandler(value = IllegalArgumentException.class)
    public CMRespDto<?> illegalArgumentException(Exception e){
        return new CMRespDto<>(-1,"Id를 찾을 수 없습니다.", null);
    }

    @ExceptionHandler(value= NoLoginException.class)
    public ResponseEntity<?> noLoginException(NoLoginException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED); //에러를 보낸다.
    }


    @ExceptionHandler(value = DuplicateException.class)
    public CMRespDto<?> illegalArgumentException(DuplicateException e){

        return new CMRespDto<>(-1,"같은 유저네임이 있습니다.", null);
    }

//    @ExceptionHandler(value = Exception.class)
//    public CMRespDto<?> Exception(Exception e){
//        log.warn(e.getMessage());
//
//        return new CMRespDto<>(-1, "에러터짐ㅠㅠ",null);
//    }



}
