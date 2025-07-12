import React, { useState } from "react";

// SVG ICONS (all grayscale)
const QuestionIcon = () => (
  <div className="bg-white/10 rounded-xl w-12 h-12 flex items-center justify-center">
    <svg width={28} height={28} fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/>
      <path d="M12 17v-2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 7a3 3 0 0 1 3 3c0 1.5-2 2-2 4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  </div>
);

const TipsIcon = () => (
  <div className="bg-white/10 rounded-lg w-8 h-8 flex items-center justify-center">
    <svg width={20} height={20} fill="none" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="8" stroke="#fff" strokeWidth="2"/>
    </svg>
  </div>
);

const DescIcon = () => (
  <div className="bg-white/10 rounded-lg w-8 h-8 flex items-center justify-center">
    <svg width={20} height={20} fill="none" viewBox="0 0 20 20">
      <rect x="4" y="4" width="12" height="12" rx="2" stroke="#fff" strokeWidth="2"/>
    </svg>
  </div>
);

const GuidelinesIcon = () => (
  <div className="bg-white/10 rounded-lg w-8 h-8 flex items-center justify-center">
    <svg width={20} height={20} fill="none" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="8" stroke="#fff" strokeWidth="2"/>
      <rect x="7" y="7" width="6" height="6" rx="2" stroke="#fff" strokeWidth="2"/>
    </svg>
  </div>
);

export default function Feed() {
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
  const removeTag = (idx) => setTags(tags.filter((_, i) => i !== idx));

  return (
    <div className="bg-black min-h-screen font-sans text-white">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-4">
        <div className="flex items-center gap-4">
          <QuestionIcon />
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-1 tracking-tight">Ask a Question</h1>
            <p className="text-white/70 text-lg font-medium">Share your knowledge with the community and get expert help</p>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-4 pb-10">
        {/* Main Question Box */}
        <div className="flex-1 min-w-0">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl px-10 py-10 min-h-[700px] flex flex-col">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Question Details</h2>
              <div className="text-white/70 text-base mb-6">
                Provide clear information to help others understand your problem and provide better answers.
              </div>
              {/* Title */}
              <div className="mb-6">
                <label className="block text-base font-semibold mb-2" htmlFor="title">Title *</label>
                <input
                  id="title"
                  className="w-full bg-white/10 border border-white/10 rounded-lg text-white px-4 py-3 text-base outline-none focus:border-white/30 placeholder-white/40 transition"
                  placeholder="e.g., How to implement authentication in Next.js?"
                  maxLength={150}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <span className="text-white/50 text-sm mt-1 block">Be specific and imagine you’re asking a question to another person</span>
                <div className="text-right text-white/40 text-sm">{title.length}/150</div>
              </div>
              {/* Description */}
              <div className="mb-6">
                <label className="block text-base font-semibold mb-2" htmlFor="desc">Description *</label>
                <div className="flex rounded-lg overflow-hidden mb-2">
                  <button className="flex-1 bg-white/20 text-white font-semibold py-2 text-base">Write</button>
                  <button className="flex-1 bg-white/10 text-white/60 font-semibold py-2 text-base hover:bg-white/20 transition">Preview</button>
                </div>
                <textarea
                  id="desc"
                  className="w-full bg-white/10 border border-white/10 rounded-lg text-white px-4 py-3 text-base outline-none focus:border-white/30 placeholder-white/40 transition"
                  rows={6}
                  placeholder="Describe your problem in detail. Include what you’ve tried, what you expected to happen, and what actually happened."
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                />
                <div className="text-white/50 text-sm mt-1">
                  Minimum 30 characters. You can use Markdown for formatting.
                </div>
              </div>
              {/* Tags */}
              <div className="mb-8">
                <label className="block text-base font-semibold mb-2" htmlFor="tags">Tags *</label>
                <div className="flex">
                  <input
                    id="tags"
                    className="flex-1 bg-white/10 border border-white/10 rounded-l-lg text-white px-4 py-3 text-base outline-none focus:border-white/30 placeholder-white/40 transition"
                    placeholder="Add a tag (e.g., react, javascript)"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <button
                    className="bg-white/10 border border-white/10 rounded-r-lg px-5 text-xl text-white hover:bg-white/20 transition"
                    type="button"
                    onClick={addTag}
                  >+</button>
                </div>
                <span className="text-white/40 text-sm mt-1 block">
                  Add up to 5 tags to describe what your question is about. ({tags.length}/5)
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, i) => (
                    <span key={i} className="bg-white/10 text-white/80 rounded px-3 py-1 text-sm flex items-center gap-1">
                      {tag}
                      <span className="cursor-pointer text-lg" onClick={() => removeTag(i)}>&times;</span>
                    </span>
                  ))}
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex gap-4 mt-auto">
                <button className="bg-white/20 hover:bg-white/30 text-white font-bold rounded-lg px-8 py-3 flex items-center gap-2 shadow transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" viewBox="0 0 16 16">
                    <path d="M2 8h12M8 2v12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Post Question
                </button>
                <button className="bg-white/10 text-white/70 border border-white/10 rounded-lg px-8 py-3 flex items-center gap-2 shadow hover:bg-white/20 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" viewBox="0 0 16 16">
                    <rect x="3" y="3" width="10" height="10" rx="2" stroke="#fff" strokeWidth="1.5" opacity="0.5"/>
                  </svg>
                  Save Draft
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-[340px] flex-shrink-0 flex flex-col gap-8">
          {/* Writing Tips */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl px-6 py-6">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
              <TipsIcon />
              Writing Tips
            </h3>
            <div className="bg-white/10 rounded-xl p-4 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <svg width={18} height={18} fill="none" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8" stroke="#fff" strokeWidth="1.5" opacity="0.5"/>
                </svg>
                <b className="text-white/80">Good titles are:</b>
              </div>
              <ul className="ml-2 list-disc list-inside text-white/80">
                <li>Specific and descriptive</li>
                <li>Clear and concise</li>
                <li>Free of spelling errors</li>
                <li>Include relevant keywords</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DescIcon />
                <b className="text-white/80">Good descriptions include:</b>
              </div>
              <ul className="ml-2 list-disc list-inside text-white/80">
                <li>What you’re trying to achieve</li>
                <li>What you’ve already tried</li>
                <li>Relevant code examples</li>
                <li>Error messages (if any)</li>
                <li>Expected vs actual results</li>
              </ul>
            </div>
          </div>
          {/* Popular Tags */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl px-6 py-6">
            <h3 className="text-xl font-bold mb-3">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {["javascript", "react", "typescript", "nextjs", "nodejs", "css", "html", "python"].map(tag => (
                <span key={tag} className="bg-white/10 text-white/80 font-medium rounded px-3 py-1 text-sm">{tag}</span>
              ))}
            </div>
          </div>
          {/* Community Guidelines */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl px-6 py-6">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
              <GuidelinesIcon />
              Community Guidelines
            </h3>
            <ul className="ml-2 list-disc list-inside text-white/80">
              <li>Search for existing questions before posting</li>
              <li>Be respectful and constructive in all interactions</li>
              <li>Provide minimal, reproducible examples when possible</li>
              <li>Accept helpful answers to help future visitors</li>
            </ul>
            <a href="#" className="text-white/70 text-base mt-3 block hover:underline">Read full guidelines &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  );
}
