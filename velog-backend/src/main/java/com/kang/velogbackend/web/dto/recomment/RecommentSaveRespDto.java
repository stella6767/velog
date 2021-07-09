package com.kang.velogbackend.web.dto.recomment;

import com.kang.velogbackend.domain.comment.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommentSaveRespDto {

    private Long id;

    private String content;

    //딱히 방법을 찾지 못하겠다. lazyloading 을 유지하면서.. post request.
    private Comment comment;

    //유저 엔티티의 post 클래스 lazy loading 이슈를 피하기 위해.. 필요한 유저정보만 들고오겠다..
    private Long userId;

    private String username;
}
