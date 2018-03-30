# c_login (Common Login)
c_login in the jm_modules

__MognoDB is required__

## Installation

```
fork this repo | clone the repo
npm install | yarn
```

## API

>회원가입

|         |                                             |
|:---------:|---------------------------------------------|
| **POST** | /api/auth/signup |


* Body
  - username : string,
  - email :  string,
  - password : string

>로그인

|         |                                             |
|:---------:|---------------------------------------------|
| **POST** | /api/auth/sigin |

* Body
  - email :  string,
  - password : string

>로그아웃

|         |                                             |
|:---------:|---------------------------------------------|
| **POST** | /api/auth/signout |


* Body
  - email :  string,
  - password : string

>유저 중복 체크

|         |                                             |
|:---------:|---------------------------------------------|
| **GET** | /api/auth/exists/{username or email}/{value}   




>로그인 유무 체크

|           |                    |
|:---------:|--------------------|
| **GET**   | /api/auth/check    |


 
