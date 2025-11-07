import { Trash } from "lucide-react";

const TodoItem = ({ todo }) => {
  return (
    <div>
      <li className="p-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary checkbox-sm"
            />
            <span className="text-md font-bold">
              <span>{todo.text}</span>
            </span>
            <span
              className={`badge badge-soft badge-sm ${
                todo.Priorite === "Urgent"
                  ? "badge-error"
                  : todo.Priorite === "Moyenne"
                  ? "badge-warning"
                  : "badge-info"
              } `}
            >
              {todo.Priorite}
            </span>
          </div>
          <button className="btn btn-sm btn-error btn-soft">
            <Trash className="w-4 h-4"/>
          </button>
        </div>
      </li>
    </div>
  );
};

export default TodoItem;
