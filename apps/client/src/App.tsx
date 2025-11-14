import { useState, useEffect, useMemo } from "react";
import { loadTasks, saveTasks } from "./lib/storage";

type Task = { id: string; title: string; notes?: string };

const demo: Task[] = [
  { id: "task1", title: "study", notes: "" },
  { id: "task2", title: "landary", notes: "" },
];

const uid = () =>
  (crypto as any).randomUUID?.() ?? Math.random().toString(36).slice(2, 10);

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = loadTasks<Task>();
    return stored !== null ? stored : demo;
  });

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.notes ?? "").toLowerCase().includes(q)
    );
  }, [tasks, query]);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function addTask() {
    const title = prompt("Task title");
    if (!title || !title.trim()) return;
    const notes = prompt("Notes(optional)") ?? "";

    setTasks((prev) => [
      ...prev,
      { id: uid(), title: title.trim(), notes: notes.trim() },
    ]);
  }

  function editTask(target: Task) {
    const nextTitle = prompt("Edit title", target.title);
    if (nextTitle === null) return;

    const nextNotes = prompt("Edit notes(optional)", target.notes ?? "");
    if (nextNotes === null) return;

    const t = nextTitle.trim();
    const n = nextNotes.trim();

    if (!t) return;

    setTasks((prev) =>
      prev.map((item) =>
        item.id === target.id ? { ...item, title: t, notes: n } : item
      )
    );
  }

  function deleteTask(target: Task) {
    if (!confirm(`Delete task "${target.title}"?`)) return;

    setTasks((prev) => prev.filter((item) => item.id !== target.id));
  }

  function clearAll() {
    if (!confirm("Clear all tasks?")) return;
    setTasks([]);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <h1 className="text-2xl font-bold flex-1">Task Manager</h1>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title or notes..."
            className="w-64 rounded-lg border px-3 py-2 outline-none"
          />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="rounded-2xl border bg-white p-4">
          <div className="grid grid-cols-[1fr,2fr,auto] font-semibold text-gray-700 pb-2 border-b">
            <div>Title</div>
            <div>Notes</div>
            <div>Actions</div>
          </div>
          <div className="text-sm text-gray-500 mb-2">
            Showing {filtered.length} / {tasks.length} tasks
          </div>

          <div className="divide-y">
            {filtered.length === 0 && (
              <div className="py-6 text-center text-gray-500">
                No tasks match your search.
              </div>
            )}

            {filtered.map((t) => (
              <div
                key={t.id}
                className="grid grid-cols-[1fr,2fr,auto] items-center py-3 gap-3"
              >
                <div className="font-mono">{t.title}</div>
                <div className="text-gray-600">{t.notes ?? ""}</div>
                <div className="flex gap-2">
                  <button
                    className="px-2 py-1 rounded-lg border"
                    onClick={() => editTask(t)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="px-2 py-1 rounded-lg border"
                    onClick={() => deleteTask(t)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={clearAll}
              className="px-3 py-2 rounded-lg border text-red-600 hover:bg-red-50"
            >
              Clear All
            </button>
            <button
              onClick={addTask}
              className="px-3 py-2 rounded-lg bg-blue-600"
            >
              ＋ New
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
