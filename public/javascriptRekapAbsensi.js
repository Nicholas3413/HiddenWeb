import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getDatabase, ref, onValue, child, get} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
import { getAuth,signInWithEmailAndPassword,onAuthStateChanged ,signOut} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
//const uid = require('./javascript.js');
//import {moment} from "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment-with-locales.min.js"
moment.locale('en-gb')
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
//var obj={}
var selected=["0","0","0","0"];
var listuid = [];
var hari=["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"]

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
function createCookieCekAnggota(fieldname, fieldvalue, expiry) {
    var date = new Date();
    date.setTime(date.getTime()+ (expiry*24*60*60*1000));
    var expires = "expires=" + date.toGMTString();
    document.cookie = fieldname + "=" + fieldvalue + 
                      ";" + expires + ";path=/daftar-karyawan.html";
}


var jammasuk=new Number()
var menitmasuk=new Number()
var jamkeluar=new Number()
var menitkeluar=new Number()
var workhoursday=new Number()
var workhoursweek=new Number()
var loclamin=new Number()
var loclapos=new Number()
var loclongmin=new Number()
var loclongpos=new Number()
var totalwaktukerjaminggu= new Number()

var date = new Date();

document.getElementById("datepicker").value=date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
    '-' + date.getDate().toString().padStart(2, 0);
selected[1]=date.getFullYear().toString();
selected[2]=(date.getMonth() + 1).toString().padStart(2, 0);
selected[3]=date.getDate().toString().padStart(2, 0);
console.log(selected)
document.getElementById("datepicker").onchange = function(){
    var date=document.getElementById("datepicker").value
    var arr1 = date.split('-');
    console.log(arr1)
    selected[1]=arr1[0];
    selected[2]=arr1[1];
    selected[3]=arr1[2];
    console.log(selected)
    
    let tbody = document.getElementById("dataabsensi");
      var rowCount = tbody.rows.length;
    for (var x=rowCount-1; x>=0; x--) {
       tbody.deleteRow(x);
    }
    inittable()
//    inittable(obj,arr1[0],arr1[1],arr1[2])
};
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
              get(child(dbRef, `perusahaan/${snapshot.val()["perusahaan_id"]}`)).then((snapshot) => {
                  jammasuk=snapshot.val()["jam_masuk"]
                  jamkeluar=snapshot.val()["jam_pulang"]
                  menitmasuk=snapshot.val()["menit_masuk"]
                  menitkeluar=snapshot.val()["menit_pulang"]
                  workhoursday=snapshot.val()["work_hours_day"]
                  workhoursweek=snapshot.val()["work_hours_week"]
                  loclamin=snapshot.val()["loclamin"]
                  loclapos=snapshot.val()["loclapos"]
                  loclongmin=snapshot.val()["loclongmin"]
                  loclongpos=snapshot.val()["loclongpos"]
                  initli(snapshot.val()["anggota"])
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
//        document.cookie = 'name=uid; path=/index.html; expires=' + new Date(0).toUTCString();
//        document.cookie = 'name=uid; path=/dashboard.html; expires=' + new Date(0).toUTCString();
//        document.cookie = 'name=uid; path=/informasi-perusahaan.html; expires=' + new Date(0).toUTCString();
//        document.cookie = 'name=uid; path=/; expires=' + new Date(0).toUTCString();
        expireAllCookies('uid', ['/', '/dashboard.html','/informasi-perusahaan.html','/index.html','/daftar-karyawan.html','/informasi-karyawan.html','/rekap-absensi.html']);
        expireAllCookies('auid', ['/informasi-karyawan.html']);
        window.location.href='./index.html';
    }).catch((error) => {
      // An error happened.
    });
})

