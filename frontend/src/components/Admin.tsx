import BodyThemeManager from "./subcomponents/BodyThemeManager";
import { useState } from "react";
import SettingsGeneral from "./subcomponents/SettingsGeneral";
import SettingsCreateProject from "./subcomponents/SettingsCreateProject";
import SettingsCreateCategory from "./subcomponents/SettingsCreateCategory";

function Logout() {
  localStorage.clear();
  window.location.href = "/";
  sessionStorage.removeItem("csrftoken");
}

//returns a menu that can switch between tabs, each one either creating or deleting posts
const Admin = () => {
  const sections = [
    "General",
    "Create Project",
    "Create Category",
    "Edit/Delete Project",
    "Edit/Delete Category",
  ];

  //For settings page

  const [selection, setSelection] = useState("General");

  return (
    <div className="h-screen w-screen">
      <div className="fixed top-0  left-0 grid h-screen bg-slate-500 rounded-xl translate-x-[-5%] z-10">
        {sections.map((val) => (
          <button
            className="w-[80%] font-bold pl-1 mt-10 mb-10 ml-8 mr-20 text-left bg-white rounded-lg bg-opacity-0 hover:bg-opacity-20 active:bg-opacity-40"
            key={val}
            onClick={() => setSelection(val)}
          >
            {val}
          </button>
        ))}
        <button
          className="w-[80%] font-bold pl-1 mt-10 mb-10 ml-8 mr-20 text-left bg-red-400 rounded-lg bg-opacity-0 hover:bg-opacity-20 active:bg-opacity-40 text-red-300"
          key="logout"
          onClick={() => Logout()}
        >
          Logout
        </button>
      </div>
      <BodyThemeManager theme="gemstone" className="flex h-screen">
        <div className="w-[15%] h-screen  translate-x-[-5%]" />
        <div className="m-20">
          {
            /*The following changes what is rendering based on selection variable*/
            selection == "General" ? (
              <SettingsGeneral />
            ) : selection == "Create Project" ? (
              <SettingsCreateProject />
            ) : selection == "Create Category" ? (
              <SettingsCreateCategory />
            ) : null
          }
        </div>
      </BodyThemeManager>
    </div>
  );
};

export default Admin;
