import { auth, signInWithEmailAndPassword } from "./firebase.js";


const userSingnIN = () => {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
}

const loginForm = document.getElementById("loginForm");
loginForm && loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    userSingnIN();
});