import { db, setDoc, doc, auth, signOut, ref, uploadBytesResumable, getDownloadURL, storage } from "./firebase.js";

// ** upload image into firebase start
const handleFileUpload = (file) => {
    console.log("Selected file:", file);
};
// const uploadImage = () => {

//     const fileInput = document.getElementById("fileInput");

//     if (fileInput.files.length === 0) {
//         console.error("No file selected");
//         return;
//     }


//     const file = fileInput.files[0];
//     handleFileUpload(file);


//     const fileValue = fileInput.files[0]
//     console.log(fileValue);


//     const metadata = {
//         contentType: fileValue.type,
//         name: fileValue.name,
//         size: fileValue.size
//     };


//     const storageRef = ref(storage, `images/${fileValue.name}_${Date.now()}`);
//     const uploadTask = uploadBytesResumable(storageRef, file, metadata);


//     uploadTask.on('state_changed',
//         (snapshot) => {

//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log('Upload is ' + progress + '% done');
//             switch (snapshot.state) {
//                 case 'paused':
//                     console.log('Upload is paused');
//                     break;
//                 case 'running':
//                     console.log('Upload is running');
//                     break;
//             }
//         },
//         (error) => {

//             switch (error.code) {
//                 case 'storage/unauthorized':

//                     break;
//                 case 'storage/canceled':

//                     break;



//                 case 'storage/unknown':

//                     break;
//             }
//         },


//         async () => {
//             try {
//                 const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

//             }
//             catch {

//             }
//         }
//     );
// }
// let uploadImgBtn = document.getElementById("uploadImgBtn");
// uploadImgBtn && uploadImgBtn.addEventListener("click", () => {
//     uploadImage();
// })
// ** upload image into firebase end

//  ?? add data into firebase

const addData = async () => {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const statusElement = document.querySelector('input[name="status"]:checked');
    const status = statusElement ? statusElement.value : null;
    const typeElement = document.querySelector('input[name="type"]:checked');
    const type = typeElement ? typeElement.value : null;


    const catagoryElement = document.getElementById("catagory");
    const catagory = catagoryElement ? catagoryElement.value : null;
    // const catagory = document.getElementById("catagory").value;
    // console.log("status  = ", status, "type = ", type, "catagory = ", catagory);

    // todo:  validation here 
    // if (!title.trim() || !catagory.trim() || type === "" || !status || !content.trim()) {
    //     alert("Please fill out all fields.");
    //     return;
    // }




    // image function start here


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


        async () => {
            try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                const timestamp = new Date().getTime();
                const postDate = new Date().toString().slice(4, 15);


                const id = new Date().getTime();
                const payload = {
                    id,
                    title,
                    content,
                    status,
                    type,
                    catagory,
                    downloadURL,
                    userName: auth.currentUser.displayName
                }
                try {
                    await setDoc(doc(db, "posts", `${id}`), payload);

                    document.getElementById("title").value = "";
                    document.getElementById("content").value = "";
                    console.log("data is added in the documents");

                }
                catch (e) {
                    console.error("error adding in documents", e);

                }

            }



            catch (ereor) {
                console.log("Error getting download URL", ereor);
            }
        }
    );
}
// image function end here

const addPost = document.getElementById("addPost");
addPost && addPost.addEventListener("submit", (e) => {
    e.preventDefault();
    addData();
    // window.location.href = "index.html";
});


// ?? add data into firebase end

// todo image preview start
document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.classList.add('preview-image');
        document.getElementById('imagePreview').innerHTML = '';
        document.getElementById('imagePreview').appendChild(img);
    };

    reader.readAsDataURL(file);
});

// todo image preview end


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