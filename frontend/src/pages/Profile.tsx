import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const logout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl shadow mt-10">
      <h1 className="text-3xl font-bold mb-6">
        Profile
      </h1>

      <div className="space-y-4">
        <p>
          <strong>Name:</strong>{" "}
          {user.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user.email}
        </p>
      </div>

      <button
        onClick={logout}
        className="
          mt-6
          bg-red-500
          text-white
          px-6
          py-3
          rounded-xl
        "
      >
        Logout
      </button>
    </div>
  );
}