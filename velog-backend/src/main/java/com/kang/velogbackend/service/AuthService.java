package com.kang.velogbackend.service;

import com.kang.velogbackend.domain.user.Role;
import com.kang.velogbackend.domain.user.User;
import com.kang.velogbackend.domain.user.UserRepository;
import com.kang.velogbackend.handler.customexception.DuplicateException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public void 회원가입(User user) { //@RestController가 아니니까 return 할 필요없음. 리액트나 안드로이드에게 던질 때는 리턴 필요

        //여기서 trim 검사말고 프론트쪽에서 검사하는 게 나을듯.

        User userEntity = userRepository.findByUsername(user.getUsername());

        if(userEntity != null){
            log.info("같은 유저네임이 있다면..");
            throw new DuplicateException("직접 해야지 핸들러가 처리하네..");
        }


        String rawPassword = user.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        user.commonJoin(encPassword, Role.USER);

        log.info("user: '{}'",user);

        userRepository.save(user);
    }



}

