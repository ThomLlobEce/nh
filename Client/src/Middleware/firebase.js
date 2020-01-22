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

export function createUser(email, password){
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function() {
            console.log("User successfully created.")
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
        
        let email = await new Promise( (resolve, reject) => { 
                        firebase.auth().onAuthStateChanged(function(user) {
                            if (user) {
                                resolve(user.email)
                            } else {
                                resolve("")
                            }
                        });
                    })

        let icalUrl = await new Promise( (resolve, reject) => {
                db.collection("Users")
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            console.log("Doc :  " + doc.id)
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
        
    let email = await new Promise( (resolve, reject) => { 
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                resolve(user.email)
            } else {
                resolve("")
            }
        });
    })

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