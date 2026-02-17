"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const ADMIN_PASSWORD = "tagishli2026";

export default function AdminChatsPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin_auth") === "true") {
      setAuthed(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      sessionStorage.setItem("admin_auth", "true");
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center" dir="rtl">
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 w-full max-w-sm">
          <h1 className="text-white text-xl font-bold mb-6 text-center">🔐 ניהול שיחות</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="סיסמת מנהל"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-medium py-3 rounded-lg transition"
          >
            כניסה
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white" dir="rtl">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">📋 לוג שיחות</h1>
          <button
            onClick={() => { sessionStorage.removeItem("admin_auth"); setAuthed(false); }}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            התנתק
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat list */}
          <div className="lg:col-span-1">
            <ChatList
              selectedSession={selectedSession}
              onSelect={setSelectedSession}
            />
          </div>

          {/* Chat detail */}
          <div className="lg:col-span-2">
            {selectedSession ? (
              <ChatDetail sessionId={selectedSession} />
            ) : (
              <div className="bg-gray-900 rounded-2xl border border-gray-800 p-12 text-center">
                <div className="text-4xl mb-3">💬</div>
                <p className="text-gray-400">בחר שיחה מהרשימה</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatList({ selectedSession, onSelect }: { selectedSession: string | null; onSelect: (id: string) => void }) {
  const logs = useQuery(api.chatLogs.list, { limit: 100 });

  if (!logs) {
    return (
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-800 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
        <p className="text-gray-400">אין שיחות עדיין</p>
      </div>
    );
  }

  const stats = {
    total: logs.length,
    converted: logs.filter((l) => l.converted).length,
  };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 text-center">
          <div className="text-2xl font-bold text-amber-400">{stats.total}</div>
          <div className="text-xs text-gray-400">שיחות</div>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{stats.converted}</div>
          <div className="text-xs text-gray-400">המרות</div>
        </div>
      </div>

      {/* List */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="max-h-[70vh] overflow-y-auto divide-y divide-gray-800">
          {logs.map((log) => (
            <button
              key={log._id}
              onClick={() => onSelect(log.sessionId)}
              className={`w-full text-right p-4 hover:bg-gray-800/50 transition ${
                selectedSession === log.sessionId ? "bg-gray-800 border-r-2 border-amber-500" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  log.converted
                    ? "bg-green-500/20 text-green-400"
                    : "bg-gray-700 text-gray-400"
                }`}>
                  {log.converted ? "✅ הומר" : "⏳ ממתין"}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(log.createdAt).toLocaleDateString("he-IL")}
                </span>
              </div>
              <div className="text-sm text-gray-300 truncate">
                {log.messages[0]?.content.slice(0, 60) || "שיחה ריקה"}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">
                  {log.messages.length} הודעות
                </span>
                {log.userEmail && (
                  <span className="text-xs text-amber-400">{log.userEmail}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatDetail({ sessionId }: { sessionId: string }) {
  const log = useQuery(api.chatLogs.getBySession, { sessionId });
  const exportText = useQuery(api.chatLogs.exportAsText, { sessionId });

  if (!log) {
    return (
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
        <div className="animate-pulse h-40 bg-gray-800 rounded-lg" />
      </div>
    );
  }

  const handleExport = () => {
    if (!exportText) return;
    const blob = new Blob([exportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-${sessionId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">שיחה</h2>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              log.converted ? "bg-green-500/20 text-green-400" : "bg-gray-700 text-gray-400"
            }`}>
              {log.converted ? "הומר" : "לא הומר"}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(log.createdAt).toLocaleString("he-IL")} · {log.messages.length} הודעות
            {log.userEmail && ` · ${log.userEmail}`}
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition"
        >
          📥 ייצוא
        </button>
      </div>

      {/* Messages */}
      <div className="p-4 max-h-[65vh] overflow-y-auto space-y-3">
        {log.messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-gray-800 text-white"
                : "bg-amber-900/30 border border-amber-800/30 text-amber-100"
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium">
                  {msg.role === "user" ? "👤 משתמש" : "🤖 עוזר"}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(msg.timestamp).toLocaleTimeString("he-IL")}
                </span>
              </div>
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
