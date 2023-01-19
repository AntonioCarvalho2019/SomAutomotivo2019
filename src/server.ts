const express = require('express');

const server = express();

server.get('/', (req, res) =>{
    return res.json({msg: "hello world"});
});

server.listen(3333, () =>{
console.log('porta 3333');
});