package com.kang.velogbackend.domain.comment.recomment;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.kang.velogbackend.domain.BaseTimeEntity;
import com.kang.velogbackend.domain.comment.Comment;
import com.kang.velogbackend.domain.user.User;
import lombok.*;

import javax.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "id") //무한참조 방지
@Entity
public class Recomment extends BaseTimeEntity {

    @Id //Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //시퀀스, auto_increment

    private String content;

    @ToString.Exclude
    //@JsonIgnore //user 객체를 때리지 않게..
    @ManyToOne
    @JoinColumn(name = "userId") // 테이블에 userId로적힘
    private User user;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "commentId")
    private Comment comment;

}
