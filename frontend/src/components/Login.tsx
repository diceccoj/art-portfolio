import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./subcomponents/LoadingIndicator";
import BodyThemeManager from "./subcomponents/BodyThemeManager";

//The login page that will redirect the user if login is successful

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    //navigates to the /api/token/ route defined in the backend (login page)
    try {
      const res = await api.post("/api/token/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      await api.get("/api/csrf/").then((response) => {
        if (response.status == 200)
          sessionStorage.setItem("csrftoken", response.data.csrfToken);
        else alert("An error occured. Please refresh page.");
      });
      navigate("/admin"); //navigate to admin on successful login
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BodyThemeManager theme="poppy" className="centered">
      <div className="grid text-center mt-80">
        <form onSubmit={handleSubmit} className="grid">
          <h1>{"Login"}</h1>
          <input
            className="mt-10 rounded-md pl-1 text-black"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            className="mt-2 rounded-md pl-1 text-black"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {loading && <LoadingIndicator />}
          <button
            className="mt-2 bg-emerald-400 rounded-lg focus:bg-emerald-500 hover:bg-emerald-300"
            type="submit"
          >
            {"Login"}
          </button>
        </form>
      </div>
    </BodyThemeManager>
  );
}

export default Login;
