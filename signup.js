import { auth, createUserWithEmailAndPassword } from "./firebase.js";


const rejisterUser = () => {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {

            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
}
const signupForm = document.getElementById("signupForm");
signupForm && signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    rejisterUser();
})