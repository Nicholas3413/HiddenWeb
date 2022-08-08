import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getDatabase, ref, onValue, child, get} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
import { getAuth,signInWithEmailAndPassword,onAuthStateChanged ,signOut} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
//const uid = require('./javascript.js');

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
var obj={}

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
function createCookie(fieldname, fieldvalue, expiry) {
    var date = new Date();
    date.setTime(date.getTime()+ (expiry*24*60*60*1000));
    var expires = "expires=" + date.toGMTString();
    document.cookie = fieldname + "=" + fieldvalue + 
                      ";" + expires + ";path=/informasi-perusahaan.html";
}
function createCookieAnggota(fieldname, fieldvalue, expiry) {
    var date = new Date();
    date.setTime(date.getTime()+ (expiry*24*60*60*1000));
    var expires = "expires=" + date.toGMTString();
    document.cookie = fieldname + "=" + fieldvalue + 
                      ";" + expires + ";path=/informasi-karyawan.html";
}
function createCookieRekap(fieldname, fieldvalue, expiry) {
    var date = new Date();
    date.setTime(date.getTime()+ (expiry*24*60*60*1000));
    var expires = "expires=" + date.toGMTString();
    document.cookie = fieldname + "=" + fieldvalue + 
                      ";" + expires + ";path=/rekap-absensi.html";
}

var date = new Date();

console.log(readCookie("uid"))
const uid=readCookie("uid")
var theperusahaan=document.getElementById('namaperusahaan')
        theperusahaan.addEventListener('click',function(){
            createCookie("uid",uid,30)
        })
//const uid="Ex8iIGGzJ7O236Ml6bQ6KRxJktF3"
//const uid="SGTZatShB7Q6ie3OxCtoJ0sc7Tr2"
get(child(dbRef, `users/${uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
              console.log(snapshot.val()["user_name"]);
              document.getElementById("namapemilik").innerHTML=snapshot.val()["user_name"]
              get(child(dbRef, `perusahaan/${snapshot.val()["perusahaan_id"]}/nama_perusahaan`)).then((snapshot) => {
                  document.getElementById("namaperusahaan").innerHTML=snapshot.val()
              })
               get(child(dbRef, `perusahaan/${snapshot.val()["perusahaan_id"]}/anggota`)).then((snapshot) => {
                  inittable(snapshot.val())
                  obj=snapshot.val()
              })
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
document.getElementById('signout').addEventListener('click',function(){
    const auth = getAuth();
    signOut(auth).then(() => {

        expireAllCookies('uid', ['/', '/dashboard.html','/informasi-perusahaan.html','/index.html','/daftar-karyawan.html','/informasi-karyawan.html','/rekap-absensi.html']);
        expireAllCookies('auid', ['/informasi-karyawan.html']);
       window.location.href='./index.html';
    }).catch((error) => {
      // An error happened.
    });
})
document.getElementById('rekapabsensi').addEventListener('click',function(){
    createCookieRekap("uid",uid,30)
    window.location.href='./rekap-absensi.html';
})
function expireAllCookies(name, paths) {
    var expires = new Date(0).toUTCString();

    // expire null-path cookies as well
    document.cookie = name + '=; expires=' + expires;

    for (var i = 0, l = paths.length; i < l; i++) {
        document.cookie = name + '=; path=' + paths[i] + '; expires=' + expires;
    }
}




function inittable(obj=null){
    let tbody = document.getElementById("dataanggota");
    console.log(obj)
    console.log(Object.keys(obj))
    for(let i=0;i<Object.keys(obj).length;i++){
        let idcurrentanggota=Object.keys(obj)[i]
        let textRow="row_"+(i+1);
        textRow = document.createElement('tr');
       let textRowData1=document.createElement('td');
        textRowData1.innerHTML=(i+1)+".";
       textRow.appendChild(textRowData1);

        const iduser=obj[idcurrentanggota]["user_id"];
        let textRowData2=document.createElement('td');
        get(child(dbRef, `users/${iduser}`)).then((snapshot) => {
          if (snapshot.exists()) {
              let tempnama=snapshot.val()["user_name"]
            textRowData2.innerHTML=tempnama;
              textRow.appendChild(textRowData2);
              let textRowData3=document.createElement('td');
              let tempemail=snapshot.val()["email_user"]
            textRowData3.innerHTML=tempemail;
              textRow.appendChild(textRowData3);
              
              let textRowData4=document.createElement('td');
              let tempjabatan=obj[idcurrentanggota]["bagian"];
            textRowData4.innerHTML=tempjabatan;
              textRow.appendChild(textRowData4);
                tbody.appendChild(textRow);
              
              let textRowData5=document.createElement('td');
            textRowData5.addEventListener('click',function(){
                createCookieAnggota("auid",iduser,30)
                createCookieAnggota("uid",uid,30)
            window.open('./informasi-karyawan.html', '_blank')})
            textRowData5.innerHTML="Info";
              textRow.appendChild(textRowData5);
                tbody.appendChild(textRow);
              
//            get(child(dbRef, `users/${iduser}`)).then((snapshot) => {
//                if (snapshot.exists()) {
//                    
//                }
//             else {
//            console.log("No data available");
//          }});

          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });



    }

}

