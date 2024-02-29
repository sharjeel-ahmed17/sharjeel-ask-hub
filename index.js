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
                let name = "sharjeel ahmed";
                return `

                <!-- start cards -->
                <div class="card mb-5 p-4 border border-green-400 shadow-2xl">
                    <div class="flex flex-col md:flex-row gap-12 items-start">
                        <div class="order-2 md:order-1 md:h-[12rem] mx-auto">
                            <div class="flex flex-col justify-between h-full">
                                <div>
                                    <h2 class="font-bold">Lorem ipsum dolor sit amet.</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum amet ad inventore!</p>
                                    ${auth.currentUser ? `<a href="post.html?id=${doc.id}" id="move">See more</a>` : `<a href="login.html" id="move">See more</a>`}
                                </div>
                                <div class="flex justify-between">
                                    <div class="space-x-3">
                                        <i class="fa-solid fa-user"></i>
                                        <span>${blogData.userName}</span>
                                    </div>
                                    <div>28 jan 2024</div>
                                </div>
                            </div>
        
        
                        </div>
                        <div class="w-full md:w-1/5 order-1 md:order-2 ml-0">
                            <img src=${blogData.downloadURL} alt="" class="w-full h-full object-cover">
                        </div>
        
                    </div>
        
                </div>
                <!-- ends cards -->
<!--
 <h2 class="blog-post-title text-2xl font-bold mb-2 text-blue-600 hover:underline bg-green-400" data-post-id="${doc.id}">
                        ${blogData.title}
                    </h2>
                    <p class="text-gray-700">${blogData.content}</p>
                    <img class="text-gray-500" src=${blogData.downloadURL} />
                      
                       ${auth.currentUser ? `<a href="post.html?id=${doc.id}" id="move">See more</a>` : `<a href="login.html" id="move">See more</a>`}

                       -->
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