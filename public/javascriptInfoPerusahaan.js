import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getDatabase, ref, onValue, child, get,update } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
import { getAuth,signInWithEmailAndPassword,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
import { getStorage, ref as refx, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-storage.js"
//import { getStorage, ref } from "firebase/storage"
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
                      ";" + expires + ";path=/dashboard.html";
}

console.log(readCookie("uid"))
const uid=readCookie("uid")
//const uid="Ex8iIGGzJ7O236Ml6bQ6KRxJktF3"
//const uid="SGTZatShB7Q6ie3OxCtoJ0sc7Tr2"

loaddata(obj)
var date = new Date();
document.getElementById("timepickermasuk").value=date.getHours().toString().padStart(2, 0) + ':' + date.getMinutes().toString().padStart(2, 0)
hideshowinputupload()
console.log(document.getElementById("timepickermasuk").value)
var theButton=document.getElementById('btnEdit')
        theButton.addEventListener('click',function(){
            if(theButton.innerHTML==="Edit"){
                theButton.innerHTML="Ok"
                document.getElementById('myfield').disabled=false
                hideshowinputupload()
            }
            else{
                theButton.innerHTML="Edit"
                hideshowinputupload()
                document.getElementById('myfield').disabled=true
                var myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
                myModal.show()
                document.getElementById('batalsimpan').addEventListener('click',function(){
                    loaddata(obj)
                    document.getElementById("upload").value=null
                })
                document.getElementById('xsimpan').addEventListener('click',function(){
                    loaddata(obj)
                    document.getElementById("upload").value=null
                })
                document.getElementById('oksimpan').addEventListener('click',function(){
                    
                    const db = getDatabase();
                  const updates = {};
                  updates['/users/' + uid + '/user_name'] = document.getElementById('inamapemilik').value;
                    get(child(dbRef, `users/${uid}/perusahaan_id`)).then((snapshot) => {
                      if (snapshot.exists()) {
                        updates['/perusahaan/' +snapshot.val()+ '/nama_perusahaan'] = document.getElementById('inamaperusahaan').value;
                          updates['/perusahaan/' +snapshot.val()+ '/alamat_perusahaan'] = document.getElementById('alamat').value;
                          updates['/perusahaan/' +snapshot.val()+ '/no_telepon_perusahaan'] = document.getElementById('nomorteleponperusahaan').value;
                          updates['/perusahaan/' +snapshot.val()+ '/email_perusahaan'] = document.getElementById('emailperusahaan').value;
                          updates['/perusahaan/' +snapshot.val()+ '/tahun_berdiri'] = document.getElementById('tahunberdiri').value;
                          updates['/perusahaan/' +snapshot.val()+ '/bidang_perusahaan'] = document.getElementById('bidang').value;
                          updates['/perusahaan/' +snapshot.val()+ '/work_hours_week'] = document.getElementById('whw').value;
                          updates['/perusahaan/' +snapshot.val()+ '/work_hours_day'] = document.getElementById('whd').value;
                           let masuk = document.getElementById("timepickermasuk").value.split(':')
                           let keluar = document.getElementById("timepickerkeluar").value.split(':')
                          updates['/perusahaan/' +snapshot.val()+ '/jam_masuk'] = masuk[0]
                          updates['/perusahaan/' +snapshot.val()+ '/menit_masuk'] = masuk[1]                          
                          updates['/perusahaan/' +snapshot.val()+ '/jam_pulang'] = keluar[0]
                          updates['/perusahaan/' +snapshot.val()+ '/menit_pulang'] = keluar[1]
                          if(document.getElementById("upload").value.toString()!=""){
                              const storage = getStorage();
                            const storageRef = refx(storage, "perusahaan/"+uid+"/gambar.jpg");
                              const file = document.getElementById('upload').files[0];
                              
                            const uploadTask = uploadBytesResumable(storageRef,file);
                            uploadTask.on('state_changed', 
                              (snapshot) => {
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log('Upload is ' + progress + '% done');
                                switch (snapshot.state) {
                                  case 'paused':
                                    console.log('Upload is paused');
                                    break;
                                  case 'running':
                                    console.log('Upload is running');
                                    break;
                                }
                              }, 
                              (error) => {
                                // Handle unsuccessful uploads
                              }, 
                              () => {
                                // Handle successful uploads on complete
                                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                  console.log('File available at', downloadURL);
                                    updates['/perusahaan/' +snapshot.val()+ '/gambar_perusahaan']=downloadURL
                                    update(ref(db), updates);
                                });
                              }
                            );
                              
                              document.getElementById("upload").value=null
                          }else{
                              document.getElementById("upload").value=null
                              update(ref(db), updates);
                          }
                        
                      }})
                    
                })
            }
        })
function loaddata(obj=null){
get(child(dbRef, `users/${uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
              console.log(snapshot.val()["user_name"]);
              document.getElementById("namapemilik").innerHTML=snapshot.val()["user_name"]
              document.getElementById("inamapemilik").value=snapshot.val()["user_name"]
              console.log(snapshot.val()["user_name"])
              get(child(dbRef, `perusahaan/${snapshot.val()["perusahaan_id"]}`)).then((snapshot) => {
                  document.getElementById("namaperusahaan").innerHTML=snapshot.val()["nama_perusahaan"]
                 document.getElementById("gambarperusahaan").src=snapshot.val()["gambar_perusahaan"]
                  document.getElementById("txtnamaperusahaan").innerHTML=snapshot.val()["nama_perusahaan"]
                  document.getElementById("inamaperusahaan").value=snapshot.val()["nama_perusahaan"]
                  document.getElementById("alamat").value=snapshot.val()["alamat_perusahaan"]
                 document.getElementById("timepickermasuk").value= snapshot.val()["jam_masuk"].toString().padStart(2, 0)+":"+snapshot.val()["menit_masuk"].toString().padStart(2, 0)
                  document.getElementById("timepickerkeluar").value= snapshot.val()["jam_pulang"].toString().padStart(2, 0)+":"+snapshot.val()["menit_pulang"].toString().padStart(2, 0)
                  document.getElementById("nomorteleponperusahaan").value=snapshot.val()["no_telepon_perusahaan"]
                  document.getElementById("emailperusahaan").value=snapshot.val()["email_perusahaan"]
                 document.getElementById("lokasi").value=snapshot.val()["loclatitude"]+","+snapshot.val()["loclongitude"]
                  document.getElementById("txtemailperusahaan").innerHTML=snapshot.val()["email_perusahaan"]
                  document.getElementById("tahunberdiri").value=snapshot.val()["tahun_berdiri"]
                  document.getElementById("bidang").value=snapshot.val()["bidang_perusahaan"]
                  document.getElementById("whw").value=snapshot.val()["work_hours_week"]
                  document.getElementById("whd").value=snapshot.val()["work_hours_day"]
                  

                  obj=snapshot.val()
                  console.log(obj)
              })
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
}

var theLokasi=document.getElementById('btnLokasi')
        theLokasi.addEventListener('click',function(){
            window.open('http://maps.google.com/?q='+document.getElementById('lokasi').value, '_blank')
        })


function hideshowinputupload() {
  let x = document.getElementById("upload");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}