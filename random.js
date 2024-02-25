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
//         });
//     } else {
//         console.error("Element with ID 'blogsList' not found.");
//     }
// };




// loadBlog();

const loadBlog = () => {
    const blogHead = document.getElementById("postHead");
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const blogEls = querySnapshot.docs.map((doc) => {
            const blogData = doc.data();
            const postId = doc.id;

            createPostPage(postId, blogData);
            return `
            <h1 style="color: purple; background: green; cursor: pointer" class="blog-post-title" data-post-id="${doc.id}">${blogData.title}</h1>
          `;
        });
        const blogHtml = blogEls.join("");

        blogHead.innerHTML = blogHtml;
    });
}

const createPostPage = (postId, blogData) => {
    // Create a new HTML page for each blog post
    const postPageHTML = `
        <html>
        <head>
            <title>${blogData.title}</title>
        </head>
        <body>
            <h1>${blogData.title}</h1>
            <p>${blogData.content}</p>
        </body>
        </html>
    `;

    // Create a Blob from the HTML content
    const blob = new Blob([postPageHTML], { type: "text/html" });

    // Create a URL for the Blob
    const postPageURL = URL.createObjectURL(blob);

    // Create a link to the post page
    const postLink = document.createElement("a");
    postLink.href = postPageURL;
    postLink.innerText = blogData.title;

    // Append the link to the document body or any desired container
    document.body.appendChild(postLink);
}

// Call the loadBlog function to fetch and display the blog posts
loadBlog();

// todo 2nd method is here

document.addEventListener("DOMContentLoaded", function () {
    const loadBlog = () => {
        let isBlogHeadEmpty = false;
        const blogHead = document.getElementById("postHead");
        console.log(blogHead)
        const q = query(collection(db, "posts"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const blogEls = querySnapshot.docs.map((doc) => {
                const blogData = doc.data();
                const postId = doc.id;

                // Create a blog post element with a click event listener to open the post page
                const blogPostElement = document.createElement("h2");
                blogPostElement.textContent = blogData.title;
                blogPostElement.style.color = "purple";
                blogPostElement.style.background = "green";
                blogPostElement.style.cursor = "pointer";
                blogPostElement.classList.add("blog-post-title");
                blogPostElement.setAttribute("data-post-id", postId);

                blogPostElement && blogPostElement.addEventListener("click", () => {
                    createPostPage(postId, blogData);
                });

                return blogPostElement;
            });

            // Clear previous content before adding new blog posts
            isBlogHeadEmpty = blogHead.innerHTML = "";

            // Append each blog post element to the blogHead container
            blogEls.forEach((blogEl) => {
                blogHead.appendChild(blogEl);
            });
        });
    }
    const createPostPage = (postId, blogData) => {
        const postPageHTML = `
            <html>
            <head>
                <title>${blogData.title}</title>
            </head>
            <body>
                <h1>${blogData.title}</h1>
                <p>${blogData.content}</p>
            </body>
            </html>
        `;
        const blob = new Blob([postPageHTML], { type: "text/html" });
        const postPageURL = URL.createObjectURL(blob);
        window.open(postPageURL, "_blank");
    }


    loadBlog();


});

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


// Import necessary Firebase modules for app initialization, Firestore database, authentication, and storage
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { onAuthStateChanged, getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// Firebase configuration containing API keys and project details
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);

// Get references to Firestore database, authentication, and storage
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

