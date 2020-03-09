const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
app.use(
  helmet({
    noCache: true
  })
);
app.use(
  hsts({
    maxAge: 15552000 // 180 days in seconds
  })
);

app.use(
  express.static(path.join(__dirname, 'dist/softrams-racing'), {
    etag: false
  })
);

app.get('/api/members', (req, res) => {
  request('http://localhost:3000/members', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});


// TODO: Dropdown!
app.get('/api/teams', (req, res) => {
  request('http://localhost:3000/teams', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Submit Form!
app.post('/api/addMember', (req, res) => {
  try
  {
    var clientServerOptions = {
      uri: 'http://localhost:3000/members',
      body: JSON.stringify(req.body),
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
    }
    request(clientServerOptions, function (error, response) {
        res.send(response.body);
    });

  } catch(err) {
   console.log(err);
 }
});

app.get('/api/member/:id', (req, res) => {
  const id = req.params['id'];
  request('http://localhost:3000/members/' + id, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

app.delete('/api/member/:id', (req, res) => {
  try{
    const id = req.params['id'];
    var clientServerOptions = {
      uri: 'http://localhost:3000/members/' + id,
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
    }
    request(clientServerOptions, function (error, response) {
      res.send();
    });
  } catch(err) {
     console.log(err)
  }

});

app.put('/api/member/:id', (req, res) => {
  const id = req.params['id'];
  const body = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    jobTitle: req.body.jobTitle,
    team: req.body.team,
    status: req.body.status
  };

  var clientServerOptions = {
    uri: 'http://localhost:3000/members/' + id,
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
        'Content-Type': 'application/json'
    }
  }
  request(clientServerOptions, function (error, response) {
      console.log(error,response.statusCode);
      res.send();
  });
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/softrams-racing/index.html'));
});


app.listen('8000', () => {
  console.log('Vrrrum Vrrrum! Server starting!');
});
