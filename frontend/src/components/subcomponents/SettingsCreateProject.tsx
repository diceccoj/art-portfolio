import { useEffect, useState } from "react";
import api from "../../api";
import CSRFToken from "./CSRFToken";
import { CategoryInterface } from "../Interfaces";

const SettingsCreateProject = () => {
  //For Create Project in Settings
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectTheme, setProjectTheme] = useState("sunset");
  const [frontImage, setFrontImage] = useState<File>();
  const [galleryImages, setGalleryImages] = useState<FileList>(null);
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  //determines if errors are present
  const [errors, setErrors] = useState(false);

  //only able to submit if title, description, and front image are not empty
  const [canSubmit, setCanSubmit] = useState(true);
  useEffect(() => {
    if (title != "" && description != "" && frontImage?.name) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [title, description, frontImage]);

  //creates a list of all existing categories
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

  //post new category
  const formSubmit = async (e) => {
    e.preventDefault();

    let dict: FormData = new FormData();
    dict.append("title", title);
    dict.append("description", description);
    dict.append("front_image", frontImage);
    dict.append("colour_scheme", projectTheme);
    dict.append("category", category);

    api
      .post("/api/posts/", dict)
      .then((response) => {
        if (response.status == 201) {
          /*if post is uploaded, upload the gallery images, if one of them fails,
           delete the main post (CASCADE will delete the succeeding gallery images)*/
          const id = response.data.id;
          if (galleryImages != null) {
            const iter: [string, File][] = Object.entries(galleryImages);
            for (const [key, val] of iter) {
              if (!errors) {
                dict = new FormData();
                dict.append("post", id);
                dict.append("image", val);
                api
                  .post("/api/galleryimages/", dict)
                  .then((res) => {
                    if (res.status != 201)
                      throw new Error("Task failed. Try again");
                  })
                  .catch((err) => {
                    alert(err);
                    setErrors(true);
                    api.delete("/api/posts/delete/" + id + "/");
                  });
              }
            }
          }
          if (!errors) {
            alert("Post created successfully");
          }
        } else alert("Task failed. Try again");
      })
      .catch((err) => alert(err));

    setErrors(false);
  };

  return (
    <>
      <h2 className="text-xl">Create Project</h2>
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
          <input
            type="file"
            name="image"
            accept="image/jpeg,image/png"
            id="id_image"
            onChange={(e) => setFrontImage(e.target.files[0])}
          />
          <p className="text-sm">Image to be displayed on homepage.</p>
          <h3 className="mt-5">{"Gallery Images"}</h3>
          <input
            type="file"
            name="image"
            accept="image/jpeg,image/png"
            id="id_image"
            onChange={(e) => {
              setGalleryImages(e.target.files);
            }}
            multiple={true}
          />
          <p className="text-sm">
            {"Images displayed on Project's page (Not the frontpage)"}
          </p>
        </div>
        <div className="ml-8">
          <h3 className="">{"Theme"}</h3>
          <select
            name="project_theme"
            id="project_theme"
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
            className="rounded-md pl-1 text-black"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={""}>{"--None--"}</option>
            {categoryList.map((val) => (
              <option value={val[0]} key={val[1]}>
                {val[1]}
              </option>
            ))}
          </select>
          <p className="text-sm">
            {"By default will be set to 'Other' category"}
          </p>

          <button
            className="w-[250px] mt-5 bg-emerald-400 rounded-lg active:bg-emerald-500 hover:bg-emerald-300 disabled:bg-gray-500"
            type="submit"
            disabled={!canSubmit}
          >
            {"Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default SettingsCreateProject;
