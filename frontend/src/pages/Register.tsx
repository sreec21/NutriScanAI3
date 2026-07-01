import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
const navigate = useNavigate();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleRegister = async () => {
try {
await axios.post(
"http://127.0.0.1:5000/register",
{
name,
email,
password,
}
);

  alert("Registration Successful");
  navigate("/login");
} catch (error) {
  alert("Registration Failed");
}


};

return ( <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4"> <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl">

    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-green-600">
        🥗 NutriScan AI
      </h1>

      <p className="text-gray-500 mt-3">
        Smart Nutrition Tracking &
        AI-Powered Food Analysis
      </p>
    </div>

    <h2 className="text-2xl font-semibold mb-6 text-center">
      Create Account
    </h2>

    <input
      type="text"
      placeholder="Full Name"
      value={name}
      onChange={(e) =>
        setName(e.target.value)
      }
      className="w-full border p-3 rounded-xl mb-4"
    />

    <input
      type="email"
      placeholder="Email Address"
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
        setPassword(e.target.value)
      }
      className="w-full border p-3 rounded-xl mb-6"
    />

    <button
      onClick={handleRegister}
      className="
        w-full
        bg-green-600
        hover:bg-green-700
        text-white
        py-3
        rounded-xl
        font-semibold
        transition
      "
    >
      Create Account
    </button>

    <p className="text-center mt-6 text-gray-600">
      Already have an account?
    </p>

    <Link
      to="/login"
      className="
        block
        text-center
        mt-2
        text-green-600
        font-semibold
        hover:text-green-700
      "
    >
      Login
    </Link>
  </div>
</div>


);
}
