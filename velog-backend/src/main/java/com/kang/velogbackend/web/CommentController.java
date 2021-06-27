package com.kang.velogbackend.web;

import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.domain.comment.Comment;
import com.kang.velogbackend.handler.customexception.NoLoginException;
import com.kang.velogbackend.service.CommentService;
import com.kang.velogbackend.web.dto.CMRespDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class CommentController {

    private static final Logger log = LoggerFactory.getLogger(CommentController.class);
    private final CommentService commentService;

    @PostMapping("/comment/{postId}")
    public CMRespDto<?> save(@PathVariable Long postId, @RequestBody String content, @AuthenticationPrincipal PrincipalDetails principalDetails){   // content, imageId, userId(세션)

        if(principalDetails == null){
            throw new NoLoginException("로그인이 필요한 서비스입니다.");
        }


        log.info("댓글쓰기 " + postId +" " + content + " " + principalDetails.getUser()); //세션 검증을 2차로 할지는 생각중..
        Comment commentEntity = commentService.댓글쓰기(principalDetails.getUser(), content, postId);

        return new CMRespDto<>(1, "댓글쓰기 성공",commentEntity);
    }

}