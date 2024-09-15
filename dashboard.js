// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3AMi3u5Qwv11z7tlUP6qcs9wZiMw2I3A",
    authDomain: "task-project-c94df.firebaseapp.com",
    projectId: "task-project-c94df",
    storageBucket: "task-project-c94df.appspot.com",
    messagingSenderId: "417078899457",
    appId: "1:417078899457:web:c83c679a9e86c17eb0a100",
    measurementId: "G-D6E0R7VF31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

// get Id 
let stdName = document.getElementById("std_Name")
let stdFatherName = document.getElementById("std_FatherName")
let stdEmail = document.getElementById("std_Email")
let stdAge = document.getElementById("std_Age")
let stdContect = document.getElementById("std_Contect")
let stdCourse = document.getElementById("std_Course")
let tblbody = document.getElementById("tbl_body")


window.submit = async () => {
    let stdobj = {
        stdName: stdName.value,
        stdFatherName: stdFatherName.value,
        stdEmail: stdEmail.value,
        stdAge: stdAge.value,
        stdContect: stdContect.value,
        stdCourse: stdCourse.value
    }
    console.log(stdobj);
    const refrence = await collection(db, "Student")
    addDoc(refrence, stdobj)
        .then((res) => {
            // console.log("Success");
            Swal.fire({
                title: "Good job!",
                text: "Submit Successfully!",
                icon: "success"
            });
        })
        .catch((err) => {
            console.log("Error");
        })
}
window.signout = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            Swal.fire({
                title: "Good job!",
                text: "signout Successfully!",
                icon: "success"
            });
            function gologin() {
                location.replace("index.html")
            }
            setTimeout(gologin, 1500)
            //...
        } else {
            // User is signed out
            Swal.fire({
                title: "Error",
                text: "Error",
                icon: "error"
            });
            // ...
        }
    })
    stdName.value = ""
    stdFatherName.value = ""
    stdEmail.value = ""
    stdAge.value = ""
    stdContect.value = ""
    stdCourse.value = ""
}

// Get Database stdtbl set data
const stdData = []

const rendertbl = () => {
    tblbody.innerHTML = "";
    stdData.forEach((x) =>{
        tblbody.innerHTML += `
             <tr>
                <td>${x.stdName}</td>
                <td>${x.stdFatherName}</td>
                <td>${x.stdEmail}</td>
                <td>${x.stdAge}</td>
                <td>${x.stdContect}</td>
                <td>${x.stdCourse}</td>
                <td><button class="btn_del">Delete</button></td>
            </tr>
            `
        })
}

const getData = async () => {
    const dtrefrence = collection(db, "Student");
    const dt = await getDocs(dtrefrence);

    dt.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        stdData.push({
            ...doc.data(),
            id: doc.id
        })
    });
    console.log(stdData);
    rendertbl();
}
getData();