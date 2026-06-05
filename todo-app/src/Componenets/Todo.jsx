import React, { useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [editId, setEditId] = useState(null);

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") return;

    // Update Todo
    if (editId) {
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === editId ? { ...todo, text: inputText } : todo
        )
      );

      setEditId(null);
    } else {
      // Add Todo
      const newTodo = {
        id: Date.now(),
        text: inputText,
        isComplete: false,
      };

      setTodoList((prev) => [...prev, newTodo]);
    }

    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const Toggle = (id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, isComplete: !todo.isComplete }
          : todo
      )
    );
  };

  const editTodo = (id, text) => {
    inputRef.current.value = text;
    inputRef.current.focus();
    setEditId(id);
  };

  return (
    <div
      className="bg-white place-self-center w-11/12 max-w-md flex
      flex-col p-7 min-h-96 rounded-2xl"
    >
      <div className="flex items-center mt-7 gap-2">
        <img className="w-7" src={todo_icon} alt="Todo Icon" />
        <h1 className="text-3xl font-semibold">Todo List App</h1>
      </div>

      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your text"
        />

        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          {editId ? "Update" : "Add +"}
        </button>
      </div>

      <div>
        {todoList.map((item) => (
          <TodoItems
            key={item.id}
            id={item.id}
            text={item.text}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            Toggle={Toggle}
            editTodo={editTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default Todo;