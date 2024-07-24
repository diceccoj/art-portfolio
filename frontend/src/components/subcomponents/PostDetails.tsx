import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import BodyThemeManager from "./BodyThemeManager";
import { FaHome } from "react-icons/fa";
import RevealOnScroll from "./RevealOnScroll";
import Post from "./Post";
import Footer from "./Footer";
const PostDetails = () => {
  const { id } = useParams();
  const [errors, setErrors] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectTheme, setProjectTheme] = useState("sunset");
  const [frontImage, setFrontImage] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [category, setCategory] = useState(null);
  const [createdAt, setCreatedAt] = useState("");

  //gives a list of recommended posts of the same category
  const [recommendations, setRecommendations] = useState([]);

  const fetchInformation = async () => {
    //getting post information
    await api
      .get("/api/posts/unauth/?id=" + id)
      .then((response) => {
        if (response.status == 200) {
          const object = response.data[0];
          setTitle(object.title);
          setDescription(object.description);
          setProjectTheme(object.colour_scheme);
          setFrontImage(object.front_image);
          setCategory(object.category);
          setCreatedAt(new Date(object.created_at).toLocaleDateString("en-US"));
        }
      })
      .catch(() => setErrors(true));

    //getting gallery images
    if (!errors) {
      await api
        .get("/api/galleryimages/unauth/?post=" + id)
        .then((response) => {
          if (response.status == 200) setGalleryImages(response.data);
        })
        .catch(() => setErrors(true));
    }

    if (errors) alert("An error occurred. Please refresh page");

    setErrors(false);
  };

  useEffect(() => {
    fetchInformation();
  }, []);

  //getting recommendations
  useEffect(() => {
    if (category != null) {
      api
        .get("/api/posts/unauth/?category=" + category)
        .then((response) => {
          if (response.status == 200) {
            let list = [];
            let count = 0;
            for (const [_id, object] of Object.entries(response.data)) {
              if (count == 3) break;
              if (_id != id) {
                count++;
                list.push(object);
              }
            }
            setRecommendations(list);
          }
        })
        .catch(() => setErrors(true));
    }
  }, [category]);

  return (
    title != "" && (
      <BodyThemeManager theme={projectTheme}>
        <button onClick={() => (window.location.href = "/")}>
          <FaHome className="scale-150 mt-7 ml-7" />
        </button>
        <h1></h1>
        <RevealOnScroll className="horizontally-centered mt-40">
          <div className="responsive-grid w-[80%]">
            <img
              src={frontImage}
              className=" bg-white active:bg-slate-300 w-[98%] rounded-lg p-3 m-5 shadow-md  hover:scale-[102%] transition-transform "
            />
            <div className="centered w-full h-full">
              <h1 className="text-6xl italic text-center hover:scale-[102%] transition-transform">
                {title}
              </h1>
            </div>
            <p className="text-center">{createdAt}</p>
          </div>
        </RevealOnScroll>
        <RevealOnScroll>
          <h1 className="horizontally-centered text-center mt-16">
            {"Description"}
          </h1>
          <div className="horizontally-centered mt-1">
            <div className="small-text-bg w-[80%] lg:w-[60%]">
              {description}
            </div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll>
          {galleryImages.length > 0 && (
            <>
              <h1 className="text-center mt-32 text-6xl">Gallery</h1>
              <div className="horizontally-centered mt-10">
                <div className="responsive-grid-3 w-[90%]">
                  {galleryImages.map((image) => (
                    <div
                      className="justify-center items-center flex"
                      key={image.id}
                    >
                      <img
                        src={image.image}
                        className=" bg-white active:bg-slate-300 w-[98%] rounded-lg p-3 m-5 shadow-md  hover:scale-[102%] transition-transform "
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </RevealOnScroll>

        <RevealOnScroll>
          {recommendations.length > 0 && (
            <>
              <h1 className="text-center mt-32 text-6xl">
                Other Posts in this Category
              </h1>
              <div className="horizontally-centered mt-10">
                <div className="responsive-grid-3 w-[90%]">
                  {recommendations.map((post) => (
                    <div key={post.id}>
                      <Post
                        info={post}
                        onClick={() =>
                          (window.location.href = "/post/" + post.id)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </RevealOnScroll>
        <Footer />
      </BodyThemeManager>
    )
  );
};

export default PostDetails;
