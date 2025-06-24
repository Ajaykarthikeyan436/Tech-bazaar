import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import auth from "../config/firebase";
import { toast } from 'react-toastify'

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // React Router hook for navigation

  useEffect(() => {
    window.scrollTo(0, 0);
    onAuthStateChanged(auth, (user) => {
      if (user) navigate("/home"); // Redirect if already logged in
    });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login"); // Redirect to login after successful signup
      toast.success("Registered Successfully")
    } catch (error) {
      setError("Failed to create an account. Try again!");
      toast.error("The User is already exists !")
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-700 via-violet-700 to-indigo-900">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white/10 backdrop-blur-md shadow-lg rounded-lg text-white w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        
        <div className="mb-4">
          <label className="block text-white">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 w-full bg-white/20 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-white outline-none"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-white">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full bg-white/20 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-white outline-none"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-white">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full bg-white/20 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-white outline-none"
          />
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>

        <p
          className="text-blue-300 cursor-pointer text-sm mb-4 hover:underline"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login here
        </p>

        <button
          type="submit"
          className="w-full py-2 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-300 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Signup;

