package com.kang.velogbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//@EnableCaching//따로 빈을 만들어 주지 않아도 CacheManager, EhCacheManagerFactoryBean이 생성되게 된다.
@SpringBootApplication
public class VelogBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(VelogBackendApplication.class, args);
    }

}
