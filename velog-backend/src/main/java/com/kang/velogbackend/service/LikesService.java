package com.kang.velogbackend.service;

import com.kang.velogbackend.domain.likes.LikesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class LikesService {

    private final LikesRepository likesRepository;

    @Transactional
    public void 좋아요(Long postId, Long principalId) {
        likesRepository.mLike(postId, principalId);
    }

    @Transactional
    public void 싫어요(Long postId, Long principalId) {
        likesRepository.mUnLike(postId, principalId);
    }


}
