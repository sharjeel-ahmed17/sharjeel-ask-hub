import { db, setDoc, doc, auth, signOut, ref, uploadBytesResumable, getDownloadURL, storage } from "./firebase.js";

// ** upload image into firebase start
const handleFileUpload = (file) => {
    console.log("Selected file:", file);
};




const uploadImage = () => {

    const fileInput = document.getElementById("fileInput");

    if (fileInput.files.length === 0) {
        console.error("No file selected");
        return;
    }


    const file = fileInput.files[0];
    handleFileUpload(file);


    const fileValue = fileInput.files[0]
    console.log(fileValue);


    const metadata = {
        contentType: fileValue.type,
        name: fileValue.name,
        size: fileValue.size
    };


    const storageRef = ref(storage, `images/${fileValue.name}_${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);


    uploadTask.on('state_changed',
        (snapshot) => {

            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {

            switch (error.code) {
                case 'storage/unauthorized':

                    break;
                case 'storage/canceled':

                    break;



                case 'storage/unknown':

                    break;
            }
        },
        () => {

            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
        }
    );
}


let uploadImgBtn = document.getElementById("uploadImgBtn");
uploadImgBtn && uploadImgBtn.addEventListener("click", () => {
    uploadImage();
})
// ** upload image into firebase end

//  ?? add data into firebase

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
    window.location.href = "index.html";
});


// ?? add data into firebase end


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