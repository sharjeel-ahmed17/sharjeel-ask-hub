import { db, doc , getDoc} from "./firebase.js"

const urlParams = new URLSearchParams(window.location.search);

const postId = urlParams.get('id');

const loadPost = () => {
    const postContent = document.getElementById("postContent");

    if (postContent) {

        const docRef = doc(db, "posts", postId);

        getDoc(docRef).then((doc) => {
            if (doc.exists()) {
                const postData = doc.data();

                postContent.innerHTML = `
                    <h1>${postData.title}</h1>
                    <p>${postData.content}</p>
                `;
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

