import { auth, onAuthStateChanged, signOut } from "./firebase.js";

let currentPage = window.location.pathname.split('/').pop();
const load = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (currentPage !== "createpost.html") {
                location.href = "createpost.html"
            }
            const uid = user.uid;
            console.log(uid)
            console.log("user is login")
        } else {
            if (currentPage !== "login.html" && currentPage !== "signup.html") {

                window.location.href = "login.html";
            }
        }
    });
}

load();


const logoutUser = () => {
    signOut(auth).then(() => {

    }).catch((error) => {
        console.log(error)
    });
}

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn && logoutBtn.addEventListener("click", () => {
    logoutUser();
})