import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure } from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const [error] = useState(false);
  const { currentUser, loading } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const token = localStorage.getItem("token"); // ✅ Get token from localStorage

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    dispatch(updateUserStart()); // Start loading state
  
    // ⏳ Set loading to last at least 2 seconds
    setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. User is not authenticated.");
          dispatch(updateUserFailure("No token found"));
          return;
        }
  
        const res = await fetch(`http://localhost:5175/api/user/update/${currentUser._id}`, {
          method: "POSTR",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
  
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to update profile");
        }
  
        dispatch(updateUserSuccess(data.data));
        setUpdateSuccess(true);
      } catch (error) {
        dispatch(updateUserFailure(error.message));
        console.error("Profile update error:", error.message);
      }
    }, 2000); // ⏳ Wait for 2 seconds before continuing
  };
  

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-52 w-25 object-cover cursor-pointer self-center mt-4"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-500">Error uploading image (must be less than 2MB)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-green-500">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-500">Upload complete</span>
          ) : (
            ""
          )}
        </p>
        <input type="text" placeholder="Username" defaultValue={currentUser.username} id="username" className="border p-3 rounded-lg" onChange={handleChange} />
        <input type="email" placeholder="Email" defaultValue={currentUser.email} id="email" className="border p-3 rounded-lg" onChange={handleChange} />
        <input type="password" placeholder="Password" id="password" className="border p-3 rounded-lg" onChange={handleChange} />
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Updating..." : "Update"}
        </button>
      </form> 

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? "User updated successfully!" : ""}</p>
    </div>
  );
}
