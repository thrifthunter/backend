# backend

before star run ``npm i`` first.

To start the web api
``npm run start`` or ``npm run dev``

## List routes 

### 1. /register 

method **POST**.

request body example: 
```
{
  "email" : "myemail@test.com",
  "password" : "mysecretpassword",
  "username" : "myusername",
  "phone" : "090080800909"
}
```
success response example:
```
{
    "error": false,
    "message": "Berhasil registrasi pengguna baru - myemail@test.com",
    "values": {
        "username": "myusername",
        "email": "myemail@test.com",
        "phone" : "090080800909"
    }
}
```
    
### 2. /login
method **POST**.

request body example: 
```
{
    "email":"myemail@test.com",
    "password":"mysecretpassword"
}
```
success response example:
```
{
    "error": false,
    "message": "Berhasil login!",
    "values": {
        "username": "myusername",
        "email": "myemail@test.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImlhdCI6MTY1MjQwNzEzNywiZXhwIjoxNjUyNDA3MTk3fQ.gEH58GkPHEZh0_SWgAADiynXtoZ-H5oj3WcMyhvjljc"
    }
}
```
### 3. /profile
method **GET**.

request header example: 
```
{
    "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImlhdCI6MTY1MjQwNzEzNywiZXhwIjoxNjUyNDA3MTk3fQ.gEH58GkPHEZh0_SWgAADiynXtoZ-H5oj3WcMyhvjljc"
}
```
success response example:
```
{
    "error": false,
    "message": "Success",
    "values": {
        "username": "myusername",
        "email": "myemail@test.com",
        "phone" : "090080800909"
    }
}
```
