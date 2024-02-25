import { db, doc, getDoc, setDoc, query, collection, onSnapshot, where } from "./firebase.js"

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
                <h2 class="text-2xl font-bold mb-2">post title: ${postData.title}</h2>
                <p class="text-gray-700">post content: ${postData.content}</p>
                <p>${postData.type}</p>
                <p>${postData.id}</p>
                <p>${postData.status}</p>
                <p>${postData.catagory}</p>
                <p>${postData.userName}</p>
                <img src=${postData.downloadURL} width='200'/>
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






// ! commet fun goes here working fine

let commentsList = document.getElementById("commentList");
const addCommets = async () => {
    const todoInput = document.getElementById("commentInput");


    const inputVal = todoInput.value;

    if (!inputVal.trim()) {
        alert("enter a comments please");
    }


    const id = new Date().getTime();

    const payload = {
        id,
        todo: inputVal,
        timestamp: id,
    };

    await setDoc(doc(db, "comments", `${id}`), payload);
    todoInput.value = "";
};

let addCommentBtn = document.getElementById("addCommentBtn");
addCommentBtn && addCommentBtn.addEventListener("click", addCommets);


const getCommets = async () => {
    console.log("abd");
    let item = "";
    const q = query(collection(db, "comments"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
            cities.push(doc.data());
        });
        console.log(cities);
        item = cities.map((todoObj) => `<li>${todoObj.todo}</li>`).join("");
        commentsList.innerHTML = item;
    });
};

getCommets();


















