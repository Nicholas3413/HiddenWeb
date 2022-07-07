import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getDatabase, ref, onValue, child, get} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
import { getAuth,signInWithEmailAndPassword,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

//const express = require('express')
//const app = express()

const firebaseConfig = {
    apiKey: "AIzaSyAIWfQR-drjCNvbgTIcY7FnfLXDdwx9nn0",
    authDomain: "hidden-ad93d.firebaseapp.com",
    databaseURL: "https://hidden-ad93d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hidden-ad93d",
    storageBucket: "hidden-ad93d.appspot.com",
    messagingSenderId: "951410585581",
    appId: "1:951410585581:web:2877bd90e20850350dc1e4",
    measurementId: "G-TKGTZ32DJK"
  };

const app = initializeApp(firebaseConfig);


const dbRef = ref(getDatabase(app));
get(child(dbRef, `timestamp`)).then((snapshot) => {
  if (snapshot.exists()) {
      var date = new Date(snapshot.val());
      console.log(date)
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
const etxtemail=document.getElementById('etxtemail')
const etxtpassword=document.getElementById('etxtpassword')
console.log(etxtemail,etxtpassword)

get(child(dbRef, `timestamp`)).then((snapshot) => {
  if (snapshot.exists()) {
      var date = new Date(snapshot.val());
      console.log(date)
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
var theButton=document.getElementById('btnEmail')
        theButton.addEventListener('click',function(){
//            const auth = getAuth();
//            console.log(etxtemail.value,etxtpassword.value)
//            signInWithEmailAndPassword(auth, etxtemail.value, etxtpassword.value)
//              .then((userCredential) => {
//                // Signed in 
//                
//                const user = userCredential.user;
//                alert("berhasil")
//                // ...
//              })
//              .catch((error) => {
//                alert("gagal")
//                const errorCode = error.code;
//                const errorMessage = error.message;
//              });
            const auth = getAuth(app);
            signInWithEmailAndPassword(auth, etxtemail.value, etxtpassword.value)
              .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("signed in");
                onAuthStateChanged(auth, (user) => {
                  if (user) {
                    const uid = user.uid;
                      
                      console.log(uid)
                    get(child(dbRef, `users/${uid}/perusahaan_id`)).then((snapshot) => {
                      if (snapshot.exists()) {
                          console.log(snapshot.val());
                          console.log("Selamat datang");
                          createCookie("uid",uid,30)
//                          window.open('dashboard.html');
                          window.location.href='./dashboard.html';
                      } else {
                        console.log("No data available");
                        console.log("Bukan Pemilik Perusahaan");
                      }
                    }).catch((error) => {
                      console.error(error);
                    });
                  } else {
                    // User is signed out
                    // ...
                  }
                });
              })
              .catch((error) => {
                alert("gagal");
                const errorCode = error.code;
                const errorMessage = error.message;
              });
            
        })
function createCookie(fieldname, fieldvalue, expiry) {
    var date = new Date();
    date.setTime(date.getTime()+ (expiry*24*60*60*1000));
    var expires = "expires=" + date.toGMTString();
    document.cookie = fieldname + "=" + fieldvalue + 
                      ";" + expires + ";path=/dashboard.html";
}