function expireAllCookies(name, paths) {
    var expires = new Date(0).toUTCString();

    // expire null-path cookies as well
    document.cookie = name + '=; expires=' + expires;

    for (var i = 0, l = paths.length; i < l; i++) {
        document.cookie = name + '=; path=' + paths[i] + '; expires=' + expires;
    }
    
}
function initli(obj=null){
    var ul = document.getElementById("daftaranggota");
    console.log(obj)
    for(let i=0;i<Object.keys(obj).length;i++){
        
        
        listuid[i]=obj[Object.keys(obj)[i]]["user_id"]
        get(child(dbRef, `users/${obj[Object.keys(obj)[i]]["user_id"]}/user_name`)).then((snapshot) => {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(snapshot.val()+" ("+obj[Object.keys(obj)[i]]["bagian"]+")"));
            ul.appendChild(li);
            if(i+1===Object.keys(obj).length){
                console.log(listuid)
            const ulList = document.getElementById("daftaranggota");
            li = document.getElementsByTagName('li');
            var nodes = Array.from( ulList.children );
            let select = -1;
            var c = document.getElementById("daftaranggota").childNodes;
            c[1].style.backgroundColor = "yellow";
            document.getElementById("daftaranggota").addEventListener("click",function(e) {
                    if(select===-1){
                        c[1].style.backgroundColor = "";
                    }else{
                        c[select+1].style.backgroundColor = "";
                    }

                    if (select !== nodes.indexOf(e.target)) {
                        selected[0]=nodes.indexOf(e.target)

                        select = nodes.indexOf(e.target);
                        console.log(selected[0]);

                        c[select+1].style.backgroundColor = "yellow";
                    } else {
                        c[select+1].style.backgroundColor = "yellow";
                        console.log("Already select");
                    }
                let tbody = document.getElementById("dataabsensi");
                  var rowCount = tbody.rows.length;
                for (var x=rowCount-1; x>=0; x--) {
                   tbody.deleteRow(x);
                }
                inittable()

            });
            inittable()
            }
        })
    }
    
    
}
//function inittable(obj=null,tahun,bulan,tanggal,suid){
function inittable(){
    let tbody = document.getElementById("dataabsensi");
//    var date=tahun+bulan+tanggal
    var date=selected[1]+"-"+selected[2]+"-"+selected[3]
    var datex=new Date(date)
    var weeknumber = moment(datex).week();
    console.log(weeknumber);
    const arrdate=[]
    const arrdate2=[]
    totalwaktukerjaminggu=0
      
    
    get(child(dbRef, `users/${listuid[selected[0]]}`)).then((snapshot) => {
        console.log(snapshot.val()["perusahaan_id"])
        document.getElementById("sanggota").innerHTML="("+snapshot.val()["user_name"]+")"  
        for(let i=0;i<7;i++){
            var test = moment().day(i+1).week(weeknumber);
            arrdate[i]=moment(test).format('L')
            arrdate2[i]=test
            var arr2 = arrdate[i].split('/');
                get(child(dbRef, `perusahaan/${snapshot.val()["perusahaan_id"]}/absensi/${arr2[2]}/${arr2[1]}/${arr2[0]}/${snapshot.val()["anggota_perusahaan_id"]}`)).then((snapshot) => {
                    let textRow="row_"+(i+1);
                    textRow = document.createElement('tr');
                   let textRowData1=document.createElement('td');
                    textRowData1.innerHTML=(i+1)+".";
                   textRow.appendChild(textRowData1);
                   let textRowData2=document.createElement('td');
                    textRowData2.innerHTML=hari[i]+", "+moment(arrdate2[i]).format('LL');
                   textRow.appendChild(textRowData2);
                    let textRowData3=document.createElement('td');
                    try{const timestamp=snapshot.val()["jam_masuk"];
                      if(timestamp===undefined){
                          let textRowData3=document.createElement('td');
                      textRowData3.innerHTML="belum absensi masuk"
                      textRow.appendChild(textRowData3);
                      }else{
                          var datetemp1 = new Date(timestamp);
                            let textRowData3=document.createElement('td');
                
                            textRowData3.innerHTML=datetemp1.getHours().toString().padStart(2, 0)+":"+datetemp1.getMinutes().toString().padStart(2, 0)+":"+datetemp1.getSeconds().toString().padStart(2, 0);
                           textRow.appendChild(textRowData3);
                          if((datetemp1.getHours()*60+datetemp1.getMinutes())*60+datetemp1.getSeconds()<=((parseInt(jammasuk,10)*60+parseInt(menitmasuk,10))*60)){
                              
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
                  try{const timestamp2=snapshot.val()["jam_keluar"];
            
                      if(timestamp2===undefined){
                          let textRowData4=document.createElement('td');
                      textRowData4.innerHTML="belum absensi keluar"
                      textRow.appendChild(textRowData4);
                      }else{
                          var datetemp2 = new Date(timestamp2);
                          let textRowData4=document.createElement('td');
            textRowData4.innerHTML=datetemp2.getHours().toString().padStart(2, 0)+":"+datetemp2.getMinutes().toString().padStart(2, 0)+":"+datetemp2.getSeconds().toString().padStart(2, 0);
           textRow.appendChild(textRowData4);
                          
                          if((datetemp2.getHours()*60+datetemp2.getMinutes())*60+datetemp2.getSeconds()>=((parseInt(jamkeluar,10)*60+parseInt(menitkeluar,10))*60)){
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
                    try{const timestamp=snapshot.val()["jam_masuk"];
                      const timestamp2=snapshot.val()["jam_keluar"];
                      var date = new Date(timestamp);
                      var date2 = new Date(timestamp2);
                      console.log(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())
                      if(date.getHours()*3600+date.getMinutes()*60+date.getSeconds()<=jammasuk*3600+menitmasuk*60){
                          date=new Date(date.getYear(),date.getMonth(),date.getDate(),jammasuk,menitmasuk,0)
                          console.log("new date 1="+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())
                      }
                      if(date2.getHours()*3600+date2.getMinutes()*60+date2.getSeconds()>=jamkeluar*3600+menitkeluar*60){
                          date2=new Date(date2.getYear(),date2.getMonth(),date2.getDate(),jamkeluar,menitkeluar,0)
                          console.log("new date 2="+date2.getHours()+":"+date2.getMinutes()+":"+date2.getSeconds())
                      }
                      if(date2.getHours()*3600+date2.getMinutes()*60+date2.getSeconds()<jammasuk*3600+menitmasuk*60){
                          date2=new Date(date2.getYear(),date2.getMonth(),date2.getDate(),jammasuk,menitmasuk,0)
                          console.log("new date 2="+date2.getHours()+":"+date2.getMinutes()+":"+date2.getSeconds())
                      }
                      if(date.getHours()*3600+date.getMinutes()*60+date.getSeconds()>jamkeluar*3600+menitkeluar*60){
                          date=new Date(date.getYear(),date.getMonth(),date.getDate(),jamkeluar,menitkeluar,0)
                          console.log("new date 1="+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())
                      }
                      console.log(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())
                      if(timestamp2>=timestamp){
                      if(timestamp===undefined){
                          let textRowData3a=document.createElement('td');
                      textRowData3a.innerHTML="belum absensi masuk"
                      textRow.appendChild(textRowData3a);
                          let textRowData3b=document.createElement('td');
                      textRowData3b.innerHTML="belum absensi masuk"
                      textRow.appendChild(textRowData3b);
                      }else if(timestamp2===undefined){
                          let textRowData3a=document.createElement('td');
                      textRowData3a.innerHTML="belum absensi keluar"
                      textRow.appendChild(textRowData3a);
                          let textRowData3b=document.createElement('td');
                      textRowData3b.innerHTML="belum absensi keluar"
                      textRow.appendChild(textRowData3b);
                      }
                      else{
                          var Difference_In_Time = date2.getTime() - date.getTime();
            
                          var surplustime=Difference_In_Time-workhoursday*3600000
                          let textRowData3b=document.createElement('td');
                          if(surplustime>0){
                              let textRowData3a=document.createElement('td');
                                Difference_In_Time=workhoursday*3600000
                              totalwaktukerjaminggu=totalwaktukerjaminggu+Difference_In_Time
            textRowData3a.innerHTML=Math.floor(Difference_In_Time/3600000).toString().padStart(2, 0)+":"+Math.floor((Difference_In_Time/60000)%60).toString().padStart(2, 0)+":"+Math.round((Difference_In_Time/1000)%60).toString().padStart(2, 0);
                          textRow.appendChild(textRowData3a);
                              textRowData3b.innerHTML=Math.floor(surplustime/3600000).toString().padStart(2, 0)+":"+Math.floor((surplustime/60000)%60).toString().padStart(2, 0)+":"+Math.round((surplustime/1000)%60).toString().padStart(2, 0);
                          }else{
                              let textRowData3a=document.createElement('td');
                              totalwaktukerjaminggu=totalwaktukerjaminggu+Difference_In_Time
            textRowData3a.innerHTML=Math.floor(Difference_In_Time/3600000).toString().padStart(2, 0)+":"+Math.floor((Difference_In_Time/60000)%60).toString().padStart(2, 0)+":"+Math.round((Difference_In_Time/1000)%60).toString().padStart(2, 0);
                          textRow.appendChild(textRowData3a);
                              textRowData3b.innerHTML="0"
                          }
                          
                      
                      textRow.appendChild(textRowData3b);
                          
                      }
                    }else{
                    let textRowData3b=document.createElement('td');
                      let textRowData3a=document.createElement('td');
                    textRowData3a.innerHTML="00:00:00"
                    textRow.appendChild(textRowData3a);
                    textRowData3b.innerHTML="00:00:00"
                      textRow.appendChild(textRowData3b);
                    }
                     }
                  catch(e){

                      let textRowData3=document.createElement('td');
                      textRowData3.innerHTML="belum absensi masuk"
                      textRow.appendChild(textRowData3);
                      let textRowData3b=document.createElement('td');
                      textRowData3b.innerHTML="belum absensi masuk"
                      textRow.appendChild(textRowData3b);
                        }
                     try{const lamasuk=snapshot.val()["lokasi_latitude_masuk"];
                      const lomasuk=snapshot.val()["lokasi_longitude_masuk"];
                      if(lamasuk.isUndefined){
                          let textRowData5=document.createElement('td');
                      textRowData5.innerHTML="belum absensi masuk"
                      textRow.appendChild(textRowData5);
                      }else{let textRowData5=document.createElement('td');
            textRowData5.innerHTML=lamasuk+","+lomasuk
                            
        textRowData5.addEventListener('click',function(){
                            window.open('http://maps.google.com/?q='+lamasuk+","+lomasuk, '_blank')})
           textRow.appendChild(textRowData5);
                           if(lamasuk>=loclamin&&lamasuk<=loclapos&&lomasuk>=loclongmin&&lomasuk<=loclongpos){
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
                  try{const lakeluar=snapshot.val()["lokasi_latitude_keluar"];
                      const lokeluar=snapshot.val()["lokasi_longitude_keluar"];
                      if(lakeluar.isUndefined){
                          let textRowData6=document.createElement('td');
                      textRowData6.innerHTML="belum absensi keluar"
                      textRow.appendChild(textRowData6);
                      }else{let textRowData6=document.createElement('td');
            textRowData6.innerHTML=lakeluar+","+lokeluar
                            textRowData6.addEventListener('click',function(){
                            window.open('http://maps.google.com/?q='+lakeluar+","+lokeluar, '_blank')})
           textRow.appendChild(textRowData6);
                           if(lakeluar>=loclamin&&lakeluar<=loclapos&&lokeluar>=loclongmin&&lokeluar<=loclongpos){
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
                    if(i===6){
                        document.getElementById("totalwaktukerjamingguan").innerHTML=Math.floor(totalwaktukerjaminggu/3600000).toString().padStart(2, 0)+":"+Math.floor((totalwaktukerjaminggu/60000)%60).toString().padStart(2, 0)+":"+Math.round((totalwaktukerjaminggu/1000)%60).toString().padStart(2, 0);
                        if(totalwaktukerjaminggu>=workhoursweek*3600000){
                            document.getElementById("totalwaktukerjamingguan").classList.add('text-success')
                        }
                        else{
                            document.getElementById("totalwaktukerjamingguan").classList.add('text-danger')
                        }
                    }
                })
        }
    })
    console.log(arrdate+listuid[selected[0]])
    
    console.log(datex)

}



