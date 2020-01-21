import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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
