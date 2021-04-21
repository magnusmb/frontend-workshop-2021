import React from "react";
import "./App.css";

type Todo = {
  text: string;
  done: boolean;
  todoId: number;
};

function App() {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  function addTodo(text: string) {
    const newTodo: Todo = {
      text: text,
      done: false,
      todoId: Date.now(),
    };

    setTodos([...todos, newTodo]);
  }

  function changeTodo(theTodo: Todo) {
    const newTodos = todos.map((todo) => {
      if (todo.todoId === theTodo.todoId) {
        return theTodo;
      } else {
        return todo;
      }
    });

    setTodos(newTodos);
  }

  function deleteDone() {
    setTodos(todos.filter((todo) => !todo.done));
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.todoId !== id));
  }

  return (
    <div>
      <TodoInput onAddTodo={addTodo} />
      <button onClick={() => deleteDone()}>Slett ferdige</button>
      <TodoList
        todos={todos}
        onChangeTodo={changeTodo}
        onDeleteTodo={deleteTodo}
      />
    </div>
  );
}

type TodoListProps = {
  todos: Todo[];
  onChangeTodo: (todo: Todo) => void;
  onDeleteTodo: (id: number) => void;
};

function TodoList(props: TodoListProps) {
  return (
    <ul>
      {props.todos.map((todo) => (
        <li key={todo.todoId}>
          <input
            type="checkbox"
            onChange={() => props.onChangeTodo({ ...todo, done: !todo.done })}
            checked={todo.done}
          />
          {todo.text}
          <button onClick={() => props.onDeleteTodo(todo.todoId)}>X</button>
        </li>
      ))}
    </ul>
  );
}

type TodoInputProps = {
  onAddTodo: (text: string) => void;
};

function TodoInput(props: TodoInputProps) {
  const [todo, setTodo] = React.useState("");

  function handleAddTodo() {
    props.onAddTodo(todo);
    setTodo("");
  }

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTodo();
          }
        }}
        value={todo}
        placeholder="Hva skal gjøres?"
      />
      <button onClick={() => handleAddTodo()}>Legg til</button>
    </div>
  );
}

function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="App">
      <button onClick={() => setCount(count - 1)}>-</button>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

export default App;
