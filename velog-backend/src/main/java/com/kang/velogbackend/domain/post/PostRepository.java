package com.kang.velogbackend.domain.post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long> {


    @Query(
            value = "select * from Post where id in (select postId from (select postId, count(postId) likeCount from Likes group by postId order by 2 desc) t)",
            countQuery = "select * from Post where id in (select postId from (select postId, count(postId) likeCount from Likes group by postId order by 2 desc) t)",
            nativeQuery = true
    )
    Page<Post> mTrending(Pageable pageable);


    @Query(
            value = "select * from Post where id in (select postId from (select postId, count(postId) likeCount from Likes where userId =:principalId group by postId order by 2 desc) t)",
            countQuery = "select * from Post where id in (select postId from (select postId, count(postId) likeCount from Likes where userId =:principalId group by postId order by 2 desc) t)",
            nativeQuery = true
    )
    Page<Post> mLikeList(Pageable pageable, @Param("principalId") Long principalId);




    @Query(value ="select p.* FROM Post p WHERE p.title LIKE %:keyword% OR p.content LIKE %:keyword%",
            countQuery = "SELECT count(*) FROM Post p WHERE p.title like %:keyword% OR p.content LIKE %:keyword%", nativeQuery = true)
    Page<Post> mFindByKeyword(@Param("keyword") String keyword, Pageable pageable);

}
