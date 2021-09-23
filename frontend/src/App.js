import TodoList from "./Components/TodoList";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { Link, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";
import React from "react";
import LogoutButton from "./Components/LogoutButton";

const PurePrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  const Component = component;
  if (Component !== null) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authStore.auth,
  };
};

const PrivateRoute = connect(mapStateToProps)(PurePrivateRoute);

function PureApp(props) {
  console.log(props.isAuthenticated);
  return (
    <div>
      <Navbar id="navbar">
        <NavbarBrand>
          <img className="todo-logo" src="todo.png" alt="Todo-Logo" />
        </NavbarBrand>
        <Nav className="ms-auto">
          {props.isAuthenticated ? (
            <>
              <NavItem>
                <NavLink>
                  <LogoutButton />
                </NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <Button className="login-btn btn">
                  <Link className="login-text txt" to="/login">
                    Login
                  </Link>
                </Button>
              </NavItem>
              <NavItem>
                <Button className="btn mx-3" color="primary">
                  <Link to="/" className="text-white txt">
                    Sign Up
                  </Link>
                </Button>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
      <Route path="/" exact component={Signup} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/todo" component={TodoList} />
    </div>
  );
}
const App = connect(mapStateToProps)(PureApp);
export default App;

/*

Todos need to be attached to users
Make sure you can still edit, add and delete todos persisted into the backend database


*/
