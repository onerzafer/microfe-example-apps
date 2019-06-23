const handler = require('serve-handler');
const http = require('http');
const fs = require('fs');
const request = require('request');

function serve() {
  const server = http.createServer((request, response) => {
    return handler(request, response, {
      public: `${__dirname}/dist`,
      directoryListing: ['/**'],
    });
  });

  server.listen(3004, () => {
    console.log('Running at http://localhost:3004');
  });
}

function register() {
  fs.createReadStream(`${__dirname}/dist/index.html`).pipe(
    request
      .post('http://localhost:3000/register')
      .on('response', resp => {
        console.log('CONTENT REGISTER', resp.body);
      })
      .on('error', err => {
        console.log('CONTENT REGISTER ERR', err);
      })
  );
}

serve();
register();
