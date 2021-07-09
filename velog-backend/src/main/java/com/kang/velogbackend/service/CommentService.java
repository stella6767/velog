package com.kang.velogbackend.service;

import com.kang.velogbackend.domain.comment.Comment;
import com.kang.velogbackend.domain.comment.CommentRepository;
import com.kang.velogbackend.domain.comment.recomment.Recomment;
import com.kang.velogbackend.domain.comment.recomment.RecommentRepository;
import com.kang.velogbackend.domain.post.Post;
import com.kang.velogbackend.domain.user.User;
import com.kang.velogbackend.web.dto.recomment.RecommentSaveReqDto;
import com.kang.velogbackend.web.dto.recomment.RecommentSaveRespDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class CommentService {


    private static final Logger log = LoggerFactory.getLogger(CommentService.class);

    private final CommentRepository commentRepository;
    private final RecommentRepository recommentRepository;


    @Transactional
    public RecommentSaveRespDto 대댓글쓰기(User principal, RecommentSaveReqDto recommentSaveReqDto, Long id) {

        Recomment recomment = recommentSaveReqDto.toEntity();
        recomment.setUser(principal);

        Comment commentEntity = commentRepository.findById(id).orElseThrow(()->{
            return new IllegalArgumentException("id를 찾을 수 없습니다.");
        });

        recomment.setComment(commentEntity);


        Recomment recommentEntity = recommentRepository.save(recomment);


        RecommentSaveRespDto recommentSaveRespDto = RecommentSaveRespDto.builder()
                .id(recommentEntity.getId())
                .content(recommentEntity.getContent())
                .comment(recommentEntity.getComment())
                .userId(principal.getId())
                .username(principal.getUsername())
                .build();
        log.info("user Entity post lazy loading error를 피하기 위해..");

        //양방향 관계 시 엔티티를 리턴하지 말자.. lazy post
        return  recommentSaveRespDto;
    }



    @Transactional
    public Comment 댓글쓰기(User principal, String content, Long postId){

        Post post = Post.builder()
                .id(postId)
                .build();

        //Save 할 때 연관관계가 있으면 오브젝트로 만들어서 id값만 넣어주면 된다.
        Comment comment = Comment.builder()
                .content(content)
                .post(post)
                .user(principal)
                .build();

        return commentRepository.save(comment);

    }


}
