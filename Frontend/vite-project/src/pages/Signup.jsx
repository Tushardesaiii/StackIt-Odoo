import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
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
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

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
      await axios.post(
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
      await axios.post(
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
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${isDark ? "bg-gradient-to-br from-[#10151e] via-[#23262f] to-[#0a0d13]" : "bg-gradient-to-br from-[#f7fafc] via-[#e3e8ee] to-[#f1f3f7]"}`}>
      {/* Animated/blurred floating shapes for glassmorphism */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl ${isDark ? "bg-white/10" : "bg-black/10"} animate-pulse-slow`} />
        <div className={`absolute bottom-0 right-0 w-72 h-72 rounded-full blur-2xl ${isDark ? "bg-white/5" : "bg-black/5"} animate-pulse-slow`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-2xl ${isDark ? "bg-white/10" : "bg-black/10"} opacity-60`} />
      </div>

      {/* Theme toggle */}
      <button
        className="absolute top-8 right-8 z-20 p-2 rounded-full bg-white/30 dark:bg-white/10 hover:bg-white/40 transition backdrop-blur-md shadow-lg"
        onClick={() => setIsDark((d) => !d)}
        aria-label="Toggle light/dark theme"
      >
        {isDark ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-gray-900" />}
      </button>

      {/* Glassmorphic Signup Card */}
      <div className={`relative z-10 w-full max-w-md rounded-3xl shadow-2xl border
        ${isDark ? "bg-white/10 border-white/20" : "bg-black/10 border-black/10"}
        backdrop-blur-2xl px-8 py-12
        flex flex-col items-center
        transition-all duration-300
      `}>
        {/* Frosted glass logo circle */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className={`p-4 rounded-full shadow-2xl border-2
            ${isDark ? "bg-white/20 border-white/30" : "bg-black/10 border-black/20"}
            backdrop-blur-xl`}>
            <svg width={48} height={48} fill="none" viewBox="0 0 24 24" className={`${isDark ? "text-white" : "text-black"}`}>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <h2 className={`mt-8 mb-2 text-center text-3xl font-extrabold tracking-tight font-sans ${isDark ? "text-white" : "text-black"}`}>
          Create your StackIt account
        </h2>
        <p className={`mb-8 text-center text-base font-medium ${isDark ? "text-white/60" : "text-black/60"}`}>
          Join the community and start stacking knowledge!
        </p>
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div>
            <label htmlFor="fullName" className={`block mb-1 font-semibold ${isDark ? "text-white" : "text-black"}`}>
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
              className={`w-full px-4 py-2 rounded-xl font-medium shadow-inner transition focus:outline-none
                ${isDark
                  ? "bg-black/30 border border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-white/40"
                  : "bg-white border border-black/10 text-black placeholder-black/30 focus:ring-2 focus:ring-black/20"
                }`}
            />
          </div>
          <div>
            <label htmlFor="username" className={`block mb-1 font-semibold ${isDark ? "text-white" : "text-black"}`}>
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
              className={`w-full px-4 py-2 rounded-xl font-medium shadow-inner transition focus:outline-none
                ${isDark
                  ? "bg-black/30 border border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-white/40"
                  : "bg-white border border-black/10 text-black placeholder-black/30 focus:ring-2 focus:ring-black/20"
                }`}
            />
          </div>
          <div>
            <label htmlFor="email" className={`block mb-1 font-semibold ${isDark ? "text-white" : "text-black"}`}>
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
              className={`w-full px-4 py-2 rounded-xl font-medium shadow-inner transition focus:outline-none
                ${isDark
                  ? "bg-black/30 border border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-white/40"
                  : "bg-white border border-black/10 text-black placeholder-black/30 focus:ring-2 focus:ring-black/20"
                }`}
            />
          </div>
          <div>
            <label htmlFor="password" className={`block mb-1 font-semibold ${isDark ? "text-white" : "text-black"}`}>
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
              className={`w-full px-4 py-2 rounded-xl font-medium shadow-inner transition focus:outline-none
                ${isDark
                  ? "bg-black/30 border border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-white/40"
                  : "bg-white border border-black/10 text-black placeholder-black/30 focus:ring-2 focus:ring-black/20"
                }`}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-lg transition shadow-xl focus:outline-none
              ${isDark
                ? "bg-white/80 text-black hover:bg-white focus:ring-2 focus:ring-white/40"
                : "bg-black/80 text-white hover:bg-black focus:ring-2 focus:ring-black/20"
              }
              ${loading ? "opacity-60 cursor-not-allowed" : ""}
              relative overflow-hidden group
            `}
          >
            <span className="relative z-10">{loading ? "Registering..." : "Register"}</span>
            {/* Shine effect on hover */}
            <span className="absolute left-0 top-0 w-full h-full opacity-0 group-hover:opacity-100 transition pointer-events-none">
              <span className="absolute left-[-75%] top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent blur-lg animate-shine" />
            </span>
          </button>
        </form>
        <div className="flex items-center my-6 w-full">
          <div className="flex-grow border-t border-white/20 dark:border-white/20 border-black/10"></div>
          <span className="mx-3 text-white/60 dark:text-white/60 text-black/60 text-sm">or</span>
          <div className="flex-grow border-t border-white/20 dark:border-white/20 border-black/10"></div>
        </div>
        <button
          onClick={handleGuestLogin}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold transition shadow-md border focus:outline-none
            ${isDark
              ? "bg-white/20 text-white border-white/20 hover:bg-white/30 focus:ring-2 focus:ring-white/40"
              : "bg-black/10 text-black border-black/10 hover:bg-black/20 focus:ring-2 focus:ring-black/20"
            }
            ${loading ? "opacity-60 cursor-not-allowed" : ""}
          `}
        >
          {loading ? "Logging in..." : "Continue as Guest"}
        </button>
        {message && (
          <div
            className={`mt-6 px-4 py-2 rounded-xl text-center text-base font-semibold animate-fade-in
              ${message.startsWith("✅")
                ? (isDark ? "bg-white/10 text-green-400" : "bg-black/5 text-green-700")
                : (isDark ? "bg-white/10 text-red-400" : "bg-black/5 text-red-700")
              }
            `}
          >
            {message}
          </div>
        )}
      </div>
      {/* Animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-shine {
          animation: shine 1.2s linear;
        }
        @keyframes shine {
          from { left: -75%; }
          to { left: 125%; }
        }
        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(.4,0,.6,1) infinite;
        }
        @keyframes pulse {
          0%,100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Signup;
