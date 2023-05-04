import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  async function registerUser(e) {
    e.preventDefault();

    try {
      await axios.post("/register", { name, email, password });
      alert("Registration Successful. Now you can login ;)");
    } catch (error) {
      alert("Registration failed. Please try again later :(");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-center">
      <div className="-mt-16">
        <h1 className="text-3xl text-center mb-4 font-semibold">Register</h1>

        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Mix"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button className="primary">register</button>
          <div className="flex items-center justify-center gap-2 mx-auto mt-2 text-sm">
            <p>You have already an account?</p>
            <Link to="/login" className="font-semibold underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
