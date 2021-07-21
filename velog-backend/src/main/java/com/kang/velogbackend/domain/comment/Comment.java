package com.kang.velogbackend.domain.comment;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.kang.velogbackend.domain.BaseTimeEntity;
import com.kang.velogbackend.domain.post.Post;
import com.kang.velogbackend.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class Comment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String content;

    @JoinColumn(name = "postId")
    @ManyToOne
    private Post post;

    @JsonIgnoreProperties({"posts"})
    @JoinColumn(name = "userId")
    @ManyToOne
    private User user;



}
