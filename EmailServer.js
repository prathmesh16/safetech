var express = require('express');
var app = express();
var cors = require('cors')
var PORT = process.env.PORT || 8081;

var nodemailer = require('nodemailer');

app.use(cors())

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var http = require('http');
var server = http.Server(app);

app.use(express.static('client'));

server.listen(PORT, function() {
  console.log('Chat server running');
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'agri.tech.mh@gmail.com',
      pass: 'agritech@123'
    }
});
  


app.get('/', function (req, res) {
    console.log("Got a POST request for the homepage");
    res.send('Hello World');
 })

// This responds a POST request for the homepage
app.post('/SendEmail', function (req, res) {
   console.log("Got a POST request for the SendEmail");
   var mailOptions2 = {
    from: 'agri.tech.mh@gmail.com',
    to: 'agri.tech.mh@gmail.com',
    subject: 'Contact with SafeTech Fire Services',
    text: 'Email: '+req.body.email + ' Phone: '+req.body.phone
    };
   transporter.sendMail(mailOptions2, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

   var mailOptions = {
    from: 'agri.tech.mh@gmail.com',
    to: req.body.email,
    subject: 'Contact with SafeTech Fire Services',
    text: 'Email sent Successfully! SafeTech Team will contact you shortly!'
};
   transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.setHeader('content-type', 'text/plain');
            res.send('Email sent Successfully! SafeTech Team will contact you shortly!');   
        }
  });
 
})




