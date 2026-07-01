import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = async () => {
    try {
      const response =
        await axios.post(
          "http://127.0.0.1:5000/login",
          {
            email,
            password,
          }
        );

      if (
        response.data.success
      ) {
        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.user
          )
        );

        alert("Login Successful");

        navigate("/");
      } else {
        alert(
          response.data.message
        );
      }
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow mt-10">
      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="w-full border p-3 rounded-xl mb-4"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        className="w-full border p-3 rounded-xl mb-4"
      />

      <button
  onClick={login}
  className="
    w-full
    bg-green-500
    hover:bg-green-600
    text-white
    py-3
    rounded-xl
    font-semibold
  "
>
  Login
</button>

<p className="text-center mt-4 text-gray-600">
  New to NutriScan AI?
</p>

<Link
  to="/register"
  className="
    block
    text-center
    mt-2
    text-green-600
    font-semibold
    hover:text-green-700
  "
>
  Create an Account
</Link>
      
    </div>
    
  );
}