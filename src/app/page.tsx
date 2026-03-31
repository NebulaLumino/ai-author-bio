"use client";
import { useState } from "react";
export default function Home() {
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ authorName: "", genre: "", previousWorks: "", credentials: "", tone: "" });
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); setOutput(""); try { const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); const data = await res.json(); setOutput(data.result || "No output."); } catch { setOutput("Error."); } finally { setLoading(false); } };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { setForm({ ...form, [e.target.name]: e.target.value }); };
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center" style={{ color: "hsl(300deg, 70%, 70%)" }}>👤 Author Bio Generator</h1>
        <p className="text-gray-400 text-center mb-8">Create a compelling author bio for book bios, press kits, and social media</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Author Name</label>
            <input type="text" name="authorName" value={form.authorName} onChange={handleChange} required placeholder="Your name"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-400 placeholder-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Genre</label>
            <input type="text" name="genre" value={form.genre} onChange={handleChange} required placeholder="e.g., Fantasy Romance, Crime Thriller, Memoir"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-400 placeholder-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Previous Works (optional)</label>
            <textarea name="previousWorks" value={form.previousWorks} onChange={handleChange} rows={2} placeholder="Published books, awards, notable publications..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-400 placeholder-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Credentials / Background</label>
            <textarea name="credentials" value={form.credentials} onChange={handleChange} rows={2} placeholder="Relevant background - degrees, jobs, life experience that informs your writing..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-400 placeholder-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Bio Tone</label>
            <select name="tone" value={form.tone} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-400">
              <option value="">Select tone</option>
              <option value="Professional & Formal">Professional & Formal</option>
              <option value="Warm & Approachable">Warm & Approachable</option>
              <option value="Witty & Humorous">Witty & Humorous</option>
              <option value="Mysterious">Mysterious</option>
              <option value="Inspirational">Inspirational</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: "hsl(300deg, 70%, 60%)" }}>
            {loading ? "Writing Bio..." : "Generate Author Bio"}
          </button>
        </form>
        {output && <div className="mt-8 bg-gray-800/80 border border-gray-700 rounded-xl p-6"><h2 className="text-lg font-semibold mb-3" style={{ color: "hsl(300deg, 70%, 70%)" }}>Author Bio</h2><pre className="whitespace-pre-wrap text-gray-300 text-sm leading-relaxed font-mono">{output}</pre></div>}
      </div>
    </main>
  );
}
