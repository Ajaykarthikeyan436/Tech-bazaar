import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import auth from "../config/firebase";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    onAuthStateChanged(auth, (user) => {
      if (user) navigate("/"); // Redirect if already logged in
    });
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect after successful login
      toast.success("Login Succesfully")
    } catch (error) {
      setError("Invalid email or password!");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 via-violet-700 to-indigo-900">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-white/10 backdrop-blur-md shadow-lg rounded-lg text-white w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
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

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

        <p
          className="text-blue-300 cursor-pointer text-sm mb-4 hover:underline"
          onClick={() => navigate("/signup")}
        >
          New user? Register here
        </p>

        <button
          type="submit"
          className="w-full py-2 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-300 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

