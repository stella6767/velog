package com.kang.velogbackend.web;

import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.domain.post.Post;
import com.kang.velogbackend.handler.customexception.NoLoginException;
import com.kang.velogbackend.service.UserService;
import com.kang.velogbackend.web.dto.CMRespDto;
import com.kang.velogbackend.web.dto.user.UserVelogRespDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;



    @GetMapping("/user/{userId}") //개인 벨로그
    public CMRespDto<?> profile(@PathVariable Long userId) {

        log.info("들어옴?" + userId );

        UserVelogRespDto userVelogRespDto = userService.회원블로그(userId);

        return new CMRespDto<>(1, "개인벨로그",userVelogRespDto);
        //return null;
    }



    @GetMapping("/user/likelist")  //내가 좋아요 한 글들.
    public CMRespDto<?> findAllByLike(@AuthenticationPrincipal PrincipalDetails details, @PageableDefault(size = 10) Pageable pageable){

        log.info("유저 개인이 좋아요 한 글 리스트");

//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        //@AuthenticationPrincipal PrincipalDetails details,  이거 못 쓰겠네.. 테스트 때는 된 거 같은데..
//       log.info("principal 하고 details가 다른가.. " + ((PrincipalDetails)principal).getUser().getId());
//       //log.info(details.getUser().getUsername());
//
//        if(details != null){
//            log.info(details.getUser().getId().toString());
//        }

        if(details == null){
            throw new NoLoginException("로그인이 필요한 서비스입니다");
        }

        Page<Post> likePosts = userService.좋아요게시글목록(details.getUser().getId(), pageable );
        return new CMRespDto<>(1, "좋아요 한 게시글목록", likePosts);
    }




}
