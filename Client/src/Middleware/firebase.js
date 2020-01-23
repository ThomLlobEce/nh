import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import axios from 'axios'

var firebaseConfig = {
    apiKey: "AIzaSyAP8FaXTgBqA2ykTkVtEDuPCqxiUTZRF1w",
    authDomain: "nanterrehangagee-6c68a.firebaseapp.com",
    databaseURL: "https://nanterrehangagee-6c68a.firebaseio.com",
    projectId: "nanterrehangagee-6c68a",
    storageBucket: "nanterrehangagee-6c68a.appspot.com",
    messagingSenderId: "780291436881",
    appId: "1:780291436881:web:8bed0ae9a8994d51012370"
};

  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore()


async function getEmail(){
    return new Promise( (resolve, reject) => { 
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                resolve(user.email)
            } else {
                resolve("")
            }
        });
    })
}

export async function createUser(email, password, cm, firstName, name, need, ufr, year){
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async function() {
            console.log("User successfully created.")

            return await new Promise( (resolve, reject) => {
                db.collection("Users").doc(email).set({
                    cm: cm,
                    firstName: firstName,
                    name: name,
                    need: need,
                    ufr: ufr,
                    year: year                    
                })
                .then(function() {
                    console.log("Document successfully written!");
                    resolve (true)
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                    resolve(false)
                });
            })

            return true
        })
        .catch(function(error) {
            console.log(error.code + ": " + error.message )
            return false
        });
}

export async function signIn(email, password){
    return await new Promise( (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function() {
                console.log("User successfully signed in.")
                resolve(true)
            })
            .catch(function(error) {
                console.log(error.code + ": " + error.message )
                resolve(false)
            });
    })
}

export async function disconnect() {
    firebase.auth().signOut()
        .then(function() {
            console.log('Signed Out');
        })
        .catch(function(error) {
            console.error('Sign Out Error', error);
        })  
}

export async function isAuth() {
    return await new Promise( (resolve, reject) => { 
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        });
    })
}

export async function getIcalData() {
        
        let email = await getEmail()

        let icalUrl = await new Promise( (resolve, reject) => {
                db.collection("Users")
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if(doc.id === email){
                                resolve(doc.data().ical)
                            }
                        });
                    })
                    .catch( (error) => console.log(error))
                })

        return await new Promise( (resolve, reject) => {
            axios.post(
                '/api/getIcalData',
                {
                    ical: icalUrl
                },
                { headers: { 'Content-Type': 'application/json' } }
                )
                .then( (res) => {
                    if(res.data.status === 'success'){
                        console.log("Data successfully fetched")
                        resolve(res.data.message)
                    }
                    else{
                        console.log("Error while getting ical data " + res.data.message)
                        resolve([])
                    }
                })
                .catch(error => { console.log(error); resolve([])})
            })
}

export async function addIcal(ical) {
        
    let email = await getEmail()

    if(email != ""){
        return await new Promise( (resolve, reject) => {
            db.collection("Users").doc(email).update({
                ical: ical
            })
            .then( () => {
                console.log("Document successfully updated !")
                resolve(true)
            })
            .catch( (error) => {
                console.log("Error updating document : " + error)
                resolve(false)
            })
        })
    }
    else{
        return false
    }
}

export async function requestHelp(event){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let email = await getEmail()

    if(email != ""){
        return await new Promise( (resolve, reject) => {
            db.collection("EventsRequiringHelp").doc().set({
                location: event.location,
                requester: email,
                title: event.title,
                start: firebase.firestore.Timestamp.fromDate(new Date(months[parseInt(event.startMonth)] + ' ' + event.startDay + ', ' + event.startYear + ' ' + event.startHours + ':' + event.startMinutes + ':00')),
                end: firebase.firestore.Timestamp.fromDate(new Date(months[parseInt(event.startMonth)] + ' ' + event.startDay + ', ' + event.startYear + ' ' + event.startHours + ':' + event.startMinutes + ':00'))
            })
            .then(function() {
                console.log("Document successfully written!");
                resolve (true)
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                resolve(false)
            });
        })
    }
    else{
        return false
    }
}

export async function getUpcommingEventsLookingForHelpers(){
    let email = await getEmail()

    if(email != ""){
        return await new Promise( (resolve, reject) => {
            let upcommingEvent = []
            db.collection("EventsRequiringHelp").orderBy("start").get().then( function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    upcommingEvent.push(doc.data())
                })                
                resolve(upcommingEvent)
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                resolve([])
            });
        })
    }
    else{
        return false
    }
}

export async function getNeedStatus(){
    let email = await getEmail()

    if(email != ""){
        return await new Promise( (resolve, reject) => {
            db.collection("Users").get().then( function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    if(doc.id === email){
                        resolve(doc.data().need)
                    }                   
                })       
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        })
    }
    else{
        return false
    }


}

export async function submit(event){
    axios.post(
        '/api/sendEmail',
        {
            to: event.requester,
            subject: "Quelqu'un veut vous aider sur un événement !",
            text: "<b>" + await getEmail() + " souhaite vous aider pour l'évenement suivant :</b>"
                + "<p> Nom de l'événement : " + event.title + '\n'
                + "Date de l'événement : " + '\n'
                + "Lieu de l'événement : " + event.location + '\n'
                + "Si vous souhaitez participer à cette événement, cliquez sur le lien suivant : "
                + "<a href=\"http://localhost:5000\">http://localhost:5000</a></p>"
        },
        { headers: { 'Content-Type': 'application/json' } }
    )
    .then( (res) => {
        if(res.data.status === 'success'){
            console.log("Mail sent !")
        }
        else{
            console.log(res.data.message)
        }
    })
    .catch(error => { console.log(error);})
}