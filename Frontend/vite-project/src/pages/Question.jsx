import React from 'react';

const questions = [
  {
    votes: 42,
    answers: 8,
    views: 1250,
    title: 'How to implement authentication in Next.js 14 with App Router?',
    description:
      "I'm trying to set up authentication in my Next.js 14 application using the new App Router. What's the best approach for handling user sessions and protecting routes?",
    tags: ['nextjs', 'authentication', 'app-router', 'react'],
    user: 'Sarah Chen',
    userRep: 2840,
    time: '2 hours ago',
  },
  {
    votes: 38,
    answers: null,
    views: null,
    title: 'Best practices for state management in large React applications',
    description:
      'Our React application is growing and state management is becoming complex. Should we use Redux, Zustand, or stick with Context API?',
    tags: ['react', 'state-management', 'redux', 'zustand'],
    user: null,
    userRep: null,
    time: null,
  },
];

const tags = [
  'javascript', 'react', 'typescript', 'nextjs', 'nodejs', 'python', 'css', 'html', 'database', 'api'
];

export default function Question() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black font-sans text-white">
      <header className="p-8">
        <h1 className="text-4xl font-bold tracking-tight">All Questions</h1>
        <p className="mt-2 text-zinc-400">5 questions asked by the community</p>
      </header>
      <main className="flex flex-row gap-8 px-8">
        {/* Left: Questions List */}
        <section className="flex-1 space-y-6">
          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-4">
            <input
              className="w-full rounded-lg px-4 py-2 bg-glassLight text-white placeholder-zinc-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/20 backdrop-blur-md"
              placeholder="Search questions..."
            />
            <button className="bg-glass px-4 py-2 rounded-lg border border-zinc-700 text-white hover:bg-zinc-800 transition">
              Newest
            </button>
            <button className="bg-glass px-4 py-2 rounded-lg border border-zinc-700 text-white hover:bg-zinc-800 transition">
              All...
            </button>
          </div>
          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            {['All', 'Unanswered', 'Answered', 'Bounty'].map(tab => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full font-medium ${
                  tab === 'All'
                    ? 'bg-white text-black shadow'
                    : 'bg-glass text-white hover:bg-zinc-800'
                } transition`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Questions */}
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="flex flex-row bg-glass border border-zinc-700 rounded-2xl p-6 gap-6 items-start backdrop-blur-lg shadow-xl"
            >
              {/* Stats */}
              <div className="flex flex-col items-center gap-4 min-w-[60px]">
                <div className="text-2xl font-bold">{q.votes}</div>
                <div className="bg-zinc-800/80 px-3 py-1 rounded-lg text-sm font-semibold text-green-400">
                  {q.answers !== null ? `${q.answers} answers` : ''}
                </div>
                <div className="text-zinc-400 text-xs">{q.views !== null ? `${q.views} views` : ''}</div>
              </div>
              {/* Content */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{q.title}</h2>
                <p className="text-zinc-300 mb-3">{q.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {q.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-medium border border-zinc-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {q.user && (
                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <div className="w-7 h-7 rounded-full bg-zinc-700" />
                    <span>{q.user}</span>
                    <span className="bg-zinc-700 px-2 py-0.5 rounded text-xs ml-2">{q.userRep}</span>
                    <span className="ml-4">{q.time}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>
        {/* Right: Sidebar */}
        <aside className="w-72 flex flex-col gap-6">
          {/* Popular Tags */}
          <div className="bg-glass border border-zinc-700 rounded-2xl p-6 backdrop-blur-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-medium border border-zinc-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {/* Today's Activity */}
          <div className="bg-glass border border-zinc-700 rounded-2xl p-6 backdrop-blur-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Today's Activity</h3>
            <div className="flex flex-col gap-2 text-zinc-300">
              <div className="flex justify-between">
                <span>Questions asked:</span>
                <span className="font-semibold text-white">24</span>
              </div>
              <div className="flex justify-between">
                <span>Answers posted:</span>
                <span className="font-semibold text-green-400">67</span>
              </div>
              <div className="flex justify-between">
                <span>Active users:</span>
                <span className="font-semibold text-purple-400">156</span>
              </div>
            </div>
          </div>
        </aside>
      </main>
      {/* Ask Question Button */}
      <button className="fixed top-8 right-8 bg-white text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-zinc-200 transition">
        + Ask Question
      </button>
    </div>
  );
}
