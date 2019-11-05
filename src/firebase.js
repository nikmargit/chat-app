import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/database"
import "firebase/auth"

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
const rtdb = firebase.database()

export function setupPresence(user) {
    const isOfflineForRTDB = {
        state: "offline",
        lastChanged: firebase.database.ServerValue.TIMESTAMP,
    }

    const isOnlineForRTDB = {
        state: "online",
        lastChanged: firebase.database.ServerValue.TIMESTAMP,
    }

    const isOfflineForFirestore = {
        status: "offline",
        lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
    }

    const isOnlineForFirestore = {
        state: "online",
        lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
    }

    const rtdbRef = rtdb.ref(`/status/${user.uid}`)
    const userDoc = db.doc(`/users/${user.uid}`)

    rtdb.ref(".info/connected").on("value", async snapshot => {
        if (snapshot.val() === false) {
            userDoc.update({
                status: isOfflineForFirestore,
            })
            return
        }

        await rtdbRef.onDisconnect().set(isOfflineForRTDB)
        rtdbRef.set(isOnlineForRTDB)
        userDoc.update({
            status: isOnlineForFirestore,
        })
    })
}

export { db, firebase }
