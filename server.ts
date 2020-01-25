const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');    


import Event from './event'
import { parseICALdata } from './functions'


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nanterrehang@gmail.com',
      pass: 'AzertyuioP'
    }
});

let serviceAccount = require('./serviceAccountKey.json');
  
// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });  

let Users = admin.firestore().collection("Users");
let EventsRequiringHelp = admin.firestore().collection("EventsRequiringHelp")
  
app.use(bodyParser.json())

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'Client/build')));

app.post('/api/getIcalData', async function(req: { body: { ical: string; }; }, res: { json: (arg0: { status: string; message: string | Event[]; }) => void; }) {
    console.log("*** API REQUEST (POST) : /api/getIcalData ***")
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
        let events:Event[] = await parseICALdata(req.body.ical)
        if(events.length > 0){
            console.log("ICAL data successfully fetched")
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

app.post('/api/sendEmail', function(req: { body: { to: string; subject: string; email: string; event: { title: string; location: string; id: string; }; }; }, res: { json: (arg0: { status: string; message: string; }) => void; }) {
    console.log("*** API REQUEST (POST) : /api/sendEmail ***")
    console.log("Parameters given : " + JSON.stringify(req.body))

    if(req.body.to && req.body.subject && req.body.email && req.body.event){
          var mailOptions = {
            from: 'nanterreHang@gmail.com',
            to: req.body.to,
            subject: req.body.subject,
            html: ("<b>" + req.body.email + " souhaite vous aider pour l'évenement suivant :</b>"
                + "<p> Nom de l'événement : " + req.body.event.title + '\n'
                + "Date de l'événement : " + '\n'
                + "Lieu de l'événement : " + req.body.event.location + '\n'
                + "Si vous souhaitez participer à cette événement, cliquez sur le lien suivant : "
                + "<a href=\"http://localhost:5000/event?event=" + req.body.event.id + "&helper=" + req.body.email + "\">http://localhost:5000/event?event=" + req.body.event.id + "&helper=" + req.body.email +"</a></p>")
          }
          
          transporter.sendMail(mailOptions, function(error: string, info: { response: string; }){
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

app.get('/event', async function(req, res) {
    console.log("*** API REQUEST (GET) : /event ***")
    console.log("Parameters given : " + JSON.stringify(req.query))

    if(req.query.event && req.query.helper){
        let del:boolean = await new Promise( (resolve, reject) => {
            EventsRequiringHelp.doc(req.query.event).get().then( doc => {
                if(doc.exists) {
                    if(doc.data().potentHelper.includes(req.query.helper)) {
                        resolve(true)
                    } else {
                        res.json({
                            status: "failed",
                            message: "The helper is not in the potent list"
                        })
                        resolve(false)
                    }
                } else {
                    res.json({
                        status: "failed",
                        message: "This event does not exist"
                    })
                    resolve(false)
                } 
            })
        })

        // Get the helper
        let helper:Boolean = await new Promise( (resolve, reject) => {
            Users.doc(req.query.helper).get().then( doc => {
                if(doc.exists){
                    if(doc.data().need === false){
                        resolve(true)
                    } else {
                        res.json({
                            status: 'failed',
                            message: 'This user is not an helper'
                        })
                    }
                } else {
                    res.json({
                        status: 'failed',
                        message: 'This user does not exist'
                    })
                    resolve(null)
                }
            })
        })

        if(del && helper){
            // Delete potent helpers
            EventsRequiringHelp.doc(req.query.event).update({
                potentHelper: admin.firestore.FieldValue.delete()
            })
            
            // set new field helper to value email
            EventsRequiringHelp.doc(req.query.event).update({
                helper: req.query.helper
            })

            res.json({
                status: "success",
                message: req.query.event
            })
        }
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