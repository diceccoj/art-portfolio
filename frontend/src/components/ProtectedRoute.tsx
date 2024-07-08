import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

interface Props {
  children: JSX.Element | null;
}

function ProtectedRoute({ children }: Props) {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const auth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setIsAuthorized(false);
        return;
      }
      const decoded = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration && tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    };

    auth().catch(() => setIsAuthorized(false));
  }, [isAuthorized]);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return isAuthorized ? (
    children
  ) : (
    <div className="flex justify-center items-center w-screen mt-10">
      <Helmet>
        <style>{"body{@apply bg_poppy bg-fixed;}"}</style>
      </Helmet>
      <div className="grid text-center">
        <h1 className="text-3xl font-bold">You are not logged in</h1>
        <h2 className="mt-1 text-xl font-bold">
          Click a link below to redirect to a different page
        </h2>
        <button
          className="text-blue-500 underline mt-5"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Home
        </button>
        <button
          className="text-blue-500 underline"
          onClick={() => {
            window.location.href = "/login/";
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default ProtectedRoute;
