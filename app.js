// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc,getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
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

let loginName = document.getElementById("loginName")
let loginEmail = document.getElementById("loginEmail")
let loginPass = document.getElementById("loginPass")

window.login = () => {
    let loginObj = {
        loginName: loginName.value,
        loginEmail: loginEmail.value,
        loginPass: loginPass.value
    }

    signInWithEmailAndPassword(auth, loginObj.loginEmail, loginObj.loginPass)
        .then(async (userRes) => {
            // const user = userRes.user;

            // Signed in getdata
            let id = userRes.user.uid;
            // delete loginObj.loginPass
            let reference = doc(db, "Users", id)
            const user = await getDoc(reference)
            if (user.exists()) {
                console.log("get doc: " ,user.data());
            }else{
                console.log("No such document!");
            }

            // Signed in 
            Swal.fire({
                title: "Good job!",
                text: "Login Successfully!",
                icon: "success"
            });
            //...
            function godash() {
                location.replace("/pages/Dashboard/Dashboard.html")
            }
            setTimeout(godash, 1500)
        })
        .catch((userErr) => {
            const errorMessage = userErr.message;
            Swal.fire({
                title: "Error",
                text: errorMessage,
                icon: "error"
            });
        })
    loginName.value = ""
    loginEmail.value = ""
    loginPass.value = ""
}
window.signup = () => {
    location.replace("/pages/Signup/signup.html")
}