package com.kang.velogbackend.domain.post;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.kang.velogbackend.domain.BaseTimeEntity;
import com.kang.velogbackend.domain.comment.Comment;
import com.kang.velogbackend.domain.likes.Likes;
import com.kang.velogbackend.domain.tag.Tag;
import com.kang.velogbackend.domain.user.User;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Post extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,length = 100)
    private String title;

    @Lob
    private String content;

    @Lob //일단은 이렇게
    private String thumbnail;

    @JsonIgnoreProperties({"posts"})
    @ManyToOne
    @JoinColumn(name="userId")
    private User user;

    @JsonIgnoreProperties({"post"})
    @OneToMany(mappedBy = "post") //mappedBy 하면 테이블의 칼럼 안 생김을 명시
    private List<Tag> tags;

    @JsonIgnoreProperties({"post"})
    @OneToMany(mappedBy = "post")
    private List<Likes> likes; //A 이미지에 홍길동, 장보고, 임꺽정 좋아요. (고소영)

    @OrderBy("id DESC")
    @JsonIgnoreProperties({"post"})
    @OneToMany(mappedBy = "post")
    private List<Comment> comments;


    @Transient  //칼럼이 만들어지지 않는다.
    private int likeCount;

    @Transient
    private boolean likeState;


}
