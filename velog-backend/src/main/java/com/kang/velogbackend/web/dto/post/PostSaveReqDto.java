package com.kang.velogbackend.web.dto.post;

import com.kang.velogbackend.domain.post.Post;
import com.kang.velogbackend.domain.user.User;
import lombok.Data;

@Data
public class PostSaveReqDto {

    private String title;
    private String content;
    private String tags;

    public Post toEntity(String thumbnail, User userEntity){

        return Post.builder()
                .title(title)
                .content(content)
                .thumbnail(thumbnail)
                .user(userEntity)
                .build();
    }

}
