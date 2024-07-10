import { useEffect, useState } from "react";

function submit() {}

const SettingsCreateProject = () => {
  //For Create Project in Settings
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectTheme, setProjectTheme] = useState("sunset");
  const [frontImage, setFrontImage] = useState("");
  const [galleryImages, setGalleryImages] = useState("");
  const [category, setCategory] = useState("");

  //only able to submit if title, description, and front image are not empty
  const [canSubmit, setCanSubmit] = useState(true);
  useEffect(() => {
    if (title != "" && description != "" && frontImage != "") {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [title, description, frontImage]);

  return (
    <>
      <h2 className="text-xl">Create Project</h2>
      <form onSubmit={submit} className="w-[600px] h-[90%] flex">
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
            accept="image/*"
            value={frontImage}
            id="id_image"
            onChange={(e) => setFrontImage(e.target.value)}
          />
          <p className="text-sm">Image to be displayed on homepage.</p>
          <h3 className="mt-5">{"Gallery Images"}</h3>
          <input
            type="file"
            name="image"
            accept="image/*"
            id="id_image"
            value={galleryImages}
            onChange={(e) => setGalleryImages(e.target.value)}
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
          <input
            className="rounded-md pl-1 text-black w-[250px]"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Title"
            maxLength={50}
          />
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
        </div>
      </form>
    </>
  );
};

export default SettingsCreateProject;
