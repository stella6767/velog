# velog 클론코딩 

개발인원: 1명 , 실개발기간: 1달

## 스프링 부트

Backend-server

### `의존성`

- Springboot ^2.0
- Lombok
- Spring Data JPA
- MySQL Driver
- Spring Security
- Spring Web
- JWT
- Jsoup
- Gradle
- Spring Redis

### `DB 설정`

```
create user 'kang'@'%' identified by 'Stella@6767';
GRANT ALL PRIVILEGES ON *.* TO 'kang'@'%';
create database velog;
```

### `yml 설정`
```

server:
  port: 8080
  servlet:
    context-path: /
    encoding:
      charset: utf-8
      enabled: true

spring:
  cache:
    type: redis
  redis:
    host: 127.0.0.1
    port: 6397

    lettuce:
      pool:
        max-active: 10
        max-idle: 10
        min-idle: 5

  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/velog?serverTimezone=Asia/Seoul&useSSL=false&allowPublicKeyRetrieval=true
    username: kang
    password: Stella@6767

  jpa:
    open-in-view: true
    hibernate:
      ddl-auto: update
      naming:
        physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
#    show-sql: true

  jackson:
    serialization:
      fail-on-empty-beans: false

    security:
      user:
        name: kang
        password: 1234

jwt:
  secret: kimdonggeunkimdonggeunkimdonggeunkimdonggeunkimdonggeunkimdonggeunkimdonggeunkimdonggeun

```
### `JPA Model`

- Comment (Recomment)
- Likes
- Post
- Tag
- User


### `시큐리티 설정`

![img.png](img.png)




## React

Frontend-server

### `의존성`

```
"dependencies": {
    "antd": "^4.15.5",
    "axios": "^0.21.1",
    "faker": "^5.5.3",
    "immer": "^9.0.2",
    "moment": "^2.29.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-google-login": "^5.2.2",
    "react-icons": "^4.2.0",
    "react-quill": "^1.3.5",
    "react-redux": "^7.2.4",
    "react-refresh": "^0.8.3",
    "react-router-dom": "^5.2.0",
    "redux": "^4.1.0",
    "redux-actions": "^2.6.5",
    "redux-devtools-extension": "^2.13.9",
    "redux-saga": "^1.1.3",
    "shortid": "^2.2.16",
    "styled-components": "^5.3.0",
  },
```


### prettierrc

```

{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 130
}
```

