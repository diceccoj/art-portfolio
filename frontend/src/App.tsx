import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import "./App.css";
import Admin from "./components/Admin";
import Home from "./components/Home";
import PostDetails from "./components/PostDetails";
import CategoryList from "./components/CategoryList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/category/:id" element={<CategoryList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
