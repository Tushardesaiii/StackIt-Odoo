import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        formData,
        { withCredentials: true }
      );
      setMessage("✅ Login successful!");
      setLoading(false);
      // Redirect or update app state as needed
    } catch (err) {
      setMessage(
        "❌ Login failed: " + (err.response?.data?.message || err.message)
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 border border-gray-200 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="bg-green-600 p-3 rounded-full shadow-lg">
            {/* Replace with your logo if you wish */}
            <svg
              width={36}
              height={36}
              fill="none"
              viewBox="0 0 24 24"
              className="text-white"
            >
              <path
                d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <h2 className="mt-8 mb-2 text-center text-3xl font-extrabold text-gray-800 tracking-tight">
          Welcome Back
        </h2>
        <p className="mb-6 text-center text-gray-500 text-sm">
          Log in to your StackIt account
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-gray-700 font-medium"
            >
              Username <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              name="username"
              id="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-gray-700 font-medium"
            >
              Email <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-bold text-lg text-white bg-green-600 hover:bg-green-700 transition shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {message && (
          <div
            className={`mt-6 px-4 py-2 rounded-lg text-center text-sm font-medium ${
              message.startsWith("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            } animate-fade-in`}
          >
            {message}
          </div>
        )}
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.4s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
