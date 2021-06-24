## Install & Run

```
$ git clone https://github.com/michael-act/Dicoding
$ cd Dicoding/Notes\ App\ Backend
$ npm run start-prod # Just in production
$ npm run start-dev # If you run for development
```

#### Try your first Notes Backend program

```shell
$ curl -X POST "{\"title\": \"Teman terbaik\", \"tags\": [\"Pertemanan\", \"Terbaik\"], \"body\": \"Pertemanan yang baik itu dibangun bersama-sama bre!\"}" IP:HOST/notes 

{
  "status": "success",
  "message": "Catatan berhasil ditambahkan",
  "data": {
    "noteId": "V09YExygSUYogwWJ"
  }
}


$ curl -X GET IP:HOST/notes 
{
  "status": "success",
  "data": {
    "notes": [
      {
        "id":"notes-V1StGXR8_Z5jdHi6B-myT",
        "title":"Teman Terbaik",
        "createdAt":"2020-12-23T23:00:09.686Z",
        "updatedAt":"2020-12-23T23:00:09.686Z",
        "tags":[
          "Pertemanan",
          "Terbaik"
        ],
        "body":"Pertemanan yang baik itu dibangun bersama-sama bre!"
      },
    ]
  }
}
```
Please understand the codes in `./src` for further understanding. 

