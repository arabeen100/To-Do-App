import {Droppable, Draggable } from "@hello-pangea/dnd";

import type { Task } from "../types";

interface Props {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (id: string, updates: { title?: string; description?: string }) => void;
  onDelete: (id: string) => void;
  onClearCompleted: () => void;
}

export default function TodoList({
  tasks,
  onToggle,
  onEdit,
  onDelete,
  onClearCompleted,
}: Props) {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks yet</p>;
  }

  return (
    <div>
      <Droppable droppableId="task-list">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-2"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(dragProvided) => (
                  <li
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    className="flex justify-between items-center border rounded p-3 bg-white shadow-sm"
                  >
                    <div>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggle(task.id)}
                        className="mr-2"
                      />
                      <span
                        className={`${
                          task.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {task.title}
                      </span>
                      {task.description && (
                        <p className="text-sm text-gray-600">
                          {task.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          onEdit(task.id, {
                            title: prompt("Edit title", task.title) || task.title,
                            description:
                              prompt(
                                "Edit description",
                                task.description || ""
                              ) || task.description,
                          })
                        }
                        className="px-2 py-1 bg-yellow-400 rounded text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(task.id)}
                        className="px-2 py-1 bg-red-500 rounded text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      <div className="flex justify-end mt-3">
        <button
          onClick={onClearCompleted}
          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
}
