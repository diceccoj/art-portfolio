import { useEffect, useState } from "react";
import api from "../../api";
import CSRFToken from "./CSRFToken";
import { SettingsInterface } from "../Interfaces";
import ThemeOptions from "./ThemeOptions";

const SettingsGeneral = () => {
  //For general section
  const [homeTheme, setHomeTheme] = useState("sunset");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState(false);
  const [avatar, setAvatar] = useState<File>();
  const [canSubmitND, setCanSubmitND] = useState(false);
  const [canSubmitAv, setCanSubmitAv] = useState(false);

  const formSubmitHomeTheme = async (e) => {
    e.preventDefault();
    const dict = {
      name: "HOME_THEME",
      value: homeTheme,
    };

    //HOME_THEME has the id of 1
    api
      .put("/api/settings/modify/1/", dict)
      .then((response) => {
        if (response.status == 200) alert("Theme changed successfully");
        else alert("Task failed. Try again");
      })
      .catch(() => setErrors(true));
  };

  //NAME is id 4, EMAIL is id 5, DESCRIPTION is id 3
  const formSubmitNameDesc = async (e) => {
    e.preventDefault();

    //changing name
    const dict1 = {
      name: "NAME",
      value: name,
    };
    api
      .put("/api/settings/modify/4/", dict1)
      .then((response) => {
        if (response.status != 200) setErrors(true);
      })
      .catch(() => setErrors(true));
    //changing email
    const dict2 = {
      name: "EMAIL",
      value: email,
    };
    api
      .put("/api/settings/modify/5/", dict2)
      .then((response) => {
        if (response.status != 200) setErrors(true);
      })
      .catch(() => setErrors(true));

    //changing description
    const dict3 = {
      name: "DESCRIPTION",
      value: description,
    };
    api
      .put("/api/settings/modify/3/", dict3)
      .then((response) => {
        if (response.status != 200) setErrors(true);
      })
      .catch(() => setErrors(true));

    if (!errors) alert("Name, Email, and Description changed successfully!");
    else alert("An error occured, try again.");
  };

  const formSubmitAvatar = async (e) => {
    e.preventDefault();

    const dict = new FormData();
    dict.append("avatar", avatar);
    api
      .put("/api/avatar/modify/1/", dict)
      .then((response) => {
        if (response.status == 200) alert("Avatar changed successfully");
        else alert("Task failed. Try again");
      })
      .catch((err) => alert(err));
  };

  //checks if the name, description, and avatar fields can be submitted
  useEffect(() => {
    if (name == "" && description == "" && email == "") setCanSubmitND(false);
    else setCanSubmitND(true);

    if (!avatar?.name) {
      setCanSubmitAv(false);
    } else setCanSubmitAv(true);
  }, [name, description, email, avatar]);

  //trigger the following on page load
  const fetchInformation = async () => {
    await api.get("/api/settings/").then((response) => {
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
    });
  };
  useEffect(() => {
    fetchInformation();
  }, []);

  return (
    <div className="flex h-[50%]">
      <form
        onSubmit={formSubmitHomeTheme}
        className="grid w-[250px]"
        method="put"
      >
        <CSRFToken />
        <h2 className="text-xl">General</h2>
        <h3 className="mt-5">{"Home Theme"}</h3>
        <select
          name="home_theme"
          id="home_theme"
          value={homeTheme}
          className="rounded-md pl-1 text-black h-[30px] "
          onChange={(e) => setHomeTheme(e.target.value)}
        >
          <ThemeOptions />
        </select>
        <p className="text-sm">Will set the theme on the home page</p>

        <div
          className={
            "w-full h-[200px] rounded-xl shadow-sm" + " bg_" + homeTheme
          }
        />
        <button
          className="h-[25px] mt-5 bg-emerald-400 rounded-lg active:bg-emerald-500 hover:bg-emerald-300 disabled:bg-gray-500"
          type="submit"
        >
          {"Submit"}
        </button>
      </form>

      <form
        onSubmit={formSubmitNameDesc}
        className="grid w-[250px] ml-40"
        method="put"
      >
        <CSRFToken />
        <h3 className="mt-12">{"Name"}</h3>
        <input
          className="h-[30px] rounded-md pl-1 text-black w-[250px]"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder=""
          maxLength={50}
        />
        <h3 className="mt-5">{"Email"}</h3>
        <input
          className="h-[30px] rounded-md pl-1 text-black w-[250px]"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=""
          maxLength={50}
        />
        <h3 className="mt-5">{"Description"}</h3>
        <textarea
          className="rounded-md pl-1 text-black h-[200px] w-[250px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder=""
          maxLength={500}
        />
        <button
          className="h-[25px] mt-5 bg-emerald-400 rounded-lg active:bg-emerald-500 hover:bg-emerald-300 disabled:bg-gray-500"
          type="submit"
          disabled={!canSubmitND}
        >
          {"Submit"}
        </button>
      </form>
      <form
        onSubmit={formSubmitAvatar}
        className="grid w-[250px] ml-40"
        method="put"
      >
        <CSRFToken />
        <h3 className="mt-12">{"Avatar"}</h3>
        <input
          type="file"
          name="image"
          accept="image/jpeg,image/png"
          id="id_image"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        <button
          className="h-[25px] mt-5 bg-emerald-400 rounded-lg active:bg-emerald-500 hover:bg-emerald-300 disabled:bg-gray-500"
          type="submit"
          disabled={!canSubmitAv}
        >
          {"Submit"}
        </button>
      </form>
    </div>
  );
};

export default SettingsGeneral;
