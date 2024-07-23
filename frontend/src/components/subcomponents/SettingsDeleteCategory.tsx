import { useState, useEffect } from "react";
import api from "../../api";
import CSRFToken from "./CSRFToken";

const SettingsDeleteCategory = () => {
  //for category list
  const [categoryList, setCategoryList] = useState([]);

  //for editing category
  const [_id, _setId] = useState(-1);
  const [category, setCategory] = useState("");

  const [deleteCounter, setDeleteCounter] = useState(1);

  //for category list
  const fetchCategoryList = () => {
    api
      .get("/api/categories/")
      .then((response) => {
        if (response.status == 200) {
          let list = [];
          for (const [id, object] of Object.entries(response.data)) {
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

  //for editing category
  const formSubmit = async (e) => {
    e.preventDefault();

    const dict = {
      category_name: category,
    };

    api
      .put("/api/categories/modify/" + _id + "/", dict)
      .then((response) => {
        if (response.status == 200) {
          /*if post is uploaded, upload the gallery images, if one of them fails,
           delete the main post (CASCADE will delete the succeeding gallery images)*/
          alert("Category has been changed!");
          fetchCategoryList();
          setInfo([]);
        } else alert("Task failed. Try again");
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    const formDelete = async () => {
      api
        .delete("/api/categories/delete/" + _id + "/")
        .then(() => {
          alert("Category deleted successfully!");
          fetchCategoryList();
          setInfo([]);
        })
        .catch((err) => alert(err));
    };
    if (deleteCounter == 3) formDelete();
  }, [deleteCounter]);

  //only able to submit if title isn't empty or already taken
  const [canSubmit, setCanSubmit] = useState(true);
  useEffect(() => {
    if (category != "" && categoryList.indexOf(category) == -1) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [category, categoryList]);

  //sets all useStates based on post dictionary. if array is empty, the function will clear the fields
  function setInfo([id = -1, category_name = ""]) {
    setCategory(category_name);
    _setId(id);
    setDeleteCounter(1);
  }

  return _id == -1 ? (
    <>
      <h1>Categories</h1>
      <div className="h-[90%] w-[50vw] overflow-y-scroll">
        <div className=" responsive-grid mt-10 ">
          {categoryList.map((val) => (
            <button
              className="m-3 flex justify-center"
              key={val[0]}
              onClick={() => setInfo(val)}
            >
              <p className="w-full h-full small-text-bg hover:scale-100 hover:shadow-lg text-wrap">
                {val[1]}
              </p>
            </button>
          ))}
        </div>
      </div>
    </>
  ) : (
    <>
      <h2 className="text-xl">Edit Category</h2>
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
          <button
            className="w-[250px] mt-2 bg-red-500 rounded-lg active:bg-red-600 hover:bg-red-400 disabled:bg-gray-500"
            onClick={() => setInfo([])}
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
        <div className="ml-8 w-[250px]">
          <h3>List of Existing Categories:</h3>
          <div className="grid bg-slate-500 rounded-xl pt-2 pb-2">
            {categoryList.map((val) => (
              <p className="pl-2" key={val[0]}>
                {val[1]}
              </p>
            ))}
          </div>
        </div>
      </form>
    </>
  );
};

export default SettingsDeleteCategory;
