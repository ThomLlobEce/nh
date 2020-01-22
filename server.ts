const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')

import User from './user'
import Event from './event'
import { parseICALdata } from './functions'


// https://planning-paris.inseecu.net/Telechargements/ical/Edt_LLOBREGAT.ics?version=2019.0.4.0&idICal=ED8C99CB6BE8F57EC536877E01FC1D6F&param=643d5b312e2e36325d2666683d3126663d31


const users: User[] = [
    new User("Llobregat", "Thomas", "a@gmail.com", "54", 2020, "gter", "a", true),
    new User("Babel", "Mattis", "b@gmail.com", "54", 2020, "gter", "b", false)
]
const auths: string[] = []
const eventRequiringHelpers: {requester: User, event: Event}[] = []

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
        console.log(events)
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

app.post('/api/addHelpRequest', function(req: { body: { requester: User, event: Event; }; }, res: { json: (arg0: { status: string; message: string; }) => void; }) {
    
    console.log("*** API REQUEST (GET) : /api/addHelpRequest ***")
    console.log("Parameters given : " + JSON.stringify(req.body))

    var exist = false
    var missingParams = false

    // Verifying parameters
    if (!req.body.requester || !req.body.event) {
        missingParams = true;
    }
    else {
        // Verifying that the helper exists
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === req.body.requester.email) {
                exist = true;
                // Adding the user and the event to DB
                let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                eventRequiringHelpers.push({requester: req.body.requester, event: req.body.event})
                eventRequiringHelpers.sort( function(a, b){
                        let first = new Date(months[parseInt(a.event.startMonth)] + '-' + a.event.startDay + ', ' + a.event.startYear + ' ' + a.event.startHours + ':' + a.event.startMinutes + ':00')
                        let second = new Date(months[parseInt(b.event.startMonth)] + '-' + b.event.startDay + ', ' + b.event.startYear + ' ' + b.event.startHours + ':' + b.event.startMinutes + ':00')
                
                        return first > second ? 1 : first < second ? -1 : 0
                })
                console.log("Event and requester correctly added to DB : " + JSON.stringify({requester: req.body.requester, event: req.body.event}))                
            }
        }
    }

    if (!exist) {
        console.log("ERROR : No user " + req.body.requester.email + " exists")
        res.json({
            status: "failed",
            message: "User does not exist"
        });
    }
    else if (missingParams) {
        console.log("ERROR : Not enough parameters given. Check readme.md to have more informations.")
        res.json({
            status: "failed",
            message: "Missing parameters"
        });
    }
    else {
        res.json({
            status: "success",
            message: "Event correctly added to DB"
        });
    }
})

app.get('/api/getUpcommingEvents', async function(req, res) {
    console.log("*** API REQUEST (GET) : /api/getUpcommingEvents ***")



    res.json({
        status: "success",
        message: eventRequiringHelpers
    });
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/Client/build/index.html'));
});


const port = process.env.PORT || 5000;

app.listen(port);

console.log('App is listening on port ' + port);