import { useState } from "react";

interface Props {
  onAdd: (title: string, description?: string) => void;
}

export default function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        value={title}
        placeholder="Task title..."
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <input
        type="text"
        value={description}
        placeholder="Description (optional)..."
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2"
      >
        Add Task
      </button>
    </form>
  );
}
