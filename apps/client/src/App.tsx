import { useState } from "react";

type Task = { id: string; title: string; notes?: string };

const demo: Task[] = [
  { id: "task1", title: "study", notes: "" },
  { id: "task2", title: "landary", notes: "" },
];

const uid = () =>
  (crypto as any).randomUUID?.() ?? Math.random().toString(36).slice(2, 10);

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(demo);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Task Manager</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="rounded-2xl border bg-white p-4">
          <div className="grid grid-cols-[1fr,2fr,auto] font-semibold text-gray-700 pb-2 border-b">
            <div>Title</div>
            <div>Notes</div>
            <div>Actions</div>
          </div>

          <div className="divide-y">
            {tasks.map((t) => (
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
