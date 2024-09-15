// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore,doc,setDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
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

let userName = document.getElementById("userName")
let userEmail = document.getElementById("userEmail")
let userPass = document.getElementById("userPass")

window.signup = () => {
    let crtSetobj = {
        userName: userName.value,
        userEmail: userEmail.value,
        userPass: userPass.value
    }

    createUserWithEmailAndPassword(auth, crtSetobj.userEmail, crtSetobj.userPass)
        .then(async(userRes) => {
            // const user = userRes.user;
            // console.log(user);
            //...
            crtSetobj.id = userRes.user.uid;
            delete crtSetobj.userPass
            const refrence = doc(db,"Users",crtSetobj.id)
            console.log(refrence);
            await setDoc(refrence,crtSetobj)
            .then(()=>{
                // console.log(dbres);
              })
              .catch((dberr)=>{
                console.log(dberr);
                
              })

            //...
            Swal.fire({
                title: "Good job!",
                text: "Sign Up Successfully!",
                icon: "success"
            });
            function gosignin() {
                location.replace("/index.html")
            }
            setTimeout(gosignin, 1500)
        })
        .catch((userErr) => {
            Swal.fire({
                title: "Error!",
                text: userErr,
                icon: "error"
            });
            // console.log(userErr);  
        })
        userName.value = ""
        userEmail.value = ""
        userPass.value = ""
}