import firebase from "firebase"
import "firebase/firestore"

const config = {
    apiKey: "AIzaSyCsihx2xMuset-afJPSMwSGyWy8JHqhkBk",
    authDomain: "chat-app-58d2a.firebaseapp.com",
    databaseURL: "https://chat-app-58d2a.firebaseio.com",
    projectId: "chat-app-58d2a",
    storageBucket: "chat-app-58d2a.appspot.com",
    messagingSenderId: "1062212632465",
    appId: "1:1062212632465:web:9c3097ac3e1f534a3e6430",
}

firebase.initializeApp(config)

const db = firebase.firestore()

export { db }
