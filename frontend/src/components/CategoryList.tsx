import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import BodyThemeManager from "./subcomponents/BodyThemeManager";
import { FaHome } from "react-icons/fa";
import RevealOnScroll from "./subcomponents/RevealOnScroll";
import Post from "./subcomponents/Post";
import Footer from "./subcomponents/Footer";

const CategoryList = () => {
  const { id } = useParams();

  const [category, setCategory] = useState("");
  const [postList, setPostList] = useState([]);
  const [errors, setErrors] = useState(false);

  const fetchInformation = async () => {
    const search = id != "null" ? id.toString() : "";
    api
      .get("/api/categories/unauth/?id=" + search)
      .then((response) => {
        if (response.status == 200 && response.data[0].category_name) {
          setCategory(response.data[0].category_name);
        }
      })
      .catch(() => setErrors(true));

    api
      .get("/api/posts/unauth/?category=" + search)
      .then((response) => {
        if (response.status == 200) {
          const list = [];
          for (const [_id, object] of Object.entries(response.data)) {
            list.push(object);
          }
          setPostList(list);
        }
      })
      .catch(() => setErrors(true));

    if (errors) alert("And error occurred. Please refresh page");
    setErrors(false);
  };
  useEffect(() => {
    fetchInformation();
  }, []);

  return (
    <BodyThemeManager theme="jungle">
      <button onClick={() => (window.location.href = "/")}>
        <FaHome className="scale-150 mt-7 ml-7" />
      </button>
      <RevealOnScroll className="horizontally-centered">
        <h1 className="flex text-6xl italic text-center hover:scale-[102%] transition-transform">
          {category}
        </h1>
      </RevealOnScroll>

      <RevealOnScroll className="horizontally-centered w-screen">
        {postList.length > 0 && (
          <div className="responsive-grid-3">
            {postList.map((post) => (
              <div className="w-full" key={post.id}>
                <Post
                  key={post.id}
                  info={post}
                  onClick={() => (window.location.href = "/post/" + post.id)}
                />
              </div>
            ))}
          </div>
        )}
      </RevealOnScroll>
      <Footer />
    </BodyThemeManager>
  );
};

export default CategoryList;
