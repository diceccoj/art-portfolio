import { useEffect, useState } from "react";
import api from "../api";
import BodyThemeManager from "./subcomponents/BodyThemeManager";
import Post from "./subcomponents/Post";

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
          let list = [];
          for (const [id, object] of Object.entries(response.data)) {
            list.push(object);
          }
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
          let list = [];
          for (const [id, object] of Object.entries(response.data)) {
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
          for (const [id, object] of Object.entries(response.data)) {
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
  }, []);

  //for filtering posts by category
  const filterPosts = (category_id: number) => {
    let list = [];
    postList.forEach((object) => {
      console.log(object);
      if (object.category == category_id) {
        list.push(object);
      }
    });
    return list;
  };

  return (
    homeTheme != "" && (
      <BodyThemeManager theme={homeTheme}>
        <div className="horizontally-centered mt-40">
          <div className="responsive-grid  w-[80%]">
            <img
              src={avatar}
              className=" bg-white active:bg-slate-300 w-[90%] rounded-lg p-3 m-5 shadow-md  hover:scale-[102%] transition-transform "
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
        </div>
        <div className="horizontally-centered w-[100%] grid">
          {categoryList.map(
            (cat) =>
              filterPosts(cat.id).length > 0 && (
                <div key={cat.id} className="w-max h-max">
                  <h1 className="text-center mt-32 text-6xl">
                    {cat.category_name}
                  </h1>
                  <div className="horizontally-centered mt-10">
                    <div className="responsive-grid-3 w-[90%]">
                      {filterPosts(cat.id).map((post) => (
                        <div key={post.id}>
                          <Post info={post} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </BodyThemeManager>
    )
  );
};

export default Home;
