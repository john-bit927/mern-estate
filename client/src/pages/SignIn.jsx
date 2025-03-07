import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import OAuth from "../components/OAuth";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false); // ✅ New state to disable button
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
  
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:5175/api/auth/signin", { // ✅ Ensure backend port is correct
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      console.log("Signin response:", data); // 🔍 Debugging response
  
      if (!res.ok || !data.token) {
        throw new Error(data.message || "Failed to sign in");
      }
  
      dispatch(signInSuccess(data));
  
      // ✅ Store token correctly
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
  
      console.log("Token stored in localStorage:", data.token); // ✅ Debugging token storage
  
      setSuccess("Login successful! Redirecting...");
  
      setTimeout(() => {
        navigate("/");
      }, 2000);
  
    } catch (err) {
      console.error("Signin error:", err.message);
      setError(err.message);
    };
  };
  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          disabled={isDisabled} // ✅ Disable button conditionally
        >
          {isDisabled ? "Signing In..." : "Sign in"} 
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
    </div>
  );
}
