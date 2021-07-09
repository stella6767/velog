package com.kang.velogbackend.utills;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.junit.jupiter.api.Test;

public class TagUtilsTest {

    @Test
    public void 태그파싱_테스트() {
        String tags = "#만화 #도라에몽";

        String[] temp = tags.split("#");
        System.out.println(temp.length);
    }


    @Test
    public void jsoup_test(){

        String html = "<div><p>Lorem ipsum. ";
        Document doc = Jsoup.parseBodyFragment(html);
        Element body = doc.body();
        Elements p = doc.getElementsByTag("p");

        System.out.println("body는?" + body);
        System.out.println("p: " + p);
    }



}
