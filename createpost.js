import { db, setDoc, doc, auth, signOut } from "./firebase.js";




const addData = async () => {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;


    // todo:  validation here 
    if (!title.trim() || !content.trim()) {
        console.error("title and content can not be blanks");
        return;

    }

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
    console.log("data is added in the documents");


}


const addPost = document.getElementById("addPost");
addPost && addPost.addEventListener("submit", (e) => {
    e.preventDefault();
    addData();
});
  
// ! user logout start
const logoutUser = () => {
    signOut(auth).then(() => {
        if (currentPage !== "index.html") {
            location.href = "index.html";
        }
    }).catch((error) => {
        console.log(error)
    });
}

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn && logoutBtn.addEventListener("click", () => {
    logoutUser();
})

// ! user logout end