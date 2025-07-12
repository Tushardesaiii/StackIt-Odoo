// src/pages/Question.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

const popularTags = [
  'javascript', 'react', 'typescript', 'nextjs', 'nodejs', 'python', 'css', 'html', 'database', 'api'
];

export default function Question() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/questions`);
        setQuestions(res.data.data || []);
      } catch (err) {
        setError("Failed to load questions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-black via-zinc-900 to-black text-white relative overflow-x-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-white/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[340px] h-[340px] rounded-full bg-white/5 blur-2xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-white/10 blur-2xl opacity-40" />
      </div>

      <header className="max-w-7xl mx-auto px-6 pt-20 pb-6 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-1">All Questions</h1>
            <p className="text-zinc-400 text-lg">
              {loading ? "Loading questions..." : `${questions.length} questions asked by the community`}
            </p>
          </div>
          <button 
            onClick={() => window.location.href = '/feed'}
            className="bg-white/90 text-black font-bold px-6 py-3 rounded-xl shadow-xl hover:bg-white transition duration-150"
          >
            + Ask Question
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-6 pb-16 relative z-10">
        <section className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {['All', 'Unanswered', 'Answered', 'Bounty'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full font-semibold text-base transition shadow
                  ${activeTab === tab
                    ? 'bg-white text-black shadow-lg'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Loader/Error */}
          {loading && <div className="text-zinc-400">Loading questions...</div>}
          {error && <div className="text-red-400">{error}</div>}

          <div className="space-y-7">
            {questions.map((q, idx) => (
              <Link
                to={`/questions/${q._id}`}
                key={q._id || idx}
                className="block"
              >
                <div className="flex flex-row bg-white/10 border border-white/20 rounded-2xl p-7 gap-7 items-start backdrop-blur-xl shadow-2xl transition hover:scale-[1.01] hover:shadow-2xl">
                  <div className="flex flex-col items-center gap-4 min-w-[60px]">
                    <div className="text-2xl font-extrabold">{(q.upvotes?.length || 0) - (q.downvotes?.length || 0)}</div>
                    <div className="bg-green-500/10 px-3 py-1 rounded-lg text-sm font-semibold text-green-400 border border-green-400/30">
                      {q.answers?.length || 0} answers
                    </div>
                    <div className="text-zinc-400 text-xs">{q.views || 0} views</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold mb-2">{q.title}</h2>
                    <p className="text-zinc-300 mb-3 line-clamp-3">{q.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {q.tags?.map(tag => (
                        <span key={tag} className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <div className="w-7 h-7 rounded-full bg-zinc-700" />
                      <span>Guest</span>
                      <span className="ml-4">{q.createdAt ? new Date(q.createdAt).toLocaleDateString() : "Just now"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {!loading && questions.length === 0 && (
              <div className="text-zinc-400 text-lg mt-12 text-center">No questions found.</div>
            )}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="w-full md:w-80 flex-shrink-0 flex flex-col gap-8">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
            <h3 className="text-lg font-bold mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map(tag => (
                <span key={tag} className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
            <h3 className="text-lg font-bold mb-4">Today's Activity</h3>
            <div className="flex flex-col gap-2 text-zinc-300">
              <div className="flex justify-between">
                <span>Questions asked:</span>
                <span className="font-semibold text-white">{questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Answers posted:</span>
                <span className="font-semibold text-green-400">–</span>
              </div>
              <div className="flex justify-between">
                <span>Active users:</span>
                <span className="font-semibold text-purple-400">–</span>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <style>{`
        .animate-pulse-slow {
          animation: pulse 7s cubic-bezier(.4,0,.6,1) infinite;
        }
        @keyframes pulse {
          0%,100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
