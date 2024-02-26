import { auth, onAuthStateChanged, signOut, collection, query, where, getDocs, onSnapshot, db, signInWithPopup, provider } from "./firebase.js";

let currentPage = window.location.pathname.split('/').pop();

// ** observer start
const load = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (currentPage !== "createpost.html" && currentPage !== "index.html") {
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
    const blogHead = document.getElementById("postHead");

    if (blogHead) {
        const q = query(collection(db, "posts"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const blogEls = querySnapshot.docs.map((doc) => {
                const blogData = doc.data();

                return `
                    <h2 class="blog-post-title text-2xl font-bold mb-2 text-blue-600 hover:underline bg-green-400" data-post-id="${doc.id}">
                        ${blogData.title}
                    </h2>
                    <p class="text-gray-700">${blogData.content}</p>
                    <img class="text-gray-500" src=${blogData.downloadURL} />
                      
                       ${auth.currentUser ? `<a href="post.html?id=${doc.id}" id="move">See more</a>` : `<a href="login.html" id="move">See more</a>`}
                `;
            });

            const blogHtml = blogEls.join("");

            blogHead.innerHTML = blogHtml;

        });
    } else {
        console.error("Element with ID 'postHead' not found.");
    }
};


loadBlog();

// todo: load blogs ends