package com.kang.velogbackend.web.dto.recomment;

import com.kang.velogbackend.domain.comment.recomment.Recomment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommentSaveReqDto {

    private String content; //일단은 만들어놓자..

    public Recomment toEntity() {

        return Recomment.builder()
                .content(content)
                .build();
    }
}
