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