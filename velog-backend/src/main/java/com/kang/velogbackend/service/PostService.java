package com.kang.velogbackend.service;

import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.domain.post.Post;
import com.kang.velogbackend.domain.post.PostRepository;
import com.kang.velogbackend.domain.tag.Tag;
import com.kang.velogbackend.domain.tag.TagRepository;
import com.kang.velogbackend.utils.TagUtils;
import com.kang.velogbackend.web.dto.post.PostSaveReqDto;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PostService {

    private static final Logger log = LoggerFactory.getLogger(PostService.class);

    private final PostRepository postRepository;
    private final TagRepository tagRepository;


    @Transactional(readOnly = true) //1.변경감지 안하도록 하고(쓸데없는 연산제거), 2.고립성 유지
    public Page<Post> 검색하기(String keyword, Pageable pageable){
        return postRepository.mFindByKeyword(keyword,pageable);
    }





    @Transactional//서비스 함수가 종료될 때 commit할지 rollback할지 트랜잭션 관리하겠다.
    public Long 저장하기(PostSaveReqDto postSaveReqDto, PrincipalDetails principalDetails)  {

        log.info("저장하기 요청 옴.");
        String imgSrc = null;

        //썸네일 추출
        Document doc = Jsoup.parseBodyFragment(postSaveReqDto.getContent());
        Elements imgs = doc.getElementsByTag("img");
        if(imgs.size() > 0) {
            imgSrc = imgs.get(0).attr("src"); //첫번째 이미지 썸네일
            //log.info("thunnail 추출: " + src);

//            BASE64Decoder base64Decoder = new BASE64Decoder();
//            byte[] decodeSrc = base64Decoder.decodeBuffer(imgSrc);
//            log.info("decode" + decodeSrc.toString());

        }

        Post post = postSaveReqDto.toEntity(imgSrc, principalDetails.getUser());
        Post postEntity = postRepository.save(post);

        log.info("null pointer? " + postSaveReqDto.getTags());

        if(postSaveReqDto.getTags() != null){
            List<Tag> tags = TagUtils.parsingToTagObject(postSaveReqDto.getTags(), postEntity);
            tagRepository.saveAll(tags);

        }

        return postEntity.getId();
    }


    @Transactional(readOnly = true) //JPA 변경감지라는 내부 기능 활성화 X, update시의 정합성을 유지해줌. inset의 유령데이터현상(팬텀현상) 못막음
    public Post 한건가져오기(Long userId, Long postId, Long principalId) {

        log.info("게시글 상세보기 서비스 " );

        if(userId == principalId){
            log.info("내 벨로그 글에 들어왔다고 판단");
        }

        Post postEntity = postRepository.findById(postId) //함수형으로 변환
                .orElseThrow(()->new IllegalArgumentException("id를 확인해주세요!"));


        int likeCount = postEntity.getLikes().size();
        postEntity.setLikeCount(likeCount); //view에서 연산을 최소한 하기 위해

        if(principalId != 0L){
            postEntity.getLikes().forEach((like -> {
                if(like.getUser().getId() == principalId){
                    postEntity.setLikeState(true);
                }
            }));
        }

        return postEntity;
    }


    @Transactional(readOnly = true)
    public Page<Post> 트렌딩게시글(Long principalId, Pageable pageable){

        log.info("전체찾기");
        Page<Post> posts = postRepository.mTrending(pageable);


        if(principalId != 0L){
            //좋아요 하트 색깔 로직
            posts.forEach((post)->{

                int likeCount = post.getLikes().size();
                post.setLikeCount(likeCount);

                post.getLikes().forEach((like)->{
                    if(like.getUser().getId() == principalId) {
                        post.setLikeState(true);
                    }
                });
            });
        }

        return posts;
    }



    @Transactional(readOnly = true)
    public Page<Post> 전체찾기(Long principalId, Pageable pageable){

        log.info("최신 순으로 찾기");
        Page<Post> posts = postRepository.findAll(pageable);


        if(principalId != 0L){
            //좋아요 하트 색깔 로직
            posts.forEach((post)->{

                int likeCount = post.getLikes().size();
                post.setLikeCount(likeCount);

                post.getLikes().forEach((like)->{
                    if(like.getUser().getId() == principalId) {
                        post.setLikeState(true);
                    }
                });
            });
        }

        return posts;
    }

//    @Transactional
//    public Post 수정하기(Long id, Post Post) {
//        //더티체킹 update치기
//        Post postEntity = postRepository.findById(id)
//                .orElseThrow(()->new IllegalArgumentException("id를 확인해주세요!!"));// 영속화 (Post 오브젝트) -영속성 컨텍스트 보관
//
//        postEntity.setTitle(Post.getTitle());
//        postEntity.setAuthor(Post.getAuthor());
//
//        return PostEntity;
//    }//함수 종료=>트랜잭션 종료 => 영속화 되어있는 데이터를 DB로 갱신(flush) => commit ===========>더티체킹

    @Transactional
    public String 삭제하기(Long id) {
        postRepository.deleteById(id);//오류가 터지면 익셉션을 타니까...신경쓰지 말고

        return "ok";
    }


}
