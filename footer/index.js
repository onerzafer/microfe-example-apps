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

  server.listen(3003, () => {
    console.log('Running at http://localhost:3003');
  });
}

function register() {
  fs.createReadStream(`${__dirname}/dist/index.html`).pipe(
    request
      .post('http://localhost:3000/register')
      .on('response', resp => {
        console.log('FOOTER REGISTER', resp.body);
      })
      .on('error', err => {
        console.log('FOOTER REGISTER ERR', err);
      })
  );
}

serve();
register();