// Function to handle blog post addition
const addBlogPost = async () => {
  // Disable the "Add Blog" button to prevent multiple submissions
  addBlog.disabled = true;

  // Get input values from form elements
  const checkedRadio = document.querySelector('input[name="radio-10"]:checked');
  const checkedRadio2 = document.querySelector('input[name="radio-1"]:checked');
  const blogTitle = document.getElementById("blogInp").value.trim();
  const selectCategory = document.getElementById("selectInp").value.trim();
  const textArea = document.getElementById("txtArea").value.trim();
  const img = document.getElementById("img");

  // Check for empty fields
  const emptyFields = [];
  if (!checkedRadio) emptyFields.push("Radio Option 1");
  if (!checkedRadio2) emptyFields.push("Radio Option 2");
  if (!blogTitle) emptyFields.push("Blog Title");
  if (selectCategory === "Select Category") emptyFields.push("Select Option");
  if (!textArea) emptyFields.push("Text Area");
  if (!img.value) emptyFields.push("Image");

  // Display error message if any field is empty
  if (emptyFields.length > 0) {
    const message = `Please fill in the following fields: ${emptyFields.join(", ")}`;
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      close: true
    }).showToast();
    addBlog.disabled = false;
    return;
  }

  // Upload image to Firebase Storage
  const uploadImage = async () => {
    const file = img.files[0];
    const metadata = { contentType: file.type, name: file.name, size: file.size };
    const storageRef = ref(storage, `images/${file.name}_${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Monitor upload progress and handle completion
    uploadTask.on('state_changed', (snapshot) => {
      // Handle upload progress
    }, (error) => {
      // Handle errors
    }, async () => {
      // Get download URL after successful upload
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      // Get current user details
      const user = auth.currentUser;

      // Create payload for blog post
      const payload = {
        userName: user.displayName,
        id: user.uid,
        postDate: new Date().toString().slice(4, 15),
        checkedRadio: checkedRadio.value,
        checkedRadio2: checkedRadio2.value,
        blogTitle,
        selectCategory,
        textArea,
        downloadURL
      };

      try {
        // Upload post data to Firestore
        await setDoc(doc(db, "posts", `${Date.now()}`), payload);
        // Clear form fields after successful submission
        document.getElementById("blogInp").value = "";
        document.getElementById("selectInp").value = "";
        document.getElementById("txtArea").value = "";
        document.querySelectorAll('input[name="radio-10"]').forEach(radio => radio.checked = false);
        document.querySelectorAll('input[name="radio-1"]').forEach(radio => radio.checked = false);
        document.getElementById("img").value = "";

        // Show success message
        Toastify({
          text: "Post uploaded",
          duration: 3000,
          gravity: "center",
          close: true,
        }).showToast();
        // Enable "Add Blog" button for next submission
        addBlog.disabled = false;
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });
  };

  // Start uploading image
  uploadImage();
};

// Function to check user authentication status and redirect accordingly
const load = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (currentPath !== "addBlog.html") {
        window.location.href = "addBlog.html";
      }
    } else {
      if (currentPath !== "index.html" && currentPath !== "index.html") {
        window.location.href = "index.html";
      }
    }
  });
};
load();

// Function to handle user logout
const logOutBtn = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
      window.location.reload();
      alert("User logged out");
    })
    .catch((error) => {
      console.error("Sign out error:", error);
    });
};

// Function to handle redirection to home page
const homeRed = () => {
  window.location.href = "index.html";
};

// Event listeners for logout, home, and add blog buttons
logOut && logOut.addEventListener("click", logOutBtn);
home && home.addEventListener("click", homeRed);
addBlog.addEventListener("click", addBlogPost);


async () => {
    try {

      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log("Download URL:", downloadURL);
      const timestamp = new Date().getTime();
     const postDate = new Date().toString().slice(4, 15);
      
      

      const payload = {
        userName: user.displayName,
        id: user.uid,
        postDate,
        checkedRadio: checkedRadio.value,
        checkedRadio2: checkedRadio2.value,
        blogInp,
        selectInp,
        txtArea,
        downloadURL: downloadURL
      };

      try {
        await setDoc(doc(db, "posts", `${timestamp}`), payload);
        document.getElementById("blogInp").value = "";
        document.getElementById("selectInp").value = "";
        document.getElementById("txtArea").value = "";
        document.querySelectorAll('input[name="radio-10"]').forEach(radio => radio.checked = false);
        document.querySelectorAll('input[name="radio-1"]').forEach(radio => radio.checked = false);
        document.getElementById("img").value = "";

        Toastify({
          text: "Post uploaded",
          duration: 3000,
          gravity: "center",
          close: true,
        }).showToast();
        addBlog.disabled = false;
      } 
      
      
      
      
      catch (e) {
        console.error("Error adding document: ", e);
      }
    } catch (error) {
      console.error("Error getting download URL: ", error);
    }
  }

