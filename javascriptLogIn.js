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

//remember me
const uid=readCookie("uid");
console.log("cek "+uid)
if(uid!==""){
    get(child(dbRef, `users/${uid}/user_role`)).then((snapshot) => {
      if (snapshot.val()==="pemilik") {
          console.log(snapshot.val());
          console.log("Selamat datang");
          createCookie("uid",uid,30)
          window.location.href='./dashboard.html';
      } else {

      }
    });
}

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
                    get(child(dbRef, `users/${uid}/user_role`)).then((snapshot) => {
                      if (snapshot.val()==="pemilik") {
                          if (document.getElementById('rememberme').checked) {
                                createCookieLogin("uid",uid,30)
                            }
                          console.log(snapshot.val());
                          console.log("Selamat datang");
                          createCookie("uid",uid,30)
//                          window.open('dashboard.html');
                          window.location.href='./dashboard.html';
                      } else {
                        alert("Bukan Akun Pemilik Perusahaan");
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
                alert("Login gagal, silakan cek kembali data isian");
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
function createCookieLogin(fieldname, fieldvalue, expiry) {
    var date = new Date();
    date.setTime(date.getTime()+ (expiry*24*60*60*1000));
    var expires = "expires=" + date.toGMTString();
    document.cookie = fieldname + "=" + fieldvalue + 
                      ";" + expires + ";path=/";
}
    
function readCookie(cname) {
    var name = cname + "=";
    var decoded_cookie = decodeURIComponent(document.cookie);
    var carr = decoded_cookie.split(';');
    for(var i=0; i<carr.length;i++){
    var c = carr[i];
    while(c.charAt(0)==' '){
        c=c.substring(1);
    }
    if(c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
    }
     }
     return "";
}
