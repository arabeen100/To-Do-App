type Filter = "all" | "active" | "completed";

interface Props {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export default function TodoFilter({ filter, setFilter }: Props) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => setFilter("all")}
        className={`px-3 py-1 rounded ${
          filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        All
      </button>
      <button
        onClick={() => setFilter("active")}
        className={`px-3 py-1 rounded ${
          filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Active
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`px-3 py-1 rounded ${
          filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Completed
      </button>
    </div>
  );
}
