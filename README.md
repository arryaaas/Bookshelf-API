# Bookshelf-Api

RESTful API for Bookshelf - Cloud Computing Bangkit 2022.

## Routing

| Method | Path | Response Code | Body | Description |
|---|---|---|---|---|
| POST | /books | 201 | JSON | Create new books |
| GET | /books | 200 | JSON | Get a list of books |
| GET | /books/:id | 200 | JSON | Get book details |
| PUT | /books/:id | 200 | JSON | Update books |
| DELETE | /books/:id | 200 | JSON | Delete books |

## Data structure

```JSON
{
    "id": "Qbax5Oy7L8WKf74l",
    "name": "Buku A",
    "year": 2010,
    "author": "John Doe",
    "summary": "Lorem ipsum dolor sit amet",
    "publisher": "Dicoding Indonesia",
    "pageCount": 100,
    "readPage": 25,
    "finished": false,
    "reading": false,
    "insertedAt": "2021-03-04T09:11:44.598Z",
    "updatedAt": "2021-03-04T09:11:44.598Z"
}
```

## Server options

- `port` 5000
- `host` localhost


## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Mochammad Arya Salsabila - Aryasalsabila789@gmail.com
