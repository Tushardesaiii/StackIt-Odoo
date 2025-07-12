import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Menu, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ isLoggedIn = false, unreadCount = 0, isDark, onToggleTheme }) {
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
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
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
