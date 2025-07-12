import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
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
        "http://localhost:8000/api/v1/auth/register",
        formData,
        { withCredentials: true }
      );
      setMessage("✅ Registered successfully!");
      setLoading(false);
    } catch (err) {
      setMessage(
        "❌ Registration failed: " +
          (err.response?.data?.message || err.message)
      );
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/guest-login",
        {},
        { withCredentials: true }
      );
      setMessage("✅ Guest login successful!");
      setLoading(false);
    } catch (err) {
      setMessage(
        "❌ Guest login failed: " + (err.response?.data?.message || err.message)
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 border border-gray-200 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="bg-blue-600 p-3 rounded-full shadow-lg">
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
          Create your StackIt account
        </h2>
        <p className="mb-6 text-center text-gray-500 text-sm">
          Join the community and start stacking knowledge!
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="fullName"
              className="block mb-1 text-gray-700 font-medium"
            >
              Full Name
            </label>
            <input
              name="fullName"
              id="fullName"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-gray-700 font-medium"
            >
              Username
            </label>
            <input
              name="username"
              id="username"
              type="text"
              autoComplete="username"
              placeholder="janedoe123"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-gray-700 font-medium"
            >
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
              autoComplete="email"
              placeholder="jane@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
              autoComplete="new-password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-bold text-lg text-white bg-blue-600 hover:bg-blue-700 transition shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-3 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        <button
          onClick={handleGuestLogin}
          disabled={loading}
          className={`w-full py-2.5 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Continue as Guest"}
        </button>
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

export default Signup;
