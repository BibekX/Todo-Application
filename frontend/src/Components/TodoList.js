import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Form, Row, Col } from "reactstrap";
import {
  EditTodoThunk,
  DeleteTodoThunk,
  GetTodosThunk,
  AddTodoThunk,
} from "../Redux/todos/actions";

const TodoList = () => {
  const [title, setTitle] = useState("");

  const [editedTitle, setEditedTitle] = useState("");
  const todosFromRedux = useSelector((state) => state.todoStore.todos);

  const dispatch = useDispatch();

  const submitTodo = (e) => {
    e.preventDefault();
    const newTodo = { title };
    title.length > 0 && dispatch(AddTodoThunk(newTodo));
    setTitle("");
  };

  const editTodoTitle = (e, id) => {
    e.preventDefault();
    editedTitle.length > 0 &&
      dispatch(EditTodoThunk({ title: editedTitle, id: id }));
    setTitle("");
  };

  const deleteTodo = (e, i) => {
    dispatch(DeleteTodoThunk(i));
  };

  useEffect(() => {
    console.log("starting?");
    dispatch(GetTodosThunk());
    console.log("component re-rendered");
  }, [dispatch]);

  return (
    <div className="container-fluid todo-container">
      <h1 className="heading">TO-DO LIST</h1>
      <Form onSubmit={submitTodo}>
        <Row className="justify-content-center mb-5">
          <Col lg={6} md={8} xs={10} className="column">
            <Input
              value={title}
              onChange={(e) => {
                let newValue = e.target.value;
                setTitle(newValue);
              }}
              type="text"
              name="text"
              placeholder="Enter your Todo"
            />
          </Col>

          <Col xs={1}>
            <Button className="add-btn" type="submit" color="primary">
              <img className="add-btn-img" src="add.png" alt="add" />
            </Button>
          </Col>
        </Row>
      </Form>
      <div>
        {todosFromRedux.map((todo) => (
          <div key={todo.id}>
            <Row className="mb-3 justify-content-center">
              <Col lg={6} md={8} xs={10} className="column">
                <Input
                  className="todo-item"
                  id={todo.id}
                  type="text"
                  defaultValue={todo.title}
                  onChange={(e) => {
                    setEditedTitle(e.currentTarget.value);
                  }}
                  onBlur={(e) => {
                    console.log(e.currentTarget.id);
                    console.log(e.currentTarget.value);
                    console.log("TODO IN BLUR", todo);
                    editTodoTitle(e, todo.id);
                  }}
                />
              </Col>
              <Col xs={1}>
                <Button color="danger" onClick={(e) => deleteTodo(e, todo.id)}>
                  <img
                    className="delete-btn-img"
                    src="delete.png"
                    alt="delete"
                  />
                </Button>
              </Col>
            </Row>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;

/**
 * inputs didnt re-render due to the fact that we were using index and not id of the todo for the key, as the key remained the same React didnt think it needed to updated. Therefore do not use index positions for keys, but identifiers that will always be assigned to the object
 */
