import { useState } from "react";

function createTodo(id, text, Priorite) {
  return { id, text, Priorite };
}

function App() {
  const [input, setInput] = useState("")
   const [priorite, setPriorite] = useState("Moyenne")
  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl">
        <div className="flex gap-4">
          <input
            type="text"
            className="input w-full"
            placeholder="Ajouter une tâche..."
            value={input}
            onChange={(e)=> setInput(e.target.value)}
          />
          <select className="select w-full" value={priorite} onChange={(e)=> setPriorite(e.target.value)}>
            <option value="Urgente">Urgente</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <button className="btn btn-primary">Ajouter</button>
        </div>
      </div>
    </div>
  );
}

export default App;
