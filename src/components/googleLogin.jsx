import { useState } from "react";
import { auth, provider, signInWithPopup, signOut } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function HomePage({ setUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log("User:", result.user);
      navigate("/leaflet-map");
    } catch (error) {
      console.error("Login Failed:", error);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Hospital Finder</h1>
      <p className="text-gray-600 mb-6">Find nearby hospitals quickly and easily.</p>
      <img src={"https://www.svgrepo.com/show/405826/hospital.svg"} alt="Hospital" className="w-64 h-40 rounded-lg shadow-md mb-6" />
      {auth.currentUser ? (
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition">
          Logout
        </button>
      ) : (
        <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition">
          {loading ? "Logging in..." : "Login with Google"}
        </button>
      )}
    </div>
  );
}
