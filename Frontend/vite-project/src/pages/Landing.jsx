import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  MessageCircle,
  Bell,
  Tag,
  UserPlus,
  ArrowUpRight,
  Users,
  Menu,
  User,
  Sun,
  Moon,
} from "lucide-react";

// Navbar is included here for full integration
function Navbar({ isLoggedIn = false, unreadCount = 0, isDark, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  if (["/login", "/signup"].includes(location.pathname)) return null;

  return (
    <nav className="fixed w-full z-50 bg-black/30 dark:bg-black/30 bg-white/30 dark:border-white/20 border-b backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-extrabold text-2xl tracking-tight select-none text-white dark:text-white text-black">
            StackIt
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-8 text-white/80 dark:text-white/80 text-black/80">
          <Link to="/" className="hover:text-white dark:hover:text-white hover:text-black transition">Home</Link>
          <Link to="/questions" className="hover:text-white dark:hover:text-white hover:text-black transition">Explore Questions</Link>
          <Link to="/ask" className="hover:text-white dark:hover:text-white hover:text-black transition">Ask Question</Link>
          <Link to="/tags" className="hover:text-white dark:hover:text-white hover:text-black transition">Tags</Link>
        </div>
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle light/dark theme"
            className="p-2 rounded-md bg-white/20 dark:bg-white/20 hover:bg-white/30 transition"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-900" />
            )}
          </button>
          {isLoggedIn ? (
            <>
              <div className="relative group">
                <Bell className="w-6 h-6 text-white dark:text-white text-black cursor-pointer" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-white dark:bg-white text-black text-xs rounded-full px-1">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="relative group">
                <User className="w-7 h-7 text-white dark:text-white text-black cursor-pointer" />
                <div className="absolute right-0 mt-2 w-36 bg-black/50 dark:bg-black/50 bg-white/80 dark:border-white/20 border border-white/20 rounded shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-auto">
                  <Link to="/profile" className="block px-4 py-2 text-white/80 dark:text-white/80 text-black/80 hover:text-white dark:hover:text-white hover:text-black">Profile</Link>
                  <Link to="/logout" className="block px-4 py-2 text-white/80 dark:text-white/80 text-black/80 hover:text-white dark:hover:text-white hover:text-black">Logout</Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="font-semibold text-white dark:text-white text-black hover:underline">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white dark:bg-white text-black px-4 py-2 rounded font-bold shadow hover:bg-white/90 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
        <button
          className="md:hidden p-2 rounded-md bg-white/20 dark:bg-white/20 hover:bg-white/30 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6 text-white dark:text-white text-black" />
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-black/50 dark:bg-black/50 bg-white/80 dark:border-white/20 border-t flex flex-col items-center py-4 space-y-4 text-white/80 dark:text-white/80 text-black/80">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-white dark:hover:text-white hover:text-black">
            Home
          </Link>
          <Link to="/questions" onClick={() => setMenuOpen(false)} className="hover:text-white dark:hover:text-white hover:text-black">
            Explore Questions
          </Link>
          <Link to="/ask" onClick={() => setMenuOpen(false)} className="hover:text-white dark:hover:text-white hover:text-black">
            Ask Question
          </Link>
          <Link to="/tags" onClick={() => setMenuOpen(false)} className="hover:text-white dark:hover:text-white hover:text-black">
            Tags
          </Link>
          {!isLoggedIn && (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-white dark:hover:text-white hover:text-black font-semibold">
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="bg-white dark:bg-white text-black px-4 py-2 rounded font-bold shadow"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

const features = [
  {
    icon: <BookOpen className="w-8 h-8 text-white dark:text-black" />,
    title: "Ask Questions with Rich Formatting",
    desc: "Markdown/Editor support for detailed questions.",
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-white dark:text-black" />,
    title: "Answer & Vote on Community Posts",
    desc: "Engage and upvote quality answers.",
  },
  {
    icon: <Bell className="w-8 h-8 text-white dark:text-black" />,
    title: "Get Real-Time Notifications",
    desc: "Stay updated instantly.",
  },
  {
    icon: <Tag className="w-8 h-8 text-white dark:text-black" />,
    title: "Tag-Based Categorization",
    desc: "Organize and filter by topics.",
  },
];

const steps = [
  {
    icon: <UserPlus className="w-10 h-10 text-white dark:text-black" />,
    title: "Sign Up",
    desc: "Create your free account in seconds.",
  },
  {
    icon: <ArrowUpRight className="w-10 h-10 text-white dark:text-black" />,
    title: "Ask or Answer",
    desc: "Post questions or share your expertise.",
  },
  {
    icon: <Users className="w-10 h-10 text-white dark:text-black" />,
    title: "Grow Your Knowledge",
    desc: "Learn from a vibrant developer community.",
  },
];

export default function Landing() {
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

  return (
    <div className={`min-h-screen font-sans ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <Navbar isDark={isDark} onToggleTheme={() => setIsDark((d) => !d)} />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-6 pt-32">
        {/* Glassmorphism background */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 m-4 rounded-3xl ${
            isDark
              ? "bg-white/5 backdrop-blur-lg border border-white/10"
              : "bg-black/5 backdrop-blur-lg border border-black/10"
          }`}
          style={{ zIndex: -1 }}
        />
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Ask. Answer. Learn. Together.
        </h1>
        <p className="mb-10 max-w-2xl text-lg opacity-80">
          Minimal yet powerful Q&amp;A platform for developers and learners.
        </p>
        <Link
          to="/questions"
          className={`inline-block px-8 py-4 rounded-xl font-bold shadow-lg transition ${
            isDark
              ? "bg-white text-black hover:bg-white/90"
              : "bg-black text-white hover:bg-black/90"
          }`}
        >
          Explore Questions
        </Link>
      </section>

      {/* Core Features */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Core Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className={`relative rounded-3xl p-8 text-center cursor-default select-none
                ${isDark ? "bg-white/10 border border-white/20" : "bg-black/10 border border-black/20"}
                backdrop-blur-md shadow-lg hover:scale-[1.05] transition-transform duration-200`}
            >
              <div className="mx-auto">{f.icon}</div>
              <h3 className="mt-5 font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 opacity-80">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className={`py-16 px-6 max-w-6xl mx-auto ${isDark ? "bg-white/5" : "bg-black/5"} rounded-3xl`}>
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-14">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center max-w-xs cursor-default select-none">
              {s.icon}
              <h3 className="mt-4 font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 opacity-80">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Start learning from the community today.</h2>
        <Link
          to="/signup"
          className={`inline-block px-10 py-4 rounded-xl font-bold shadow-lg transition ${
            isDark
              ? "bg-white text-black hover:bg-white/90"
              : "bg-black text-white hover:bg-black/90"
          }`}
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 text-center border-t ${
          isDark ? "border-white/20 text-white/60" : "border-black/20 text-black/60"
        }`}
      >
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <span>StackIt © 2025</span>
          <span>
            <Link to="/privacy" className="mx-2 hover:underline">
              Privacy
            </Link>
            <Link to="/terms" className="mx-2 hover:underline">
              Terms
            </Link>
            <Link to="/contact" className="mx-2 hover:underline">
              Contact
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
