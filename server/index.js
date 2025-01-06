const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())

//console.log(app)

var http = require('follow-redirects').http;
var fs = require('fs');


app.get('/', (req, resp) => {
    console.log("got a request")

    var options = {
      'method': 'GET',
      'hostname': 'localhost',
      'port': 23119,
      'path': '/api/users/0/collections',
      'headers': {
        'Content-Type': 'text/plain'
      },
      'maxRedirects': 20
    };

    var body;

    var zoteroreq = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function (chunk) {
        body = Buffer.concat(chunks);
        console.log("ln 38 response " + body.toString());
        resp.send(body.toString());
      });

      res.on("error", function (error) {
        console.error(error);
      });
    }).end();

})

app.post('/collectionItems/:collectionKey', (req, resp) => {
  console.log("got a request to retrieve collection items")

  var options = {
    'method': 'GET',
    'hostname': 'localhost',
    'port': 23119,
    'path': '/api/users/0/collections/'+ req.params.collectionKey + '/items',
    'headers': {
      'Content-Type': 'text/plain'
    },
    'maxRedirects': 20
  };

  var body;

  var zoteroreq = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      body = Buffer.concat(chunks);
      console.log("API call had the path of " + options.path);
      //console.log("API call response for collection items: " + body.toString());
      resp.send(body.toString());
    });

    res.on("error", function (error) {
      console.error(error);
    });
  }).end();

})

app.listen(3030, () => {
    console.log('server listening on 3030')
})

