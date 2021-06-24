## Install & Run

```
$ git clone https://github.com/michael-act/Dicoding
$ cd Dicoding/Bookshelf\ API
$ npm run start-prod # Just in production
$ npm run start-dev # If you run for development
```

#### Try your first Bookshelf Backend program

```shell
$ curl -X POST "{
  \"name\": \"Docker Images\",
  \"year\": 2021,
  \"author\": \"Michael\",
  \"summary\": \"Pembahasan mendasar Docker Images.\",
  \"publisher\": \"NN\",
  \"pageCount\": 100,
  \"readPage\": 0,
  \"reading\": false
}" HOST:PORT/books
{
  "status": "success", 
  "message": "Buku berhasil ditambahkan", 
  "data": {
  	"bookId": 3jfj3f-w20293o42
  }
}

$ curl -X GET HOST:PORT/books/
All books data...

$ curl -X PUT "{
  \"name\": \"Images Docker\",
  \"year\": 2020,
  \"author\": \"Michael Act\",
  \"summary\": \"Pembahasan mendasar Docker Images.\",
  \"publisher\": \"NN\",
  \"pageCount\": 3,
  \"readPage\": 3,
  \"reading\": true
}" HOST:PORT/books/3jfj3f-w20293o42
{
  "status": "success", 
  "message": "Buku berhasil diperbarui"
}
```
Please understand the codes in `./src` for further understanding. 

