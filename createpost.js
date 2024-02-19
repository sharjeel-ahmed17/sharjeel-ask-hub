import { db, setDoc, doc } from "./firebase.js";




const addData = async () => {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const id = new Date().getTime();


    const payload = {
        id,
        title,
        content
    }

    try {
        await setDoc(doc(db, "posts", `${id}`), payload);

    } catch (error) {
        console.error("eror writing blogs to firestore ", error);

    }

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    console.log("data is added in the documents")
}


const addPost = document.getElementById("addPost");
addPost && addPost.addEventListener("click", addData);