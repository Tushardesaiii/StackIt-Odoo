import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

export default function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/questions/${id}`);
        setQuestion(res.data.data);
      } catch (err) {
        setError("Failed to load question details.");
        console.error(err);
      }
    };
    fetchQuestion();
  }, [id]);

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="bg-white/10 border border-red-400/40 text-red-400 rounded-2xl px-8 py-6 shadow-xl font-semibold text-xl">
          {error}
        </div>
      </div>
    );

  if (!question)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="bg-white/10 border border-white/20 text-white/80 rounded-2xl px-8 py-6 shadow-xl font-semibold text-xl">
          Loading...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white relative overflow-x-hidden">
      {/* Glassy animated background shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[240px] h-[240px] rounded-full bg-white/5 blur-2xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-white/10 blur-2xl opacity-40" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white/10 border border-white/20 rounded-3xl p-10 backdrop-blur-2xl shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">{question.title}</h1>
          <p className="text-zinc-200 mb-6 text-lg">{question.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {question.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-white/20 border border-white/30 px-4 py-1 rounded-full text-xs font-semibold tracking-wide text-white/90 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="text-sm text-zinc-400 mb-2">
            Asked on:{" "}
            {question.createdAt
              ? new Date(question.createdAt).toLocaleString()
              : "Unknown"}
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <span>Views: {question.views || 0}</span>
            <span>Answers: {question.answers?.length || 0}</span>
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
      `}</style>
    </div>
  );
}
