package com.kang.velogbackend.web.dto.user;

import com.kang.velogbackend.domain.tag.Tag;
import com.kang.velogbackend.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserVelogRespDto {
    private User user;
    private Long postCount;
    private List<Tag> tags;

}
