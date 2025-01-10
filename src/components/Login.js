import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwriteConfig";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await account.deleteSessions();
      console.log("Logged out previous sessions");
      const session = await account.createEmailPasswordSession(email, password);
      setIsAuthenticated(true);
      localStorage.setItem("jwt", session.$id);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg w-96 p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
