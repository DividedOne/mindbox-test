import { useState } from "react";
import { initialTodos } from "./todos";
import { FaChevronDown } from "react-icons/fa";
import { v4 as uuidV4 } from "uuid";

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t,
      ),
    );
  }

  function addTodo(task: string) {
    setTodos((prev) => [...prev, { id: uuidV4(), task, isCompleted: false }]);
    setInput("");
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.isCompleted));
  }

  const filteredTodos = todos.filter((t) => {
    switch (filter) {
      case "active":
        return !t.isCompleted;
      case "completed":
        return t.isCompleted;
      default:
        return true;
    }
  });

  return (
    <main className="flex flex-col items-center gap-4">
      <h1 className="text-8xl font-thin text-gray-400">todos</h1>
      <div className="todo-container relative flex flex-col divide-y-2 divide-gray-300/40 bg-gray-100 shadow-md">
        <div className="flex items-center gap-[6px] px-[10px] py-[6px] text-lg">
          <FaChevronDown color="#CACACA" size={20} />
          <input
            type="text"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            className="w-full border-none bg-transparent text-gray-700 placeholder:text-lg placeholder:italic placeholder:text-gray-300/80 focus-visible:ring-0"
          />
          <button
            disabled={input.length === 0}
            onClick={() => addTodo(input)}
            className={`${input.length === 0 ? "invisible" : "visible"} inline-flex w-fit whitespace-nowrap rounded-lg px-2 py-1 text-sm text-gray-500 hover:text-gray-700 hover:outline hover:outline-1 hover:outline-gray-300/70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-gray-300/70`}
          >
            Add new
          </button>
        </div>
        {filteredTodos.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-4 px-2 py-3 text-lg text-gray-700"
          >
            <input
              type="checkbox"
              checked={t.isCompleted}
              onChange={() => toggleTodo(t.id)}
              className="checkbox size-5 rounded-full border-gray-300/70 checked:border-gray-300/70"
            />
            <div
              className={`${t.isCompleted ? "text-gray-300/80 line-through" : ""}`}
            >
              {t.task}
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between gap-10 p-2 text-sm text-gray-500">
          <span>0 items left</span>
          <div className="flex items-center gap-2">
            <button
              className={`${filter === "all" ? "outline outline-1 outline-gray-300/70" : ""} inline-flex rounded-lg px-2 py-1 hover:outline hover:outline-1 hover:outline-gray-300/70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-gray-300/70`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`${filter === "active" ? "outline outline-1 outline-gray-300/70" : ""} inline-flex rounded-lg px-2 py-1 hover:outline hover:outline-1 hover:outline-gray-300/70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-gray-300/70`}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={`${filter === "completed" ? "outline outline-1 outline-gray-300/70" : ""} inline-flex rounded-lg px-2 py-1 hover:outline hover:outline-1 hover:outline-gray-300/70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-gray-300/70`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
          <button
            className="rounded-lg px-2 py-1 hover:outline hover:outline-1 hover:outline-gray-300/70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-gray-300/70"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
