//NodeJs core modules
const http = require('http');
const url = require('url');
const fs = require('fs');

//Product data

let data = fs.readFileSync(`${__dirname}/data/books.json`, 'utf-8');

let books = JSON.parse(data);

//Server
const hostname = 'localhost';
const port = '8888';

const server = http.createServer((req, res)=>{
    const {pathname, query} = url.parse(req.url, true);
    switch (pathname){
        case '/api/v1/books': //Returns the full list of books
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(data);
            break;
        case '/api/v1/book': //Returns book by id
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(books[query.id]));
            break;
                
        default:
            res.writeHead(404, {
                'Content-Type': 'text/html'
            })
            res.end("<h1>Page not found</h1>")
    }
})

server.listen(port, hostname, ()=>{
    console.log(`Server is listening on port: ${port}`)
})