import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";

function LoginForm(props) {
  let [loginInfo, setLoginInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  console.log(loginInfo);
  let dispatch = useDispatch();

  let history = useHistory();

  let authenticated = useSelector((state) => state.authStore.auth);

  useEffect(() => {
    if (authenticated) {
      history.push("/todo");
    }
  }, [authenticated, history]);

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }
  return (
    <div className="login">
      <h1>{props.name}</h1>
      <Form>
        {props.signup && (
          <FormGroup className="formGroup">
            <Label for="username">Username</Label>
            <Input
              type="username"
              name="username"
              id="username"
              placeholder="Enter Username Here"
              value={loginInfo.username}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
        )}
        <FormGroup className="formGroup">
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email Here"
            value={loginInfo.email}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup className="formGroup">
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password Here"
            value={loginInfo.password}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <div className="d-grid">
          <Button
            variant="primary"
            className="submit-btn btn"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              loginInfo.email.length > 0 &&
                loginInfo.password.length > 0 &&
                dispatch(
                  props.signup
                    ? props.thunk(
                        loginInfo.username,
                        loginInfo.email,
                        loginInfo.password
                      )
                    : props.thunk(loginInfo.email, loginInfo.password)
                );
              props.signup &&
                loginInfo.username.length > 0 &&
                loginInfo.email.length > 0 &&
                loginInfo.password.length > 0 &&
                history.push("/login");
            }}
          >
            {props.name}
          </Button>
        </div>
      </Form>
      <Link className="link" to={props.link}>
        {props.linkText}
      </Link>
    </div>
  );
}

export default LoginForm;
