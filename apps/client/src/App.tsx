import { useState } from "react";

type Task = { id: string; title: string; notes?: string };

const demo: Task[] = [
  { id: "task1", title: "study", notes: "" },
  { id: "task2", title: "landary", notes: "" },
  { id: "task3", title: "workout", notes: "" },
  { id: "task4", title: "phone call", notes: "" },
];

export default function App() {
  const [tasks] = useState<Task[]>(demo);

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
            <div>Task ID</div>
            <div>Title</div>
            <div>Actions</div>
          </div>

          <div className="divide-y">
            {tasks.map((t) => (
              <div
                key={t.id}
                className="grid grid-cols-[1fr,2fr,auto] items-center py-3 gap-3"
              >
                <div className="font-mono text-blue-700">{t.id}</div>
                <div>{t.title}</div>
                <div className="flex gap-2">
                  <button className="px-2 py-1 rounded-lg border">
                    ✏️ Edit
                  </button>
                  <button className="px-2 py-1 rounded-lg border">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <button className="px-3 py-2 rounded-lg bg-blue-600 text-white">
              ＋ New
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
