package com.kang.velogbackend.domain.tag;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag,Long> {

    @Query(value = "select * from Tag where postId in (select Id from Post where userId = :userId)", nativeQuery=true)
    List<Tag> mFindUserTags(@Param("userId") Long userId);


}
