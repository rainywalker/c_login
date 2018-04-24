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

| request   |   URI              |
|:---------:|:------------------:|
| **POST** | /api/auth/signup |


* Body
  - username : string,
  - email :  string,
  - password : string

>로그인

| request   |   URI              |
|:---------:|:------------------:|
| **POST** | /api/auth/sigin |

* Body
  - email :  string,
  - password : string

>로그아웃

| request   |   URI              |
|:---------:|:------------------:|
| **POST** | /api/auth/signout |



>유저 중복 체크

| request   |   URI              |
|:---------:|:------------------:|
| **GET** | /api/auth/exists/{username or email}/{value}   




>로그인 유무 체크

| request   |   URI              |
|:---------:|:------------------:|
| **GET**   | /api/auth/check    |


 
