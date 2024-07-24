import { useState, useEffect } from "react";
import api from "../../api";
import CSRFToken from "./CSRFToken";
import { CategoryInterface } from "../Interfaces";

const SettingsCreateCategory = () => {
  //For general section
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  //only able to submit if title isn't empty or already taken
  const [canSubmit, setCanSubmit] = useState(true);
  useEffect(() => {
    if (category != "" && categoryList.indexOf(category) == -1) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [category, categoryList]);

  //loops through category list and adds names to a list for display
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
            list.push(object.category_name);
          }
          setCategoryList(list);
        } else {
          alert("Error occured. Please refresh page.");
        }
      })
      .catch((err) => alert(err));
  };

  //run fetch on first render only
  useEffect(() => {
    fetchCategoryList();
  }, []);

  //post new category
  const formSubmit = async (e) => {
    e.preventDefault();

    const dict = {
      category_name: category,
    };
    api
      .post("/api/categories/", dict)
      .then((response) => {
        if (response.status == 201) {
          alert("Category created successfully");
          fetchCategoryList();
        } else alert("Task failed. Try again");
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <h2 className="text-xl">Create Category</h2>
      <form onSubmit={formSubmit} className="w-[600px] h-[90%] flex">
        <CSRFToken />
        <div className="w-[250px]">
          <h3 className="">{"Category Title"}</h3>
          <input
            className="rounded-md pl-1 text-black w-[250px]"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Title"
            maxLength={50}
          />
          <button
            className="w-[250px] mt-5 bg-emerald-400 rounded-lg active:bg-emerald-500 hover:bg-emerald-300 disabled:bg-gray-500"
            type="submit"
            disabled={!canSubmit}
          >
            {"Submit"}
          </button>
        </div>
        <div className="ml-8 w-[250px]">
          <h3>List of Existing Categories:</h3>
          <div className="grid bg-slate-500 rounded-xl pt-2 pb-2">
            {categoryList.map((value) => (
              <p className="pl-2" key={value}>
                {value}
              </p>
            ))}
          </div>
        </div>
      </form>
    </>
  );
};

export default SettingsCreateCategory;
