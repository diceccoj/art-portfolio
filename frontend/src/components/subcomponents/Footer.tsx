import { useEffect, useState } from "react";
import api from "../../api";
import { SettingsInterface } from "../Interfaces";

const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchInformation = async () => {
    api.get("/api/settings/").then((response) => {
      if (response.status == 200) {
        const iter: [string, SettingsInterface][] = Object.entries(
          response.data
        );
        for (const [id, object] of iter) {
          if (object.name == "NAME") setName(object.value);
          if (object.name == "EMAIL") setEmail(object.value);
        }
      }
    });
  };

  useEffect(() => {
    fetchInformation();
  }, []);

  return (
    <div className="p-12 mt-20 bg-slate-600 flex justify-center opacity-95 pb-12">
      <div className="responsive-grid w-[80%]  place-items-center">
        <div className="">
          <h2 className="font-bold text-center text-2xl">Art Made By</h2>
          <p className="text-center mt-1">{name}</p>
          <p className=" text-center mt-1">{email}</p>
        </div>
        <div className="lg:mt-[0px] mt-10">
          <div>
            <h2 className="font-bold text-center text-2xl">Site Made By</h2>
            <p className="text-center mt-1">Jonathan DiCecco</p>
            <p className="text-center mt-1">jonathan.dicecco@outlook.com</p>
            <p
              className=" underline text-center mt-1"
              onClick={() => {
                window.location.href =
                  "https://www.linkedin.com/in/jonathan-dicecco-b9529a234/";
              }}
            >
              Linkedin
            </p>
            <p
              className=" underline text-center mt-1"
              onClick={() => {
                window.location.href = "https://www.jdicecco.dev";
              }}
            >
              Website
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
