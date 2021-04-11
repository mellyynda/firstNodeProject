// followed Net Ninjas videos on youtube: https://www.youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU
//server is using express and lodash packages as dependencyes and nodemon for running locally

//installed express and imported it
const express = require('express');

//imported lodash library
const _ = require('lodash');

//stored one express instance in app
const app = express();

//app listening on port 3000
app.listen(3000);

//setting hompage to return quotes object
app.get('/', (req, res) => {

    //setting status to file sent https://stackoverflow.com/questions/26066785/proper-way-to-set-response-status-and-json-content-in-a-rest-api-made-with-nodej
    res.status(200).sendFile('data.json', { root: __dirname + '/views'});
})

//api for custom random number between 0 and requested num https://www.robinwieruch.de/node-express-server-rest-api
app.get(`/api/count-vowels/:string`, (req, res) => {

    //storing sent string in text
    const text = req.params.string;

    //small regex that counts vowels: https://stackoverflow.com/questions/29450399/counting-number-of-vowels-in-a-string-with-javascript
    function getVowels(str) {
        var m = str.match(/[aeiou]/gi);
        return m === null ? 0 : m.length;
      }

    //sending a random number between 0 and num request parameter
    res.status(200).send({ text, vowels: getVowels(text) });
})

//api for random number between 0 and 1023
app.get('/api/random', (req, res) => {

    //lodash get random number between
    const number = _.random(0, 1023);

    //sending a random number between 0 and 1023
    res.status(200).send({ number });
})

//api for custom random number between 0 and requested num https://www.robinwieruch.de/node-express-server-rest-api
app.get(`/api/random/:num`, (req, res) => {

    //lodash get random number between o and num request parameter
    const number = _.random(0, req.params.num);

    //sending a random number between 0 and num request parameter
    res.status(200).send({ number });
})

//404 page
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).send({ error: true, status: 404, message: 'Oops, file not found'});
})