import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

function TodoItems({ text, id, isComplete, deleteTodo, Toggle, editTodo }) {
  return (
    <div className="flex items-center my-3 gap-2">
      <div
        onClick={() => Toggle(id)}
        className="flex flex-1 items center cursor-pointer"
      >
        <img src={isComplete ? tick : not_tick} alt="" className="w-6" />
        <p
          onClick={() => editTodo(id, text)}
          className={`cursor-pointer text-slate-700 font ml-3 text-xl
             ${
            isComplete ? "" : ""
          }
          `}
        >
          {text}
        </p>
      </div>
      <img
        onClick={() => deleteTodo(id)}
        src={delete_icon}
        alt=""
        className="w-4 cursor-pointer"
      />
    </div>
  );
}

export default TodoItems;
