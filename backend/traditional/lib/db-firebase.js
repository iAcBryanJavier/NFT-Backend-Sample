require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getDatabase, ref } = require('firebase/database');

const firebaseConfig = {
    apiKey: "AIzaSyAMt571lgisQ-b5oYhyb7567XVojIBAIrc",
    authDomain: "seqr-e7c21.firebaseapp.com",
    databaseURL: "https://seqr-e7c21-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "seqr-e7c21",
    storageBucket: "seqr-e7c21.appspot.com",
    messagingSenderId: "189848402742",
    appId: "1:189848402742:web:9d37c1df949acacf875197",
    measurementId: "G-HKP4VM7RV5"
};

function connectToFirebaseRDB(){
    initializeApp(firebaseConfig);
    const database = ref(getDatabase());
    return database;
}

module.exports.connectToFirebaseRDB = connectToFirebaseRDB;
