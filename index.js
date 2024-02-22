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



// const loadBlog = () => {
//     const blogHead = document.getElementById("postHead");
//     // const blogHead = document.getElementById("postHead");
//     const q = query(collection(db, "posts"),);
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const Blogs = querySnapshot.docs.map((docs) => {


//             let blogEl = docs.data()



//             return `

//                       <h1 style="color: purple; background: green;">${blogEl.title}</h1>
//                      `

//         }).join("");

//         blogHead.innerHTML = Blogs;


//     });
// }
// loadBlog();
// Assuming the element with ID "blogsList" exists or will be created before loadBlog is called




// ! 2nd blog
// const loadBlog = () => {
//     const blogHead = document.getElementById("postHead");

//     if (blogHead) {
//         const q = query(collection(db, "posts"));

//         const unsubscribe = onSnapshot(q, (querySnapshot) => {
//             const blogEls = querySnapshot.docs.map((doc) => {
//                 const blogData = doc.data();

//                 return `
//             <h1 style="color: purple; background: green; cursor: pointer" class="blog-post-title" data-post-id="${doc.id}">${blogData.title}</h1><p>${blogData.content}</p>
//           `;
//             });

//             const blogHtml = blogEls.join("");

//             blogHead.innerHTML = blogHtml;


//         });
//     } else {
//         console.error("Element with ID 'blogsList' not found.");
//     }
// };



// loadBlog();






// todo: 3rd blogs app start

// const loadBlog = async () => {
//     const blogHead = document.getElementById("postHead");

//     if (!blogHead) {
//       console.error("Element with ID 'postHead' not found.");
//       return;
//     }

//     try {
//       const q = query(collection(db, "posts")); // Query for all posts

//       const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const blogEls = querySnapshot.docs.map((doc) => {
//           const blogData = doc.data(); // Extract blog data from document

//           return `
//             <div class="card mb-3 post-card" data-post-id="${doc.id}">
//               <img src="${blogData.imageUrl || ''}" class="card-img-top" alt="${blogData.title} image">
//               <div class="card-body">
//                 <h5 class="card-title">${blogData.title}</h5>
//                 <p class="card-text">${blogData.excerpt || `Click to read more!`}</p>
//                 <a href="/post/${doc.id}" class="btn btn-primary">Read More</a>
//               </div>
//             </div>
//           `;
//         });

//         const blogHtml = blogEls.join("");
//         blogHead.innerHTML = blogHtml;

//         // Event delegation for click handling
//         blogHead.addEventListener("click", (event) => {
//           const clickedElement = event.target;
//           if (clickedElement.classList.contains("btn-primary") || clickedElement.tagName === 'H5') { // Handle clicks on buttons and titles
//             const postId = clickedElement.closest('.post-card').dataset.postId;
//             window.location.href = `/post/${postId}`;
//           }
//         });
//       });
//     } catch (error) {
//       console.error("Error loading blog posts:", error);
//     }
//   };

//   // Call the loadBlog function on page load or when content updates
//   window.onload = loadBlog; // Or call dynamically when new posts are added

// todo: 3rd blogs app start



// todo: load blogs ends





// ! 4rd method
// const loadBlog = () => {
//     const blogHead = document.getElementById("postHead");

//     if (blogHead) {
//         const q = query(collection(db, "posts"));

//         const unsubscribe = onSnapshot(q, (querySnapshot) => {
//             const blogEls = querySnapshot.docs.map((doc) => {
//                 const blogData = doc.data();

//                 return `
//             <h1 style="color: purple; background: green; cursor: pointer" class="blog-post-title" data-post-id="${doc.id}">${blogData.title}</h1>
//           `;
//             });

//             const blogHtml = blogEls.join("");

//             blogHead.innerHTML = blogHtml;

//             // Add click event listeners to each post title
//             const postTitles = document.querySelectorAll(".blog-post-title");
//             postTitles.forEach((title) => {
//                 title.addEventListener("click", () => {
//                     const postId = title.dataset.postId;
//                     // Redirect to the post page with the post ID
//                     window.location.href = `post.html?postId=${postId}`;
//                 });
//             });
//         });
//     } else {
//         //console.error("Element with ID 'blogsList' not found.");
//     }
// };

// // Load posts on both index and post-page
// loadBlog();

// ** working fine but not uisng backtics


//  ! commenting option in post page:

const loadBlog = () => {
    const blogHead = document.getElementById("postHead");

    if (blogHead) {
        const q = query(collection(db, "posts"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const blogEls = querySnapshot.docs.map((doc) => {
                const blogData = doc.data();

                return `
                    <h1 style="color: purple; background: green; cursor: pointer" class="blog-post-title" data-post-id="${doc.id}">
                        ${blogData.title}
                    </h1>
                    <p>${blogData.content}</p>
                `;
            });

            const blogHtml = blogEls.join("");

            blogHead.innerHTML = blogHtml;

            // Add event listener to each blog post title after they are added to the DOM
            const postTitles = blogHead.querySelectorAll('.blog-post-title');
            postTitles.forEach(title => {
                title.addEventListener('click', () => {
                    const postId = title.getAttribute('data-post-id');
                    window.location.href = `post.html?id=${postId}`;
                });
            });
        });
    } else {
        console.error("Element with ID 'postHead' not found.");
    }
};

loadBlog();

