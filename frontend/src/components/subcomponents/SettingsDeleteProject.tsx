import { useState, useEffect } from "react";
import Post from "./Post";
import api from "../../api";
import LoadingIndicator from "./LoadingIndicator";
import CSRFToken from "./CSRFToken";
import { CategoryInterface, PostInterface } from "../Interfaces";

//The general post selection. Click to edit contents
const PostPanel = () => {
  //for post list
  const [posts, setPosts] = useState([]);

  //for editing post
  const [canSubmit, setCanSubmit] = useState(true);
  //the steps for delete. Will delete when counter hits 3
  const [deleteCounter, setDeleteCounter] = useState(1);
  const [categoryList, setCategoryList] = useState<(string | number)[][]>([]);

  const [_id, _setId] = useState(-1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectTheme, setProjectTheme] = useState("");
  const [frontImage, setFrontImage] = useState("");
  const [category, setCategory] = useState(-1);

  //for post list
  const fetchInformation = async () => {
    api
      .get("/api/posts/")
      .then((response) => {
        if (response.status == 200) setPosts(response.data);
        else throw new Error("");
      })
      .catch(() => {
        alert("Error loading. Please refresh page");
      });
  };

  useEffect(() => {
    fetchInformation();
  }, []);

  //for post editing
  useEffect(() => {
    if (title != "" && description != "") {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [title, description]);

  const fetchCategoryList = () => {
    api
      .get("/api/categories/")
      .then((response) => {
        if (response.status == 200) {
          const list = [];
          const iter: [string, CategoryInterface][] = Object.entries(
            response.data
          );
          for (const [id, object] of iter) {
            list.push([object.id, object.category_name]);
          }
          setCategoryList(list);
        } else {
          alert("Error occured. Please refresh page.");
        }
      })
      .catch((err) => alert(err));
  };
  useEffect(() => {
    fetchCategoryList();
  }, []);

  const formSubmit = async (e) => {
    e.preventDefault();
    const dict = {
      title: title,
      description: description,
      colour_scheme: projectTheme,
      category: category,
    };

    api
      .put("/api/posts/modify/" + _id + "/", dict)
      .then((response) => {
        if (response.status == 200) {
          /*if post is uploaded, upload the gallery images, if one of them fails,
           delete the main post (CASCADE will delete the succeeding gallery images)*/
          alert("Post has been changed!");
          fetchInformation();
          setInfo();
        } else alert("Task failed. Try again");
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    const formDelete = async () => {
      api
        .delete("/api/posts/delete/" + _id + "/")
        .then(() => {
          alert("Post deleted successfully!");
          fetchInformation();
          setInfo();
        })
        .catch((err) => alert(err));
    };
    if (deleteCounter == 3) formDelete();
  }, [deleteCounter]);

  //sets all useStates based on post dictionary. if left empty, the function will clear the fields
  function setInfo(
    info = {
      category: -1,
      colour_scheme: "",
      created_at: "",
      description: "",
      front_image: "",
      id: -1,
      likes: -1,
      title: "",
    }
  ) {
    setCategory(info.category);
    setProjectTheme(info.colour_scheme);
    setDescription(info.description);
    setFrontImage(info.front_image);
    _setId(info.id);
    setTitle(info.title);
    setDeleteCounter(1);
  }

  return _id == -1 ? (
    <>
      <h1>Posts</h1>

      <div className="h-[90%] w-[50vw] overflow-y-scroll">
        <div className=" responsive-grid mt-10 ">
          {posts.length > 0 ? (
            posts.map((info: PostInterface) => (
              <Post
                _key={parseInt(info.id.toString())}
                info={info}
                picture={false}
                onClick={() => setInfo(info)}
              />
            ))
          ) : (
            <LoadingIndicator />
          )}
        </div>
      </div>
    </>
  ) : (
    <>
      <h2 className="text-xl">Edit Project</h2>
      <form
        onSubmit={formSubmit}
        className="w-[600px] h-[90%] flex"
        encType="multipart/form-data"
      >
        <CSRFToken />
        <div>
          <h3 className="">{"Title"}</h3>
          <input
            className="rounded-md pl-1 text-black w-[250px]"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            maxLength={50}
          />
          <p className="text-sm">Title of the project</p>
          <h3 className="mt-5">{"Description"}</h3>
          <textarea
            className="rounded-md pl-1 text-black h-[200px] w-[250px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <p className="text-sm">
            Description shown when clicking on the project's page
          </p>

          <h3 className="mt-5">{"Front Image"}</h3>
          <img
            className="bg-white  w-[300px] rounded-lg p-3 shadow-md rotate-3 mt-2 mb-2"
            src={frontImage}
          />
          <p>Cannot be changed</p>
        </div>
        <div className="ml-8">
          <h3 className="">{"Theme"}</h3>
          <select
            name="project_theme"
            id="project_theme"
            value={projectTheme}
            className="rounded-md pl-1 text-black"
            onChange={(e) => setProjectTheme(e.target.value)}
          >
            <option value="sunset">Sunset</option>
            <option value="poppy">Poppy</option>
            <option value="northernlights">Northern Lights</option>
            <option value="campfire">Campfire</option>
            <option value="sea">Sea</option>
            <option value="jungle">Jungle</option>
            <option value="gemstone">Gemstone</option>
            <option value="stone">Stone</option>
            <option value="cave">Cave</option>
          </select>
          <p className="text-sm">
            Will set the background on the project's page
          </p>
          <div
            className={
              "w-[250px] h-[200px] rounded-xl shadow-sm" + " bg_" + projectTheme
            }
          />
          <h3 className="mt-5">{"Category"}</h3>
          <select
            name="project_theme"
            id="project_category"
            value={category}
            className="rounded-md pl-1 text-black"
            onChange={(e) => setCategory(parseInt(e.target.value))}
          >
            <option value={""}>{"--None--"}</option>
            {categoryList.map((val) => (
              <option value={val[0]} key={val[1]}>
                {val[1]}
              </option>
            ))}
          </select>
          <p className="text-sm">
            {"By default will be set to 'General' category"}
          </p>

          <button
            className="w-[250px] mt-5 bg-emerald-400 rounded-lg active:bg-emerald-500 hover:bg-emerald-300 disabled:bg-gray-500"
            type="submit"
            disabled={!canSubmit}
          >
            {"Submit"}
          </button>
          <button
            className="w-[250px] mt-2 bg-red-500 rounded-lg active:bg-red-600 hover:bg-red-400 disabled:bg-gray-500"
            onClick={() => setInfo()}
            type="button"
          >
            {"Cancel"}
          </button>
          <button
            className="w-[250px] mt-2 bg-gray-600 rounded-lg active:bg-gray-700 hover:bg-grey-500 disabled:bg-gray-500"
            onClick={() => {
              setDeleteCounter(deleteCounter + 1);
            }}
            type="button"
          >
            {deleteCounter == 1
              ? "Delete"
              : deleteCounter == 2
              ? "Are You Sure?"
              : "Deleting..."}
          </button>
        </div>
      </form>
    </>
  );
};

const SettingsDeleteProject = () => {
  return <PostPanel />;
};

export default SettingsDeleteProject;
