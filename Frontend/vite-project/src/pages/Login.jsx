import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Save token
      localStorage.setItem("accessToken", data.token);

      setMessage("✅ Login successful!");
      navigate("/feed");
    } catch (err) {
      setMessage("❌ Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${
      isDark
        ? "bg-gradient-to-br from-[#10151e] via-[#23262f] to-[#0a0d13]"
        : "bg-gradient-to-br from-[#f7fafc] via-[#e3e8ee] to-[#f1f3f7]"
    }`}>
      {/* Theme Button */}
      <button
        className="absolute top-8 right-8 z-20 p-2 rounded-full bg-white/30 dark:bg-white/10 hover:bg-white/40 transition backdrop-blur-md shadow-lg"
        onClick={() => setIsDark((d) => !d)}
        aria-label="Toggle light/dark theme"
      >
        {isDark ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-gray-900" />}
      </button>

      {/* Login Card */}
      <div className={`relative z-10 w-full max-w-md rounded-3xl shadow-2xl border ${
        isDark ? "bg-white/10 border-white/20" : "bg-black/10 border-black/10"
      } backdrop-blur-2xl px-8 py-12 flex flex-col items-center transition-all duration-300`}>

        <h2 className={`mt-8 mb-2 text-center text-3xl font-extrabold tracking-tight font-sans ${
          isDark ? "text-white" : "text-black"
        }`}>
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <input
            name="username"
            type="text"
            placeholder="Username (optional)"
            value={formData.username}
            onChange={handleChange}
            className="input-style"
          />
          <input
            name="email"
            type="email"
            placeholder="Email (optional)"
            value={formData.email}
            onChange={handleChange}
            className="input-style"
          />
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-style"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-lg transition shadow-xl focus:outline-none ${
              isDark ? "bg-white/80 text-black hover:bg-white" : "bg-black/80 text-white hover:bg-black"
            } ${loading ? "opacity-60 cursor-not-allowed" : ""} relative overflow-hidden group`}
          >
            <span className="relative z-10">
              {loading ? "Logging in..." : "Login"}
            </span>
          </button>
        </form>

        {message && (
          <div className={`mt-6 px-4 py-2 rounded-xl text-center text-base font-semibold ${
            message.startsWith("✅")
              ? isDark ? "bg-white/10 text-green-400" : "bg-black/5 text-green-700"
              : isDark ? "bg-white/10 text-red-400" : "bg-black/5 text-red-700"
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
