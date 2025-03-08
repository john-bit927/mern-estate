import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [signOutLoading, setSignOutLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

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
      () => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());

    setTimeout(async () => {
      try {
        if (!token) {
          dispatch(updateUserFailure("No token found"));
          return;
        }

        const res = await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`, {
          method: "POST",
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
      }
    }, 2000);
  };

  const handleDeleteUser = async () => {
    if (deleteLoading) return;
    setDeleteLoading(true);
    dispatch(deleteUserStart());

    try {
      if (!token) {
        dispatch(deleteUserFailure("No token found"));
        setDeleteLoading(false);
        return;
      }

      const res = await fetch(`http://localhost:3000/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      dispatch(deleteUserSuccess());
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (signOutLoading) return;
    setSignOutLoading(true);
    dispatch(signOutUserStart());

    try {
      const res = await fetch("http://localhost:3000/api/user/signout", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to sign out");
      }

      dispatch(signOutUserSuccess());
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    } finally {
      setSignOutLoading(false);
    }
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
        <Link className="bg-green-700 text-white text-center p-3 rounded-lg uppercase hover:opacity-95" to={"/create-listing"}>
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className={`text-red-700 cursor-pointer ${deleteLoading ? "opacity-50 pointer-events-none" : ""}`}
        >
          {deleteLoading ? "Deleting..." : "Delete Account"}
        </span>
        <span
          onClick={handleSignOut}
          className={`text-red-700 cursor-pointer ${signOutLoading ? "opacity-50 pointer-events-none" : ""}`}
        >
          {signOutLoading ? "Signing Out..." : "Sign Out"}
        </span>
      </div>

      <p className="text-red-700 mt-5">{error || ""}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? "User updated successfully" : ""}</p>
    </div>
  );
}
