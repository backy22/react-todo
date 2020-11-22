import React from "react";
import "./App.css";
import { Container, Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Todo({ todo, index, toggleComplete, removeTodo, editTodo, updateTodo }) {
  const [value, setValue] = React.useState(todo.text);

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    updateTodo(value, index);
  }

  return (
    <div className="item" style={{ color: todo.isCompleted ? "gray" : "" }}>
      <div className="item-text">
        <Form.Check type="checkbox" onChange={() => toggleComplete(index)}/>
        { todo.editing ? 
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                className="input"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
            </Form>
          : <div>{todo.text}</div>
        }
      </div>
      <div>
        <Button variant="info" onClick={() => editTodo(index)}>Edit</Button>
        <Button variant="danger" onClick={() => removeTodo(index)}>x</Button>
      </div>
    </div>
  );
}

function TodoNewForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </Form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "Learn about React",
      isCompleted: false,
      editing: false,
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false,
      editing: false,
    },
    {
      text: "Build really cool todo app",
      isCompleted: false,
      editing: false,
    }
  ]);

  const [num, setNum] = React.useState(3)

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
    const leng = newTodos.filter((item) => !item.isCompleted).length
    setNum(leng)
  };

  const toggleComplete = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    const leng = newTodos.filter((item) => !item.isCompleted).length
    setNum(leng)
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    const leng = newTodos.filter((item) => !item.isCompleted).length
    setNum(leng)
  };

  const editTodo = index => {
    const newTodos = [...todos];
    newTodos[index].editing = true;
    setTodos(newTodos);
  };

  const updateTodo = (text, index) => {
    const newTodos = [...todos];
    newTodos[index].text = text;
    newTodos[index].editing = false;
    setTodos(newTodos);
  };

  return (
    <Container>
      <h3>To do List</h3>
      <small>{num} tasks remain</small>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
            editTodo={editTodo}
            updateTodo={updateTodo}
          />
        ))}
        <TodoNewForm addTodo={addTodo} />
      </div>
    </Container>
  );
}

export default App;