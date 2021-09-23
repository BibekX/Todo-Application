import { signupUserThunk } from "../Redux/auth/actions";
import LoginForm from "./LoginForm";

function Signup() {
  return (
    <div className="landingPage">
      <LoginForm
        name="Sign Up"
        thunk={signupUserThunk}
        link="login"
        linkText="Already have an account? Sign in"
        signup={true}
      />
    </div>
  );
}

export default Signup;
