const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

const puppies = require('./puppies');


app.use(morgan('dev'))
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json())
// const coreysLoggingMiddleware = () => {
//     return function(req, res, next){
//         console.log(req.method, req.path);
//         next();
//     }
// }
// app.use(coreysLoggingMiddleware())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/puppies', (req, res) => {
    // res.status(200)
    // res.send('<h1>This is soooo cool!</h1>')
    res.send(puppies);
})

// app.put('/puppies/:id', (req, res) => {

// })

//param called id is accessible req.params.id
app.get('/puppies/:id', (req, res) => {
    const puppyId = Number(req.params.id) - 1;
    res.send(puppies[puppyId]);
})

app.post('/puppies', (req, res) => {
    const age = Number(req.body.age) || 0;
    const name = req.body.name || 'Tido';  
    puppies.push({
        name,
        age
    })
    res.send(puppies);
})


app.listen(3000);

// const http = require('http');
// const server = http.createServer();

// server.on('request', (req, res) => {
//     res.writeHead(200);
//     res.write('<h1>This is soooo cool!</h1>');
//     res.end();
// })

// server.listen(3000)