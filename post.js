import { db, doc, getDoc } from "./firebase.js"

const urlParams = new URLSearchParams(window.location.search);

const postId = urlParams.get('id');

const loadPost = () => {
    const postContent = document.getElementById("postContent");
    const docTitle = document.getElementById("docTitle");

    if (postContent) {

        const docRef = doc(db, "posts", postId);

        getDoc(docRef).then((doc) => {
            if (doc.exists()) {
                const postData = doc.data();

                postContent.innerHTML = `
                    <h1>${postData.title}</h1>
                    <p>${postData.content}</p>
                `;


                docTitle.innerHTML = `${postData.title}`;
            } else {
                console.error("No such document!");
            }
        }).catch((error) => {
            console.error("Error getting document:", error);
        });
    } else {
        console.error("Element with ID 'postContent' not found.");
    }


};

loadPost();

// todo comment function is here : 


const commentingFunction = () => {

    let comment = document.getElementById("comment");
    let addcommentBtn = document.getElementById("addComment");
    let commentInput = document.getElementById("commentInput");


    const addComment = () => {
        let commentHtml = `<li>${commentInput.value}</li>`;
        comment.innerHTML += commentHtml;
        document.getElementById("commentInput").value = "";
    }

    addcommentBtn && addcommentBtn.addEventListener("click", () => {
        addComment();
    });
}

commentingFunction();

