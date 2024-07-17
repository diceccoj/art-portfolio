import { useState } from "react";
import api from "../api";
import BodyThemeManager from "./subcomponents/BodyThemeManager";

const Home = () => {
  const [homeTheme, setHomeTheme] = useState("");

  //grabbing home theme from settings api (defaults to sunset if call fail)
  localStorage.clear();
  api.get("/api/settings/grab/?name=HOME_THEME").then((response) => {
    if (response.status == 200) setHomeTheme(response.data[0].value);
  });

  return <BodyThemeManager theme={homeTheme}></BodyThemeManager>;
};

export default Home;
