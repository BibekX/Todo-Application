import { logoutNowThunk } from "../Redux/auth/actions";
import { CLEAR_TODOS } from "../Redux/todos/actions";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";

export default function LogoutButton() {
  let dispatch = useDispatch();
  return (
    <div>
      <Button
        color="info"
        className="logout-btn btn"
        onClick={() => {
          dispatch({ type: CLEAR_TODOS });
          dispatch(logoutNowThunk());
        }}
      >
        Log Out
      </Button>
    </div>
  );
}
