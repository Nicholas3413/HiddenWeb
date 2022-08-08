import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getDatabase, ref, onValue, child, get,update } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
import { getAuth,signInWithEmailAndPassword,onAuthStateChanged,deleteUser } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
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
console.log(app.name)
const dbRef = ref(getDatabase(app));
var obj={}
const mmonth=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","Nopember","Desember"]

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
function createCookiePerusahaan(fieldname, fieldvalue, expiry) {
    var date = new Date();
    date.setTime(date.getTime()+ (expiry*24*60*60*1000));
    var expires = "expires=" + date.toGMTString();
    document.cookie = fieldname + "=" + fieldvalue + 
                      ";" + expires + ";path=/informasi-perusahaan.html";
}
var theperusahaan=document.getElementById('namaperusahaan')
        theperusahaan.addEventListener('click',function(){
            createCookiePerusahaan("uid",uid,30)
        })

console.log(readCookie("uid"))
const uid=readCookie("uid")
//const uid="Ex8iIGGzJ7O236Ml6bQ6KRxJktF3"
//const uid="SGTZatShB7Q6ie3OxCtoJ0sc7Tr2"
//const auid="SGTZatShB7Q6ie3OxCtoJ0sc7Tr2"
const auid=readCookie("auid")
//const auid="6fd7lptiRmNYtzmqxR55NoXFrTg2"
//const auid="EYCoF2je5vRUCNxtCm2tTU9LLPj1"

get(child(dbRef, `users/${uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
          console.log(snapshot.val()["user_name"]);
          document.getElementById("namapemilik").innerHTML=snapshot.val()["user_name"]
          console.log(snapshot.val()["user_name"])
          get(child(dbRef, `perusahaan/${snapshot.val()["perusahaan_id"]}/nama_perusahaan`)).then((snapshot) => {
            if (snapshot.exists()) {
                document.getElementById("namaperusahaan").innerHTML=snapshot.val()
                console.log(snapshot.val())
            }
          })

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
loaddata(obj)
hideshowinputupload()
var theButton=document.getElementById('btnEdit')
        theButton.addEventListener('click',function(){
            if(theButton.innerHTML==="Edit"){
                theButton.innerHTML="Ok"
                document.getElementById('myfield').disabled=false
                hideshowinputupload()
                hideshowhapus()
            }
            else{
                theButton.innerHTML="Edit"
                hideshowinputupload()
                hideshowhapus()
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
                  updates['/users/' + auid + '/user_name'] = document.getElementById('inamaanggota').value;
                  updates['/users/' + auid + '/alamat_user'] = document.getElementById('alamat').value;
                  updates['/users/' + auid + '/nomor_telepon_user'] = document.getElementById('nomorhp').value;
                    get(child(dbRef, `users/${auid}`)).then((snapshot) => {
                      if (snapshot.exists()) {
                          updates['/perusahaan/' + snapshot.val()["perusahaan_id"]+ '/anggota/'+snapshot.val()["anggota_perusahaan_id"]+'/bagian']=document.getElementById('bagian').value; 
                         if(document.getElementById("upload").value.toString()!=""){
                              const storage = getStorage();
                            const storageRef = refx(storage, "users/"+auid+"/gambar.jpg");
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
                                    updates['/users/' +auid+ '/gambar_user']=downloadURL
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
    get(child(dbRef, `users/${auid}`)).then((snapshot) => {
      if (snapshot.exists()) {
          if(snapshot.val()["gambar_user"]!==undefined){
              document.getElementById("gambaranggota").src=snapshot.val()["gambar_user"]
          }
          
          document.getElementById("namaanggota").innerHTML=snapshot.val()["user_name"]
          document.getElementById("idanggota").innerHTML=snapshot.val()["anggota_perusahaan_id"]
          document.getElementById("emailanggota").innerHTML=snapshot.val()["email_user"]
          document.getElementById("inamaanggota").value=snapshot.val()["user_name"]
          document.getElementById("alamat").value=snapshot.val()["alamat_user"]
          document.getElementById("nomorhp").value=snapshot.val()["no_telepon_user"]
          get(child(dbRef, `perusahaan/${snapshot.val()["perusahaan_id"]}/anggota/${snapshot.val()["anggota_perusahaan_id"]}`)).then((snapshot) => {
            document.getElementById("bagian").value=snapshot.val()["bagian"]
              let timestamp=snapshot.val()["tanggal_masuk_perusahaan"]
          var date = new Date(timestamp);
           document.getElementById("tglmasuk").value=date.getDate().toString()+" "+mmonth[date.getMonth()]+" "+date.getFullYear().toString();
          })
          
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}
//document.getElementById('hapus').addEventListener('click',function(){
//    get(child(dbRef, `users/${auid}/user_role`)).then((snapshot) => {
//        if(snapshot.val()==="pemilik"){
//            alert("Tidak Bisa Menghapus Akun Pemilik!")
//        }else{
//           if (confirm("Apakah Anda Yakin ingin menghapus karyawan ini?") == true) {
//               let emailhapus=document.getElementById("emailanggota").innerHTML
//               let passhapus = prompt("Masukkan Password untuk "+emailhapus+":", "");
//                async function deleteUser(emailhapus,passhapus) {
//                    // Initialize Firebase
////                    console.log(app.getAuth().current);  // '[DEFAULT]'
////                    const secondaryApp = app().initializeApp(firebaseConfig,"Secondary");
//                    const app = initializeApp(firebaseConfig, 'Secondary')
//                    const auth = getAuth();
//                    const user = auth.currentUser;
//                    console.log(app.name);     
//
////                    if (!emailhapus || !passhapus) {
////                      return console.warn('Missing email or password to delete the user.')
////                    }
//                    console.log(emailhapus+" xxxx "+passhapus)
//                    await signInWithEmailAndPassword(auth,emailhapus, passhapus)
//                      .then(() => {
//                        console.log(app.name);
//                         const user = auth.currentUser;
//                        console.log(user)
//                        deleteUser(user).then(() => {
//                          // User deleted. 
//                            alert("Akun berhasil dihapus.")
//                            signOut(auth).then(() => {
//                              // Sign-out successful.
//                                delete(auth,'Secondary')
//                            }).catch((error) => {
//                              // An error happened.
//                            });
//                        }).catch((error) => {
//                          // An error ocurred
//                          // ...
//                        });
//                        
////                        userInFirebaseAuth.delete() // Delete the user in Firebase auth list (has to be logged in).
////                        secondaryApp.auth().signOut()
////                        secondaryApp.delete()
//                       
//                      })
//                    console.log("hello")
//                }
//            deleteUser(emailhapus,passhapus)
//                
//            } else {
//                alert("Batal Hapus")
//            } 
//        }
//            
//    })
//})


function hideshowinputupload() {
    
        let x = document.getElementById("upload");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    
  
}
function hideshowhapus() {
  let x = document.getElementById("hapus");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}