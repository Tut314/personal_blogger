const KEY = "tm.tasks.v1";

export function loadTasks<T>() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as T[];
  } catch {
    console.warn("Failed to parse localStorage data");
    return [];
  }
}

export function saveTasks<T>(items: T[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    console.warn("Failed to save tasks to localStorage");
  }
}
