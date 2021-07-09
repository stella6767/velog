package com.kang.velogbackend.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kang.velogbackend.web.dto.CMRespDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class Script {

    private static final Logger log = LoggerFactory.getLogger(Script.class);


//    public static void responseError(HttpServletResponse resp, CMRespDto<?> cmRespDto) throws IOException{
//
//        ObjectMapper om = new ObjectMapper();
//        String jsonData = om.writeValueAsString(cmRespDto);
//
//        resp.sendError(HttpStatus.UNAUTHORIZED.value(),jsonData);
//    }


    public static String parseString(String str){

        String str_imsi   = "";
        String []filter_word = {"\"","\\\\"};

        for(int i=0;i<filter_word.length;i++){
            str_imsi = str.replaceAll(filter_word[i],"");
            str = str_imsi;
        }
        return str;
    }





    public static void responseData(HttpServletResponse resp, CMRespDto<?> cmRespDto) throws IOException {
        PrintWriter out;

        ObjectMapper om = new ObjectMapper();
        String jsonData = om.writeValueAsString(cmRespDto);
        log.info("응답 데이터: " + jsonData);

        resp.setHeader("Content-Type", "application/json; charset=utf-8");

        try {
            out =resp.getWriter();
            out.println(jsonData);
            out.flush(); //버퍼 비우기
        } catch (Exception e) {
            e.printStackTrace();
        }

    }


}
