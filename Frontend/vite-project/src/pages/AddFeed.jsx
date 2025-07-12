import React, { useState } from "react";

const API_BASE = "http://localhost:8000/api/v1"; // Update if deployed

const QuestionIcon = () => (
  <div className="bg-white/10 rounded-xl w-12 h-12 flex items-center justify-center shadow-lg">
    <svg width={28} height={28} fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
      <path d="M12 17v-2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 7a3 3 0 0 1 3 3c0 1.5-2 2-2 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

export default function AddFeed() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t) && tags.length < 5) {
      setTags([...tags, t]);
      setTagInput("");
    }
  };

  const removeTag = (i) => setTags(tags.filter((_, idx) => idx !== i));

  const handleSubmit = async () => {
    if (title.trim().length < 10 || desc.trim().length < 30) {
      alert("Title must be at least 10 characters and description at least 30.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: desc.trim(),
          tags,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      alert("✅ Question posted successfully!");
      setTitle(""); setDesc(""); setTags([]); setTagInput("");
    } catch (err) {
      alert("❌ Error posting question: " + err.message);
    }
  };

  return (
    <div className="min-h-screen font-sans transition-colors duration-300 bg-gradient-to-br from-[#10151e] via-[#23262f] to-[#0a0d13] text-white relative overflow-hidden">
      {/* Animated glassy background shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[240px] h-[240px] rounded-full bg-white/5 blur-2xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-white/10 blur-2xl opacity-40" />
      </div>

      {/* Main Content, padded below the navbar */}
      <div className="relative z-10 w-full max-w-2xl mx-auto pt-28 pb-12 px-4">
        <div className="bg-white/10 border border-white/20 rounded-3xl shadow-2xl backdrop-blur-2xl px-10 py-12">
          <div className="flex items-center gap-4 mb-8">
            <QuestionIcon />
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-1 tracking-tight">Ask a Question</h1>
              <p className="text-white/70 text-lg font-medium">Post a technical question and get help</p>
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block mb-1 font-semibold">Title *</label>
            <input
              id="title"
              className="w-full rounded-lg px-4 py-3 outline-none border bg-white/10 focus:ring-2 focus:ring-white/40 focus:border-white/40 placeholder-white/40 transition border-white/20 text-white"
              placeholder="e.g., How to implement dark mode in React?"
              maxLength={150}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <div className="text-sm text-white/50 text-right">{title.length}/150</div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="desc" className="block mb-1 font-semibold">Description *</label>
            <textarea
              id="desc"
              rows={6}
              className="w-full rounded-lg px-4 py-3 outline-none border bg-white/10 focus:ring-2 focus:ring-white/40 focus:border-white/40 placeholder-white/40 transition border-white/20 text-white"
              placeholder="Explain your problem clearly, include expected vs actual result..."
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
            <p className="text-sm text-white/50">Min 30 characters. You can use Markdown formatting.</p>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label htmlFor="tags" className="block mb-1 font-semibold">Tags</label>
            <div className="flex mb-2">
              <input
                id="tags"
                className="flex-1 rounded-l-lg px-4 py-2 outline-none border bg-white/10 focus:ring-2 focus:ring-white/40 focus:border-white/40 placeholder-white/40 transition border-white/20 text-white"
                placeholder="Add a tag (e.g., react)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <button
                type="button"
                onClick={addTag}
                className="rounded-r-lg px-4 py-2 font-semibold bg-white/20 text-white hover:bg-white/30 transition"
              >
                +
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-blue-600/20 text-blue-200 rounded-full text-sm flex items-center gap-1">
                  {tag}
                  <button type="button" onClick={() => removeTag(i)} className="hover:text-red-400">&times;</button>
                </span>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSubmit}
              className="rounded-xl px-8 py-3 font-bold text-lg shadow-xl relative overflow-hidden group bg-white/80 text-black hover:bg-white focus:ring-2 focus:ring-white/40 transition"
            >
              <span className="relative z-10">{'Post Question'}</span>
              {/* Shine effect on hover */}
              <span className="absolute left-0 top-0 w-full h-full opacity-0 group-hover:opacity-100 transition pointer-events-none">
                <span className="absolute left-[-75%] top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent blur-lg animate-shine" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .animate-pulse-slow {
          animation: pulse 7s cubic-bezier(.4,0,.6,1) infinite;
        }
        @keyframes pulse {
          0%,100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        .animate-shine {
          animation: shine 1.2s linear;
        }
        @keyframes shine {
          from { left: -75%; }
          to { left: 125%; }
        }
      `}</style>
    </div>
  );
}
