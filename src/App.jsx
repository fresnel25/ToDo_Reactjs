import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Construction } from "lucide-react";

let Todo = (id, text, Priorite) => {
  return { id, text, Priorite };
};

function App() {
  const [input, setInput] = useState("");
  const [priorite, setPriorite] = useState("Moyenne");
  const savedTodos = localStorage.getItem("todos");
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState("Tous");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  let addTodo = () => {
    if (input.trim() == "") {
      return;
    }
    let newTodo = Todo(Date.now(), input, priorite);

    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    setInput("");
    setPriorite("Moyenne");

    console.log(newTodos);
  };

  let filteredTodos = [];

  if (filter === "Tous") {
    filteredTodos = todos;
  } else {
    filteredTodos = todos.filter((todo) => todo.Priorite === filter);
  }

  const urgentCount = todos.filter((t) => t.Priorite === "Urgent").length;
  const MoyenneCount = todos.filter((t) => t.Priorite === "Moyenne").length;
  const BasseCount = todos.filter((t) => t.Priorite === "Basse").length;
  const TotalCount = todos.length;

  let deleteTodo = (id) => {
    const newTodo = todos.filter((todo) => todo.id !== id);
    setTodos(newTodo);
  };

  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl">
        <div className="flex gap-4">
          <input
            type="text"
            className="input w-full"
            placeholder="Ajouter une tâche..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select
            className="select w-full"
            value={priorite}
            onChange={(e) => setPriorite(e.target.value)}
          >
            <option value="Urgent">Urgent</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <button onClick={addTodo} className="btn btn-primary">
            Ajouter
          </button>
        </div>
        <div className="space-y-2 flex-1 h-fit">
          <div className="flex flex-wrap gap-4">
            <button
              className={`btn btn-soft ${
                filter === "Tous" ? "btn-primary" : ""
              }`}
              onClick={() => setFilter("Tous")}
            >
              Tous ({TotalCount})
            </button>
            <button
              className={`btn btn-soft ${
                filter === "Urgent" ? "btn-primary" : ""
              }`}
              onClick={() => setFilter("Urgent")}
            >
              Urgent ({urgentCount})
            </button>
            <button
              className={`btn btn-soft ${
                filter === "Moyenne" ? "btn-primary" : ""
              }`}
              onClick={() => setFilter("Moyenne")}
            >
              Moyenne ({MoyenneCount})
            </button>
            <button
              className={`btn btn-soft ${
                filter === "Basse" ? "btn-primary" : ""
              }`}
              onClick={() => setFilter("Basse")}
            >
              Basse ({BasseCount})
            </button>
          </div>

          {filteredTodos.length > 0 ? (
            <div>
              <ul className="divide-y divide-primary/20">
                {filteredTodos.map((todo) => (
                  <div key={todo.id}>
                    <TodoItem
                      todo={todo}
                      onDelete={() => deleteTodo(todo.id)}
                    />
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col p-5">
              <div>
                <Construction
                  strokeWidth={1}
                  className="w-40 h-40 text-primary"
                />
                <p>Aucune tâche pour ce filtre</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
