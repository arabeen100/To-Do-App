import { useEffect, useMemo, useState } from "react";
import  { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import type { Task } from "./types";
import { loadTasks, saveTasks } from "./utils/localStorsge";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import SearchBar from "./components/SearchBar";

type Filter = "all" | "active" | "completed";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (title: string, description?: string) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description?.trim(),
      completed: false,
      createdAt: now,
      updatedAt: now,
      order: tasks.length,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t))
    );
  };

  const editTask = (taskId: string, updates: { title?: string; description?: string }) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, title: updates.title ?? t.title, description: updates.description ?? t.description, updatedAt: new Date().toISOString() }
          : t
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const visibleTasks = useMemo(() => {
    const byFilter = tasks.filter((t) => {
      if (filter === "all") return true;
      if (filter === "active") return !t.completed;
      return t.completed;
    });

    if (!search.trim()) return byFilter;

    const q = search.toLowerCase();
    return byFilter.filter(
      (t) => t.title.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q))
    );
  }, [tasks, filter, search]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(tasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setTasks(
      reordered.map((t, index) => ({
        ...t,
        order: index,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-center">Simple To-Do App</h1>
        </header>

        <TodoForm onAdd={(title, description) => addTask(title, description)} />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-4">
          <SearchBar search={search} setSearch={setSearch} />
          <TodoFilter filter={filter} setFilter={(f) => setFilter(f)} />
        </div>

        <div className="mt-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <TodoList
              tasks={visibleTasks}
              onToggle={toggleTask}
              onEdit={editTask}
              onDelete={deleteTask}
              onClearCompleted={clearCompleted}
            />
          </DragDropContext>
        </div>

        <footer className="mt-4 text-sm text-gray-600 flex justify-between items-center">
          <div>{tasks.length} task(s)</div>
          <div>{tasks.filter((t) => !t.completed).length} remaining</div>
        </footer>
      </div>
    </div>
  );
}

