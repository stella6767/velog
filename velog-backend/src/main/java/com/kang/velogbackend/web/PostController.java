package com.kang.velogbackend.web;

import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.domain.post.Post;
import com.kang.velogbackend.handler.customexception.NoLoginException;
import com.kang.velogbackend.service.LikesService;
import com.kang.velogbackend.service.PostService;
import com.kang.velogbackend.web.dto.CMRespDto;
import com.kang.velogbackend.web.dto.post.PostSaveReqDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class PostController {

    private static final Logger log = LoggerFactory.getLogger(PostController.class);
    private final PostService postService;
    private  final LikesService likesService;
    private Long id = 0L;

    // 주소: /post/all?page=0   자동으로 이렇게 먹음
    @GetMapping("/post/all")
    public CMRespDto<?> findAllByRecent(@AuthenticationPrincipal PrincipalDetails details, @PageableDefault(sort = "id",direction = Sort.Direction.DESC, size = 10) Pageable pageable){

        log.info("최신게시글 페이지.");

        if(details != null){
            id = details.getUser().getId();
        }
        Page<Post> posts = postService.전체찾기(id, pageable);
        return new CMRespDto<>(1, "게시글리스트 불러오기", posts);
    }


    @GetMapping("/post/trend")  //프론트단에서는 "/" 로 맵핑.
    public CMRespDto<?> findAllByLike(@AuthenticationPrincipal PrincipalDetails details, @PageableDefault(size = 10) Pageable pageable){

        log.info("메인 페이지(트렌딩 페이지)");

        if(details != null){
            id = details.getUser().getId();
        }

        Page<Post> posts = postService.트렌딩게시글(id, pageable);
        return new CMRespDto<>(1, "게시글리스트 불러오기", posts);
    }




    @PostMapping("/post")
    public CMRespDto<?> image(@RequestBody PostSaveReqDto postSaveReqDto, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        log.info("저장하기 요청 옴" + postSaveReqDto.getTitle());

        if(principalDetails == null) {
            log.info("세션에 없네??");
            throw new NoLoginException("로그인이 필요한 서비스입니다.");
        }

        Long postId = postService.저장하기(postSaveReqDto, principalDetails);
        return new CMRespDto<>(1,"게시글 저장 성공",postId );
    }


    @GetMapping("/post/search")
    public CMRespDto<?> search(@RequestParam(value="keyword") String keyword,
                         @PageableDefault(sort = "id",direction = Sort.Direction.DESC, size = 10) Pageable pageable) {

        log.info("키워드 "+keyword);

        Page<Post> searchPosts = postService.검색하기(keyword,pageable);

        return new CMRespDto<>(1, keyword + " 검색결과", searchPosts);
    }





//    @PostMapping("/post/{id}/thumbnail")
//    public CMRespDto<?> postThumbnail(@PathVariable int id, MultipartFile postThumbnail, @AuthenticationPrincipal PrincipalDetails principalDetails){
//        log.info("들어옴 " + id);
//        log.info("파일 받기 : "+postThumbnail.getOriginalFilename());
//        return null;
//    }



    @GetMapping("/post/{userId}/{postId}")
    public CMRespDto<?> detail(@PathVariable Long userId, @PathVariable Long postId, @AuthenticationPrincipal PrincipalDetails details) {

        log.info("게시글 싱세보기." + userId+" " + postId);

        if(details != null) {
            id = details.getUser().getId();
        }

        return new CMRespDto<>(1,"게시글 상세보기", postService.한건가져오기(userId, postId, id));
    }


    @PostMapping("/post/{postId}/likes")
    public CMRespDto<?> like(@AuthenticationPrincipal PrincipalDetails principalDetails, @PathVariable Long postId){

        log.info("좋아요 버튼 클릭");
        if(principalDetails == null) {
            throw new NoLoginException("로그인이 필요한 서비스입니다.");
        }

        likesService.좋아요(postId, principalDetails.getUser().getId());
        return new CMRespDto<>(1, "좋아요 등록",null);
    }


    @DeleteMapping("/post/{postId}/likes")
    public CMRespDto<?> unLike(@AuthenticationPrincipal PrincipalDetails principalDetails, @PathVariable Long postId){
        log.info("좋아요 해제 클릭");
        if(principalDetails == null) {
            throw new NoLoginException("로그인이 필요한 서비스입니다.");
        }

        likesService.싫어요(postId, principalDetails.getUser().getId());
        return new CMRespDto<>(1, "좋아요 해제",null);
    }



}
