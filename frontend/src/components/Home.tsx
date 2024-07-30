import { useEffect, useState } from "react";
import api from "../api";
import BodyThemeManager from "./subcomponents/BodyThemeManager";
import Post from "./subcomponents/Post";
import RevealOnScroll from "./subcomponents/RevealOnScroll";
import Footer from "./subcomponents/Footer";
import { PostInterface, SettingsInterface } from "./Interfaces";

const Home = () => {
  const [homeTheme, setHomeTheme] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  //bulk calling all posts/categories as from my experience, reducing api calls vastly speeds up the program
  const [categoryList, setCategoryList] = useState([]);
  const [postList, setPostList] = useState([]);

  const fetchInformation = async () => {
    await api
      .get("/api/avatar/")
      .then((response) => {
        if (response.status == 200) setAvatar(response.data[0].avatar);
      })
      .catch((err) => alert(err + " Please refresh page."));

    //getting the category list
    api
      .get("/api/categories/unauth/")
      .then((response) => {
        if (response.status == 200) {
          const list = [];
          for (const [id, object] of Object.entries(response.data)) {
            list.push(object);
          }
          list.push({
            //adding a no category option
            id: null,
            category_name: "Other",
          });
          setCategoryList(list);
        } else {
          alert("Error occured. Please refresh page.");
        }
      })
      .catch((err) => alert(err));

    //getting the post list
    api
      .get("/api/posts/unauth/")
      .then((response) => {
        if (response.status == 200) {
          const list = [];
          const iter: [string, PostInterface][] = Object.entries(response.data);
          for (const [id, object] of iter) {
            list.push(object);
          }
          setPostList(list);
        } else {
          alert("Error occured. Please refresh page.");
        }
      })
      .catch((err) => alert(err));

    //getting the home theme settings
    await api
      .get("/api/settings/")
      .then((response) => {
        if (response.status == 200) {
          const iter: [string, SettingsInterface][] = Object.entries(
            response.data
          );
          for (const [id, object] of iter) {
            switch (object.name) {
              case "HOME_THEME":
                setHomeTheme(object.value);
                break;
              case "NAME":
                setName(object.value);
                break;
              case "EMAIL":
                setEmail(object.value);
                break;
              case "DESCRIPTION":
                setDescription(object.value);
                break;
            }
          }
        }
      })
      .catch(() => {
        localStorage.clear();
        fetchInformation();
      });
  };

  useEffect(() => {
    fetchInformation();
    window.scrollTo(0, 0);
  }, []);

  //for filtering posts by category
  const filterPosts = (category_id: number | null) => {
    const list = [];
    postList.forEach((object) => {
      if (object.category == category_id) {
        list.push(object);
      }
    });
    return list;
  };

  return homeTheme != "" ? (
    <BodyThemeManager theme={homeTheme}>
      <RevealOnScroll className="horizontally-centered mt-40">
        <div className="responsive-grid w-[80%]">
          <img
            src={avatar}
            className="origin-center scale-75 bg-white active:bg-slate-300 w-[90%] rounded-lg p-3 m-5 shadow-md  hover:scale-[78%] transition-transform "
          ></img>
          <div className="mt-10">
            <h1 className="text-8xl italic text-center hover:scale-[102%] transition-transform">
              {name}
            </h1>
            <p className="underline mt-7 text-center hover:scale-[102%] transition-transform">
              {email}
            </p>
            <p className="small-text-bg mt-2">{description}</p>
          </div>
        </div>
      </RevealOnScroll>
      <div className="horizontally-centered w-[100%] grid">
        {categoryList.map(
          (cat) =>
            filterPosts(cat.id).length > 0 && (
              <RevealOnScroll key={cat.id} className="w-max h-max">
                <h1 className="text-center mt-32 text-6xl">
                  {cat.category_name}
                </h1>
                <div className="horizontally-centered mt-10">
                  <div className="responsive-grid-3 w-[90%]">
                    {filterPosts(cat.id)
                      .slice(0, 3)
                      .map((post) => (
                        <div
                          className="justify-center items-center flex"
                          key={post.id}
                        >
                          <Post
                            info={post}
                            onClick={() =>
                              (window.location.href = "/#/post/" + post.id)
                            }
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="horizontally-centered">
                  <button
                    className="text-center w-[90%] min-h-[40px] bg-white shadow-md hover:scale-[102%] transition-all hover:shadow-lg active:bg-slate-300 text-slate-700 font-bold rounded-full"
                    onClick={() =>
                      (window.location.href = "/#/category/" + cat.id)
                    }
                  >
                    {"See more from " + cat.category_name}
                  </button>
                </div>
              </RevealOnScroll>
            )
        )}
      </div>
      <Footer />
    </BodyThemeManager>
  ) : (
    <BodyThemeManager theme="sunset" className="centered mt-40">
      <h1 className="text-center">{"Loading"}</h1>
    </BodyThemeManager>
  );
};

export default Home;
