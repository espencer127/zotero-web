const http = require('http');

const options = {
  'method': 'GET',
  'hostname': 'localhost',
  'port': 23119,
  'path': '/api/',
  'headers': {
  },
  'maxRedirects': 20
};

const hostname = '127.0.0.1'
const port = 8080

function getPosts() {
const getPosts = () => {
  let data = '';

  console.log("gonna send stuff");
  const request = http.request(options, (response) => {
    // Set the encoding, so we don't get log to the console a bunch of gibberish binary data
    response.setEncoding('utf8');

    // As data starts streaming in, add each chunk to "data"
    response.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    response.on('end', () => {
      console.log(data);

      const server = http.createServer((req,res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify(data));
      });

    });
      server.listen(port, hostname, () => {
                      console.log("Server running at http://${hostname}:${port}/");
      });
    });


  // Log errors if any occur
  request.on('error', (error) => {
    console.error(error);
  });

  // End the request
  //request.end();
};
}

module.exports = { getPosts }