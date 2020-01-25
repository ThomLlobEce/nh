import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage'
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

let last_color = -2
const colors = ["#ADBF94",  "#E1EEF3", "#E4C4D0", "#DFCAD6", "#BF94A2", "#EFE5EC", "#CC9188"]


function generateRandomCOlor(){
    let r = -1
    do{
        r = Math.floor(Math.random()*colors.length)
    }while(r === last_color)

    last_color = r

    return colors[r]
}

  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()

export async function getUserByEmail(email){
    if(email){
        return await new Promise( (resolve, reject) => {
            db.collection("Users").get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if(doc.id === email){
                            resolve({...doc.data(), email: email})
                        }
                    });
            })
            .catch( (error) => {console.log(error); resolve({})})
        })
    } else {
        return {}
    }
}

export async function getUser(){
    let email = await new Promise( (resolve, reject) => { 
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                resolve(user.email)
            } else {
                resolve("")
            }
        });
    })
    if(email){
        return await new Promise( (resolve, reject) => {
            db.collection("Users").get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if(doc.id === email){
                            resolve({...doc.data(), email: email})
                        }
                    });
            })
            .catch( (error) => {console.log(error); resolve({})})
        })
    } else {
        return {}
    }
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
        
        let email = (await getUser()).email

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
        
    let email = (await getUser()).email

    if(email !== ""){
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

    let email = (await getUser()).email

    if(email !== ""){
        return await new Promise( (resolve, reject) => {
            db.collection("EventsRequiringHelp").doc().set({
                location: event.location,
                requester: email,
                title: event.title,
                start: firebase.firestore.Timestamp.fromDate(new Date(months[parseInt(event.startMonth)] + ' ' + event.startDay + ', ' + event.startYear + ' ' + event.startHours + ':' + event.startMinutes + ':00')),
                end: firebase.firestore.Timestamp.fromDate(new Date(months[parseInt(event.endMonth)] + ' ' + event.endDay + ', ' + event.endYear + ' ' + event.endHours + ':' + event.endMinutes + ':00'))
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

export async function getUpcomingEventsLookingForHelpers(){
    let email = (await getUser()).email

    if(email !== ""){
        return await new Promise( (resolve, reject) => {
            let upcomingEvent = []
            db.collection("EventsRequiringHelp").orderBy("start").get().then( function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    if(!doc.data().helper && ( !doc.data().potentHelper || !doc.data().potentHelper.include(email)))
                        upcomingEvent.push({...doc.data(), id: doc.id})
                    })                
                    resolve(upcomingEvent)
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
    let user = await getUser()

    console.log(user)

    if(user.email !== ""){
        return await new Promise( (resolve, reject) => {
            db.collection("Users").get().then( function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    if(doc.id === user.email){
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

export async function addPotentHelper(user, ev){
    let id = await getEventsRequiringHelpId(ev)
    if(id !== -1){
        return await new Promise( (resolve, reject) => {
            db.collection("EventsRequiringHelp").doc(id).set({
                potentHelper: [user.email]
            }, { merge: true })
            .then(function() {
                console.log("Document successfully written!");
                resolve (true)
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                resolve(false)
            });
        })
    } else {
        console.log("Received id = " + id +" meaning event was not found")
        return false
    }
}

export async function submit(event){
    let user = await getUser()

    let ok = await addPotentHelper(user, event)

    if(ok && await getAllowEmail(event.requester)){
        axios.post(
            '/api/sendEmail',
            {
                to: event.requester,
                subject: "Quelqu'un veut vous aider sur un événement !",
                email: (await getUser()).email,
                event: event
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
}

export async function getTheyWantToHelpYou(){

    let email = (await getUser()).email

    if(email !== ""){
        return await new Promise( (resolve, reject) => {
            let theyWantToHelpYou = []
            db.collection("EventsRequiringHelp").get().then( function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    if(doc.data().requester === email && doc.data().potentHelper){
                        theyWantToHelpYou.push({...doc.data(), id: doc.id, color: generateRandomCOlor()})
                    }                   
                })
                console.log("theyWantToHelpYou successfully fetched : " + JSON.stringify(theyWantToHelpYou))
                resolve(theyWantToHelpYou)      
            })
            .catch(function(error) {
                console.error("Error getting people that wants to help you: ", error);
                resolve([])
            });
        })
    }
    else{
        console.error("No user logged");
        return []
    }

}

async function getEventsRequiringHelpId(ev){
    return await new Promise( (resolve, reject) => {
        db.collection("EventsRequiringHelp").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let docstart = new Date(doc.data().start.seconds)
                let docend = new Date(doc.data().end.seconds)
                let evstart = new Date(ev.start.seconds)
                let evend = new Date(ev.end.seconds)
                if(doc.data().title === ev.title && doc.data().location === ev.location && doc.data().requester === ev.requester){
                    resolve(doc.id)
                }
            })
            resolve(-1)
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            resolve(-1)
        });
    })
}

export async function validateHelper(helper, event){

    let user = await getUser()

    if(user){
        axios.get(
            '/event?event='+event.id+"&helper="+helper,
        )
        .then( (res) => {
            if(res.data.status === 'success'){
                console.log("Helper correctly assigned to event")
            }
            else{
                console.log(res.data.message)
            }
        })
        .catch(error => { console.log(error);})
    }
}

export async function uploadProfilePic(file){
    return new Promise( async (resolve, reject) => {
        firebase.storage().ref((await getUser()).email).put(file[0]).then(snapshot => {
            console.log('Uploaded.');
            resolve(true)
        })
        .catch(error => {console.log(error); resolve(false)})
    })
}

export async function downloadProfilePic(){
    return new Promise( async (resolve, reject) => {
        firebase.storage().ref().child((await getUser()).email).getDownloadURL().then( url => {
            resolve(url)
        })
    })
}

export async function getAllowEmail(email){
    if(email){
        return (await getUserByEmail(email)).allowEmail
    } else {
        return (await getUser()).allowEmail
    }
    
}

export async function toggleAllowEmail(){
    let email = (await getUser()).email

    if(email){
        db.collection("Users").doc(email).update({
            allowEmail: !(await getAllowEmail())
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });   
    }
    else{
        console.log("No user logged.")
    }
}