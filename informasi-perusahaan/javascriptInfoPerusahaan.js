import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getDatabase, ref, onValue, child, get} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
import { getAuth,signInWithEmailAndPassword,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
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
var jammasuk=new Number()
var menitmasuk=new Number()
var jamkeluar=new Number()
var menitkeluar=new Number()

var date = new Date();
document.getElementById("datepicker").value=date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
    '-' + date.getDate().toString().padStart(2, 0);
document.getElementById("datepicker").onchange = function(){
    var date=document.getElementById("datepicker").value
    var arr1 = date.split('-');
    console.log(arr1[2])
    let tbody = document.getElementById("dataabsensi");
      var rowCount = tbody.rows.length;
    for (var x=rowCount-1; x>=0; x--) {
       tbody.deleteRow(x);
    }
    console.log(obj)
    inittable(obj,arr1[0],arr1[1],arr1[2])
};
console.log(readCookie("uid"))
const uid=readCookie("uid")
//const uid="Ex8iIGGzJ7O236Ml6bQ6KRxJktF3"
//const uid="SGTZatShB7Q6ie3OxCtoJ0sc7Tr2"
get(child(dbRef, `users/${uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
              console.log(snapshot.val()["user_name"]);
              document.getElementById("namapemilik").innerHTML=snapshot.val()["user_name"]
              get(child(dbRef, `perusahaan/${snapshot.val()["perusahaan_id"]}`)).then((snapshot) => {
                  document.getElementById("namaperusahaan").innerHTML=snapshot.val()["nama_perusahaan"]
                  jammasuk=snapshot.val()["jam_masuk"]
                  jamkeluar=snapshot.val()["jam_pulang"]
                  menitmasuk=snapshot.val()["menit_masuk"]
                  menitkeluar=snapshot.val()["menit_pulang"]
                  inittable(snapshot.val(),date.getFullYear().toString(),(date.getMonth() + 1).toString().padStart(2, 0),date.getDate().toString().padStart(2, 0))
                  obj=snapshot.val()
              })
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });

//get(child(dbRef, `${uid}/perusahaan_id`)).then((snapshot) => {
//  if (snapshot.exists()) {
//      const perusahaanID=snapshot.val()
//      document.getElementById("kodePerusahaan").innerHTML=perusahaanID
//      console.log(snapshot.val());
//      get(child(dbRef, `${perusahaanID}/`)).then((snapshot) => {
//          if (snapshot.exists()) {
//              obj=snapshot.val()
//              inittable(obj["absensi"])
//              console.log(obj)
////              console.log(snapshot.nama_perusahaan);
//               console.log(snapshot.val()["anggota"]);
//              document.getElementById("namaPerusahaan").innerHTML=snapshot.val()["nama_perusahaan"]
//              document.getElementById("anggotaList").innerHTML=JSON.stringify(snapshot.val()["anggota"])
//
//          } else {
//            console.log("No data available");
//            console.log("Bukan Pemilik Perusahaan");
//          }
//        }).catch((error) => {
//          console.error(error);
//        });
//  } else {
//    console.log("No data available");
//    console.log("Bukan Pemilik Perusahaan");
//  }
//}).catch((error) => {
//  console.error(error);
//});
//$('#datepicker').datepicker({
//    uiLibrary: 'bootstrap'
//});
//$('#datepicker').datepicker()
//    .on('changeDate', function(e) {
//        var startdate = $('#startdate').val(); 
//console.log(startdate)
//    });
// $('#datepicker').datepicker({  
//    format: 'mm/dd/yyyy',  
//}).on('change.dp', function() {  
//    $('#tanggalwaktu2').val(
//        $('#datepicker').val()
//    );
//}); 
//$('#datepicker').on('change.dp', function() {
//    $('#tanggalwaktu2').innerHTML=
//        $('#datepicker').data('datepicker').date
//
//});
//console.log($('#datepicker').datepicker("getDate").valueOf()) 



function inittable(obj=null,tahun,bulan,tanggal){
//    let table = document.createElement('table');
//    table.setAttribute("id","initabel");
//    let thead = document.createElement('thead');
    let tbody = document.getElementById("dataabsensi");
//    let tanggalharini=document.createElement('h2');
//    let ulul=document.createElement('ul')
    console.log(obj)
    console.log(Object.keys(obj["anggota"]))
//    console.log(obj["absensi"][tahun][bulan][tanggal]["AFyiZLp"]["jam_masuk"])

    //const obj={"16 May 2022":{"abc":{"jam_masuk":1652660802000},"abc2":{"jam_masuk":1652660922000},"abc3":{"jam_masuk":1652660982000}},
    //          "17 May 2022":{"abc":{"jam_masuk":1652747382000},"abc2":{"jam_masuk":1652747142000},"abc3":{"jam_masuk":1652746842000}}}
    //

//    for(let i=0; i<Object.keys(obj).length;i++){
//        let ilil=document.createElement('li')
//        ilil.innerHTML=Object.keys(obj)[i]
//        ilil.id=
//        ulul.appendChild(ilil)
//
//    }
//    document.getElementById('body').appendChild(ulul);
//    document.getElementById('body').appendChild(table);
//    buatTabel(Object.keys(obj)[0])
    
//    var lis = document.getElementsByTagName("li");
//
//    for (var i = 0 ; i < lis.length; i++) {
//
//        lis[i].addEventListener('click', function(event) {
//            let temp=event.target.textContent
//            console.log(temp)
//
//            var myTable = document.getElementById("initabel");
//    var rowCount = myTable.rows.length;
//    for (var x=rowCount-1; x>=0; x--) {
//       myTable.deleteRow(x);
//    }
//
//            buatTabel(temp);
//        });
//
//    }
//    console.log(Object.keys(obj)[0]);
//    console.log(Object.keys(obj).length);
    // Adding the entire table to the body tag


//    function buatTabel(tanggal=null){
//        document.getElementById('body').appendChild(tanggalharini);
//        document.getElementById('body').appendChild(table);
//        table.appendChild(thead);
//        table.appendChild(tbody);
//        tanggalharini.innerHTML=tanggal;
//
//
//        let row_1 = document.createElement('tr');
//        let heading_1 = document.createElement('th');
//        heading_1.innerHTML = "No.";
//        let heading_2 = document.createElement('th');
//        heading_2.innerHTML = "Nama";
//        let heading_3 = document.createElement('th');
//        heading_3.innerHTML = "Jam Masuk";
//        row_1.appendChild(heading_1);
//        row_1.appendChild(heading_2);
//        row_1.appendChild(heading_3);
    //for (let i = 0; i < Object.keys(obj).length; i++) {
    //    let textHeading="headingx_"+(i+2)
    //    
    //  textHeading = document.createElement('th');
    //    
    //    textHeading.innerHTML = i;
    //    row_1.appendChild(textHeading);
    //}
//        thead.appendChild(row_1);

//        console.log(Object.keys(obj[Object.keys(obj)[0]]).length)
//        console.log(Object.keys(obj[Object.keys(obj)[0]])[0])

    // Creating and adding data to second row of the table
        for(let i=0;i<Object.keys(obj["anggota"]).length;i++){
//            console.log(obj["jam_masuk"].toString().padStart(2, 0))
            
            let idcurrentanggota=Object.keys(obj["anggota"])[i]
            let textRow="row_"+(i+1);
//            console.log(textRow);
            textRow = document.createElement('tr');
           let textRowData1=document.createElement('td');
            textRowData1.innerHTML=(i+1)+".";
           textRow.appendChild(textRowData1);

//            const tanggalharicek=tanggal;
            const iduser=obj["anggota"][idcurrentanggota]["user_id"];
            let textRowData2=document.createElement('td');
            get(child(dbRef, `users/${iduser}/user_name`)).then((snapshot) => {
              if (snapshot.exists()) {
                  let tempnama=snapshot.val()
//                  console.log(snapshot.val());
                textRowData2.innerHTML=tempnama;
                  textRow.appendChild(textRowData2);
                  try{const timestamp=obj["absensi"][tahun][bulan][tanggal][idcurrentanggota]["jam_masuk"];
                      if(timestamp===undefined){
                          let textRowData3=document.createElement('td');
                      textRowData3.innerHTML="belum absensi masuk"
                      textRow.appendChild(textRowData3);
                      }else{
                          var date = new Date(timestamp);
            let textRowData3=document.createElement('td');
            textRowData3.innerHTML=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
           textRow.appendChild(textRowData3);
                          if((date.getHours()*60+date.getMinutes())*60+date.getSeconds()<=(jammasuk*60+menitmasuk)*60){
                              textRowData3.classList.add('text-success')
                          }else{
                              textRowData3.classList.add('text-danger')
                          }
                      }
            }
                  catch(e){
                      let textRowData3=document.createElement('td');
                      textRowData3.innerHTML="belum absensi masuk"
                      textRow.appendChild(textRowData3);
                  }
                  try{const timestamp2=obj["absensi"][tahun][bulan][tanggal][idcurrentanggota]["jam_keluar"];
            
                      if(timestamp2===undefined){
                          let textRowData4=document.createElement('td');
                      textRowData4.innerHTML="belum absensi keluar"
                      textRow.appendChild(textRowData4);
                      }else{
                          var date2 = new Date(timestamp2);
                          let textRowData4=document.createElement('td');
            textRowData4.innerHTML=date2.getHours()+":"+date2.getMinutes()+":"+date2.getSeconds();
           textRow.appendChild(textRowData4);
                          
                          if((date2.getHours()*60+date2.getMinutes())*60+date2.getSeconds()>=(jamkeluar*60+menitkeluar)*60){
                              textRowData4.classList.add('text-success')
                          }else{
                              textRowData4.classList.add('text-danger')
                          }
                      }
            }
                  catch(e){
                      let textRowData4=document.createElement('td');
                      textRowData4.innerHTML="belum absensi keluar"
                      textRow.appendChild(textRowData4);
                  }
                  try{const lamasuk=obj["absensi"][tahun][bulan][tanggal][idcurrentanggota]["lokasi_latitude_masuk"];
                      const lomasuk=obj["absensi"][tahun][bulan][tanggal][idcurrentanggota]["lokasi_longitude_masuk"];
                      if(lamasuk.isUndefined){
                          let textRowData5=document.createElement('td');
                      textRowData5.innerHTML="belum absensi masuk"
                      textRow.appendChild(textRowData5);
                      }else{let textRowData5=document.createElement('td');
            textRowData5.innerHTML=lamasuk+","+lomasuk
           textRow.appendChild(textRowData5);
                           if(lamasuk>=obj["loclamin"]&&lamasuk<=obj["loclapos"]&&lomasuk>=obj["loclongmin"]&&lomasuk<=obj["loclongpos"]){
                               textRowData5.classList.add('text-success')
                           }else{
                              textRowData5.classList.add('text-danger')
                          }
                           }
            }
                  catch(e){
                      let textRowData5=document.createElement('td');
                      textRowData5.innerHTML="belum absensi masuk"
                      textRow.appendChild(textRowData5);
                  }
                  try{const lakeluar=obj["absensi"][tahun][bulan][tanggal][idcurrentanggota]["lokasi_latitude_keluar"];
                      const lokeluar=obj["absensi"][tahun][bulan][tanggal][idcurrentanggota]["lokasi_longitude_keluar"];
                      if(lakeluar.isUndefined){
                          let textRowData6=document.createElement('td');
                      textRowData6.innerHTML="belum absensi keluar"
                      textRow.appendChild(textRowData6);
                      }else{let textRowData6=document.createElement('td');
            textRowData6.innerHTML=lakeluar+","+lokeluar
           textRow.appendChild(textRowData6);
                           if(lakeluar>=obj["loclamin"]&&lakeluar<=obj["loclapos"]&&lokeluar>=obj["loclongmin"]&&lokeluar<=obj["loclongpos"]){
                               textRowData6.classList.add('text-success')
                           }else{
                              textRowData6.classList.add('text-danger')
                          }}
            }
                  catch(e){
                      
                      let textRowData6=document.createElement('td');
                      textRowData6.innerHTML="belum absensi keluar"
                      textRow.appendChild(textRowData6);
                  }
            
            

            tbody.appendChild(textRow);
                  
                  
              } else {
                console.log("No data available");
              }
            }).catch((error) => {
              console.error(error);
            });
            

            
        }
//    }
}

