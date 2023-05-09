import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  // Context
  const { setUser } = useContext(UserContext);

  //
  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      setUser(data);
      setRedirect(true);
    } catch (error) {
      alert("Login failed");
    }
  }

  // Redirect the user
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-center">
      <div className="-mt-16">
        <h1 className="text-3xl text-center mb-4 font-semibold">Login</h1>

        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">login</button>
          <div className="flex items-center justify-center gap-2 mx-auto mt-2 text-sm">
            <p>Don&apos;t have an account yet?</p>
            <Link to="/register" className="font-semibold underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
