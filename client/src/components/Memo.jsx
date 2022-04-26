import React from "react";
import { useState } from "react";

export default function Todos({person}) {

  //states
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
 
  function onSubmit(event) {
    // disable event , disable submit
    event.preventDefault();

    i

    if (todo === "") {
      alert("invalid todo");
    } else {
      //copy array by value 
      let tempTodos = [...todos];
      tempTodos.push(todo);

      // set a new array to todos ====> to rerender
      setTodos(tempTodos);
      setTodo("");
    }
  }

  function onChangeInput(event) {
    let value = event.target.value;
    setTodo(value);
  }
  return (
    <div>
      <h1>Todos: {person.name}</h1>
  
      <form onSubmit={(event) =>  onSubmit(event)}>
        {todo}<br/>
        <textarea type="text" value={todo}  name="todo" onChange={(event) => onChangeInput(event)} ></textarea>
        <br />
        <input type="submit" value="Ajouter" className="border-3" ></input>
      </form>
    </div>
  );
}
