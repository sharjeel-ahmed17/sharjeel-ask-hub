const post = document.getElementById("post")
const commentsSection = document.getElementById("comments");
const logOut = document.getElementById("logOut")
const home = document.getElementById("home")

const postId = urlParams.get('id');


const postRef = doc(db, "posts", postId);


getDoc(postRef).then((doc) => {
  let list = ""
  if (doc.exists()) {
    const postData = doc.data();
    console.log(postData)

    list = `
        
    
          
        <div class=" w-[90%] mx-auto">
        <h1 class=" my-5  text-2xl">${postData.checkedRadio} </h1>
        <h2 class="text-4xl p-3">
            ${postData.blogInp}
        </h2>
    </div>
    <div class=" w-[90%] mx-auto mt-5 p-3">
        <p>
            ${postData.txtArea}
        </p>
    </div>
    <div class=" w-[90%] mx-auto mt-4">
        <p class="p-3">${postData.checkedRadio} about : ${postData.selectInp}</p>
        <img src=${postData.downloadURL}
            class="w-[100%] h-[400px] border rounded-lg" alt="">
        <p class="flex justify-between p-2">
            <span class="p-1 flex items-center justify-center bg-slate-50 rounded-xl ">
                Published By : ${postData.userName}
            </span>
            <span class="p-1 flex items-center justify-center bg-slate-50 rounded-xl ">
                date : ${postData.postDate}
            </span>
        </p>

    </div>

    // ** this is comments section


    <div class=" w-[90%] mx-auto mt-5 p-2 ">
    <p class=" w-[40%] justify-around flex">
        <label class=" " for="forInput">
            ADD your Thought
        </label>
        <label class="" for="forInput">
            Reply
        </label>
    </p>

    <input type="text" name="forInput" id="forInput"
        class="border w-[70%] mt-7 h-[70px] border-orange-300 rounded-lg p-2 text-xl outline-none shadow drop-shadow-lg">
        <br>
        <button id="sub"
            class="border w-[15%] h-10 rounded-lg border-orange-300 bg-gray-100 shadow drop-shadow-lg mt-3">
            Submit
        </button>
    </div>

    `
    const unsubscribeReplies = onSnapshot(postRef, (doc) => {
      const postData = doc.data();
      if (postData && postData.replies && postData.replies.length > 0) {
        renderReplies(postData.replies);
      }
    });

    const renderReplies = (replies) => {
      let replyList = "";
      replies.forEach((reply) => {
        // Check if reply.timestamp exists before calling toDate()
        console.log('Reply timestamp:', reply.timestamp);
        const timeDiff = reply.timestamp ? Math.floor((Date.now() - reply.timestamp.toDate()) / (1000 * 60)) : null;
        console.log('Time difference:', timeDiff);

        // Construct the HTML for the reply with updated time
        replyList += `
                <div class="w-[100%] h-[200px] mt-3">
                    <div class="w-[35%] h-[50%] flex justify-around items-center">
                        <div class="w-[80px] h-[80px] rounded-full shadow drop-shadow-lg">
                            <img class="rounded-full w-[100%] h-[80px]" src=${reply.photoURL} alt="">
                        </div>
                        <div class="w-[50%] h-[80px]">
                            <p class="text-lg">${reply.displayName}</p>
                            <p class="mt-1 text-xs">${timeDiff !== null ? (timeDiff === 0 ? 'Just now' : timeDiff + ' min ago') : ''}</p>
                        </div>
                    </div>
                    <div class="w-[70%] mt-2 pl-5">
                        <p class="mt-3">${reply.userReply}</p>
                        <p class="mt-2"><i class="fa-regular fa-heart"></i></p>
                    </div>
                </div>`;
      });
      commentsSection.innerHTML = replyList;
    }

  } else {
    console.log("No such document!");
  }
  post.innerHTML = list


  document.getElementById('sub').addEventListener('click', async () => {
    let userReply = document.getElementById('forInput').value;
    if (!userReply) {
      Toastify({
        text: "Please enter your reply",
        duration: 3000,
        gravity: "top",
        close: true
      }).showToast();
    } else {
      const user2 = auth.currentUser;

      console.log(user2)
      const timestamp = new Date();
      const reply = {
        userReply,
        displayName: user2.displayName,
        photoURL: user2.photoURL,
        timestamp: timestamp
      };

      try {
        const docSnap = await getDoc(postRef);
        if (docSnap.exists()) {
          const existingData = docSnap.data();
          let updatedReplies = existingData.replies || [];
          updatedReplies.push(reply);

          await setDoc(postRef, { replies: updatedReplies }, { merge: true });
          document.getElementById('forInput').value = "";
          console.log("Document updated successfully!");
        } else {
          console.log("Document does not exist");
        }
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    }
  });
}).catch((error) => {
  console.log("Error getting document:", error);
});

