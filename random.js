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
