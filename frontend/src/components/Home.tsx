import { useEffect, useState } from "react";
import api from "../api";
import BodyThemeManager from "./subcomponents/BodyThemeManager";

const Home = () => {
  const [homeTheme, setHomeTheme] = useState("");

  //grabbing home theme from settings api
  const fetchInformation = () => {
    api
      .get("/api/settings/?name=HOME_THEME")
      .then((response) => {
        if (response.status == 200) setHomeTheme(response.data[0].value);
      })
      .catch(() => {
        localStorage.clear();
        fetchInformation();
      });
  };

  useEffect(() => {
    fetchInformation();
  });

  return <BodyThemeManager theme={homeTheme}></BodyThemeManager>;
};

export default Home;
