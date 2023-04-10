const http = require('http');
const qs = require('querystring');
const rental = require('./rentalPrice');

const port = 3000;
const host = '127.0.0.1';

const server = http.createServer(function (request, response) {
  console.dir(request.param);

  if (request.method === 'POST') {
    console.log('POST');
    let body = '';
    request.on('data', function (data) {
      body += data;
    });

    request.on('end', function () {
      const post = qs.parse(body);
      console.log(post);
      const result = rental.price(Number(post.age), Number(post.licence), Number(post.clazz), parseBool(post.acc), parseBool(post.acc2), parseBool(post.season));
      console.log(result);
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end('Result: ' + result);
    });
  } else {
    const html = `
      <html>
        <body>
          <form id="calcForm" method="post" action="http://localhost:3000">
            Driver: <br>
            <input type="number" name="age"/>
            <label for="html">Your age?</label><br>
            <input type="number" name="licence" />
            <label for="html">How long have you had your licence?</label><br>
            <input type="number" name="clazz" />
            <label for="html">Class of the car (1 to 5)</label><br>
            <input type=checkbox name="acc" />
            <label for="html">Have you caused accidents?</label><br>
            <input type=checkbox name="acc2" />
            <label for="html">Have you participated in any accidents?</label><br>
            <input type=checkbox name="season" />
            <label for="html">Is it high season?</label><br>
            <input type="submit" value="Add" />
          </form>
        </body>
      </html>`;
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(html);
  }

  function parseBool(val) {
    let updatedVal = false;
    if (val === 'on') {
      updatedVal = true;
    }
    return updatedVal;
  }
});

server.listen(port, host);
console.log(`Listening at http://${host}:${port}`);