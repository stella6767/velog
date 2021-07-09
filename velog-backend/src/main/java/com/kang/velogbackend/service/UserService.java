package com.kang.velogbackend.service;

import com.kang.velogbackend.domain.post.Post;
import com.kang.velogbackend.domain.post.PostRepository;
import com.kang.velogbackend.domain.tag.Tag;
import com.kang.velogbackend.domain.tag.TagRepository;
import com.kang.velogbackend.domain.user.User;
import com.kang.velogbackend.domain.user.UserRepository;
import com.kang.velogbackend.web.dto.user.UserVelogRespDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final TagRepository tagRepository;


    @Transactional
    public User 회원찾기(Long id) {
        User userEntity = userRepository.findById(id).orElseThrow(()->{
            return new IllegalArgumentException("id를 찾을 수 없습니다.");
        }); //1차 캐시
        return userEntity;
    }//더티체킹


    @Transactional(readOnly = true)
    public UserVelogRespDto 회원블로그(Long userId) {
        UserVelogRespDto userVelogRespDto = new UserVelogRespDto();

        User userEntity = userRepository.findById(userId).orElseThrow(()-> {
            return new IllegalArgumentException();
        });

        userVelogRespDto.setPostCount((long) userEntity.getPosts().size());

        userEntity.getPosts().forEach((post) ->{
            post.setLikeCount(post.getLikes().size());
        });//굳이 likeCount 집어넣을 필요없이 userEntity의 image의 likes 사이즈 들고오면 되지만, 뷰에서 연산을 최소화하기 위해 set해주는 작업을 거치자.

        List<Tag> tagsEntity = tagRepository.mFindUserTags(userId);

        userVelogRespDto.setTags(tagsEntity);
        userVelogRespDto.setUser(userEntity);

        return userVelogRespDto;
    }



    @Transactional(readOnly = true)
    public Page<Post> 좋아요게시글목록(Long principalId, Pageable pageable){

        log.info("전체찾기");
        Page<Post> likePosts = postRepository.mLikeList(pageable, principalId);

            //좋아요 하트 색깔 로직
        likePosts.forEach((post)->{
                int likeCount = post.getLikes().size();
                post.setLikeCount(likeCount);
                        post.setLikeState(true);

            });


        return likePosts;
    }




}
