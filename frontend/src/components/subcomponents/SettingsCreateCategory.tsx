import { useState, useEffect } from "react";

function submit() {}

const SettingsCreateCategory = () => {
  //For general section
  const [category, setCategory] = useState("");

  //only able to submit if title, description, and front image are not empty
  const [canSubmit, setCanSubmit] = useState(true);
  useEffect(() => {
    if (category != "") {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [category]);

  return (
    <>
      <h2 className="text-xl">Create Category</h2>
      <form onSubmit={submit} className="w-[600px] h-[90%] flex">
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
          <div className="grid bg-slate-500 rounded-xl h-10"></div>
        </div>
      </form>
    </>
  );
};

export default SettingsCreateCategory;
