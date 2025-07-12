import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Menu, User, Sun, Moon } from "lucide-react";

function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full bg-white/30 dark:bg-white/10 hover:bg-white/40 transition backdrop-blur-md shadow"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-300" />
      ) : (
        <Moon className="w-5 h-5 text-gray-900" />
      )}
    </button>
  );
}

export default function Navbar({
  isLoggedIn = false,
  unreadCount = 0,
  isDark,
  onToggleTheme,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Hide navbar on login/signup
  if (["/login", "/signup"].includes(location.pathname)) return null;

  // Auto-close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed w-full z-50 bg-white/30 dark:bg-black/30 border-b dark:border-white/10 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/questions" className="flex items-center space-x-2">
          <span className="font-extrabold text-2xl tracking-tight text-black dark:text-white">
            StackIt
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-black/80 dark:text-white/80">
          <Link to="/questions" className="hover:text-black dark:hover:text-white transition">Home</Link>
          <Link to="/questions" className="hover:text-black dark:hover:text-white transition">Explore Questions</Link>
          <Link to="/feed" className="hover:text-black dark:hover:text-white transition">Ask Question</Link>
           </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          {isLoggedIn ? (
            <>
              <div className="relative group">
                <Bell className="w-6 h-6 cursor-pointer text-black dark:text-white" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="relative group">
                <User className="w-7 h-7 cursor-pointer text-black dark:text-white" />
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-auto z-50">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">Profile</Link>
                  <Link to="/logout" className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">Logout</Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-black dark:text-white hover:underline">Login</Link>
              <Link
                to="/signup"
                className="bg-white dark:bg-white text-black px-4 py-2 rounded font-bold shadow hover:bg-white/90 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md bg-white/20 dark:bg-white/20 hover:bg-white/30 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6 text-black dark:text-white" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/70 dark:bg-zinc-900/70 border-t border-zinc-300 dark:border-zinc-700 flex flex-col items-center py-4 space-y-4 text-black dark:text-white text-sm font-medium">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/questions" className="hover:underline">Explore Questions</Link>
          <Link to="/feed" className="hover:underline">Ask Question</Link>
          <Link to="/tags" className="hover:underline">Tags</Link>
          {!isLoggedIn && (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/signup" className="bg-white text-black px-4 py-2 rounded font-bold shadow hover:bg-white/90 transition">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
