const express = require('express')

const server = express()

server.get('/', () =>{
    console.log('Estamos no caminho certo !!')
})

server.listen(3333)