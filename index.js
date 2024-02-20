import { auth, onAuthStateChanged, signOut, collection, query, where, getDocs, onSnapshot, db, signInWithPopup, provider } from "./firebase.js";

let currentPage = window.location.pathname.split('/').pop();

// ** observer start
const load = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (currentPage !== "createpost.html") {
                location.href = "createpost.html";

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
// ** observer end


// ! user logout start
const logoutUser = () => {
    signOut(auth).then(() => {
        if (currentPage !== "index.html") {
            location.href = "index.html";
        }
    }).catch((error) => {
        console.log(error)
    });
}

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn && logoutBtn.addEventListener("click", () => {
    logoutUser();
})

// ! user logout end

// ** sign in with google start 
const googleSIgnIn = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            // console.log(user)
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            // console.log(credential)
        });
}


let googleBtn = document.getElementById("googleBtn");
googleBtn && googleBtn.addEventListener("click", googleSIgnIn);

// ** sign in with google end

// todo: load blogs starts



const loadBlog = () => {
    const blogHead = document.getElementById("blogsList");
    const q = query(collection(db, "posts"),);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const Blogs = querySnapshot.docs.map((docs) => {


            let blogEl = docs.data()



            return `
     
                      <h1 style="color: purple; background: green;">${blogEl.title}</h1>
                     `

        }).join("");

        blogHead.innerHTML = Blogs;


    });
}
loadBlog()
// todo: load blogs ends

