const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');

import Event from './event'
import { parseICALdata } from './functions'


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nanterrehang@gmail.com',
      pass: 'AzertyuioP'
    }
  });

// https://planning-paris.inseecu.net/Telechargements/ical/Edt_LLOBREGAT.ics?version=2019.0.4.0&idICal=ED8C99CB6BE8F57EC536877E01FC1D6F&param=643d5b312e2e36325d2666683d3126663d31

app.use(bodyParser.json())

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'Client/build')));


app.post('/api/getIcalData', async function(req: { body: { ical: string; }; }, res: { json: (arg0: { status: string; message: string | Event[]; }) => void; }) {
    console.log("*** API REQUEST (GET) : /api/getIcalData ***")
    console.log("Parameters given : " + JSON.stringify(req.body))

    // Verifying parameters
    if (!req.body.ical) {
        console.log("ERROR : Not enough parameters given. Check readme.md to have more informations.")
        res.json({
            status: "failed",
            message: "Missing parameters"
        });
    }
    else {
        let events = await parseICALdata(req.body.ical)
        if(events.length > 0){
            console.log("Data successfully fetched")
            res.json({
                status: "success",
                message: events
            })
        }
        else{
            console.log("Return empty set, url specified may not work")
            res.json({
                status: "failed",
                message: "Return empty set, url specified may not work"
            })
        }
    }
});

app.post('/api/sendEmail', function(req, res) {
    console.log("*** API REQUEST (GET) : /api/getIcalData ***")
    console.log("Parameters given : " + JSON.stringify(req.body))

    if(req.body.to && req.body.subject && req.body.text){
          var mailOptions = {
            from: 'nanterreHang@gmail.com',
            to: req.body.to,
            subject: req.body.subject,
            html: req.body.text
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.json({
                    status: 'failed',
                    message: error
                })
            }
            else {
                console.log('Email sent: ' + info.response);
                res.json({
                    status: 'success',
                    message: 'Email sent: ' + info.response
                })
            }
          });
    }
    else {
        res.json({
            status: 'failed',
            message: 'Not enough parameters given'
        })
    }
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/Client/build/index.html'));
});


const port = process.env.PORT || 5000;

app.listen(port);

console.log('App is listening on port ' + port);