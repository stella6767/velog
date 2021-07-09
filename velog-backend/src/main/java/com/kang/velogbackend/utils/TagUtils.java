package com.kang.velogbackend.utils;

import com.kang.velogbackend.domain.post.Post;
import com.kang.velogbackend.domain.tag.Tag;

import java.util.ArrayList;
import java.util.List;

public class TagUtils {

    public static List<Tag> parsingToTagObject(String tags, Post postEntity){
        String temp[] = tags.split("#"); // #여행 #바다
        List<Tag> list = new ArrayList<>();

        // 도라에몽 : 파싱할 때 0번지에 공백이 들어와서 시작번지를 1로 함.
        for (int i=1; i<temp.length; i++) {
            Tag tag = Tag.builder()
                    .name(temp[i].trim())
                    .post(postEntity)
                    .build();
            list.add(tag);
        }

        return list;
    }

}
