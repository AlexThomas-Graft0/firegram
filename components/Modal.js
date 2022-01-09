import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/ModalAtom";
import { CameraIcon } from "@heroicons/react/outline";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

function Modal() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef();
  const captionRef = useRef();

  const addImageToPost = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    //create post and add to firestore
    //get post id for new post
    //upload image to firebase storage
    //add image url to post
    //add post to user's posts
    //add post to feed
    //close modal

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, `posts/${docRef.id}`), {
          image: downloadURL,
        });
      }
    );

    setLoading(false);
    setSelectedFile(null);
    setOpen(false);
    return;
  };

  const handleClose = () => {
    setLoading(false);
    setOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 z-30 flex items-center justify-center transition-opacity duration-300 ${
        open ? "opacity-100 block" : "opacity-0 pointer-events-none"
      }`}
    >
      {open && (
        <>
          <div
            className={`fixed w-screen h-screen inset-0 z-40 flex items-center justify-center transition-opacity duration-300 bg-black cursor-pointer
            ${open ? "opacity-50" : " opacity-0 hidden"}
          `}
            title="Cancel"
            onClick={() => handleClose()}
          ></div>
          {/* <div className="flex items-end justify-center min-h-[800px] px-4 pt-4 pb-20 text-center sm:min-h-screen sm:block sm:p-0 rounded bg-white"> */}
          <div className="z-50 flex flex-col items-center justify-center p-4 bg-white rounded-lg min-h-[500px] min-w-[500px]">
            <div className="flex flex-col items-center justify-center">
              <div className="inline-block px-4 pt-5 pb-4 mx-auto text-center align-bottom transition-all transform bg-white rounded-lg overflow-hodden shadlow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                {/* <div className="flex items-center justify-center w-12 h-12 mx-auto transition duration-300 ease-out bg-red-100 rounded-full cursor-pointer hover:scale-125"> */}
                <div>
                  {selectedFile ? (
                    <img
                      src={selectedFile}
                      alt=""
                      className="object-contain w-full cursor-pointer"
                      onClick={() => setSelectedFile(null)}
                    />
                  ) : (
                    <div
                      onClick={() => filePickerRef.current.click()}
                      className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full cursor-pointer"
                      title="Upload a photo"
                    >
                      <CameraIcon className="w-8 h-8 text-red-500" />
                    </div>
                  )}
                </div>
                <div>
                  <input
                    ref={filePickerRef}
                    type="file"
                    hidden
                    onChange={addImageToPost}
                  />
                </div>
                <div>
                  <input
                    className="w-full h-12 p-2 border-none"
                    type="text"
                    ref={captionRef}
                    placeholder="Please enter a caption..."
                  />
                </div>
              </div>

              <button
                onClick={() => uploadPost()}
                className={`w-full px-4 py-2 mb-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 hover:disabled:bg-gray-300 hover:disabled:cursor-not-allowed`}
                disabled={!selectedFile}
                title={!selectedFile ? "Please select an image" : "Upload"}
              >
                Upload
              </button>

              <button
                title="Cancel"
                onClick={() => handleClose()}
                className="w-full px-4 py-2 mb-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Modal;
