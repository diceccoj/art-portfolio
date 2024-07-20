import { useState } from "react";
import api from "../../api";
import CSRFToken from "./CSRFToken";

const SettingsGeneral = () => {
  //For general section
  const [homeTheme, setHomeTheme] = useState("sunset");

  const formSubmit = async (e) => {
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
      .catch((err) => alert(err));
  };

  return (
    <form onSubmit={formSubmit} className="grid w-[300px]" method="put">
      <CSRFToken />
      <h2 className="text-xl">General</h2>
      <h3 className="mt-5">{"Home Theme"}</h3>
      <select
        name="home_theme"
        id="home_theme"
        className="rounded-md pl-1 text-black"
        onChange={(e) => setHomeTheme(e.target.value)}
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
      <p className="text-sm">Will set the theme on the home page</p>

      <div
        className={"w-full h-[200px] rounded-xl shadow-sm" + " bg_" + homeTheme}
      />
      <button
        className="mt-5 bg-emerald-400 rounded-lg active:bg-emerald-500 hover:bg-emerald-300 disabled:bg-gray-500"
        type="submit"
      >
        {"Submit"}
      </button>
    </form>
  );
};

export default SettingsGeneral;
