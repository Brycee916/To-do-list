import { useState, useEffect } from 'react';

const API_BASE = "http://localhost:3001";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setpopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
  }, []) //passes in an empty array that calls is when component loads

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error: ", err));
  }

  const completeTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/complete/" + id)//http gets the data from server and puts it into data
      .then(res => res.json()); //res is the object received from the server and then parses it into a json, also returns a promis

      setTodos(todos => todos.map(todo => {//for each todo in todos array
        if(todo._id === data._id) {//if the todo with matching id is found
          todo.complete = data.complete;//update the complete property of that todo with the data.complete value
        }
        return todo; //returns only that todo that changed values
      }));
  }

  const deleteTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, { 
      method: "DELETE"
    }).then(res => res.json());

    setTodos(todos => todos.filter(todo => todo._id !== data._id));//filter creates new arr with those todos that were not deleted on and sets it to todos
  }

  return (
    <div className="App">
      <h1>Welcome, Bryce</h1>
      <h4>Your Tasks</h4>

      <div className="todos">
        {todos.map(todo => ( //iterates over each itemin the todo. todo represents each item(variable)
        <div className={"todo" + (todo.complete ? " is-complete" : "")} key={todo._id} onClick={() => completeTodo(todo._id)}>
          <div className="checkbox"></div>

          <div className="text">{ todo.text }</div>

          <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default App;
