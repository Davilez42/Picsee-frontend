/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoMdArrowDown } from "react-icons/io";
import download from "js-file-download";
import usePosts from "../../hooks/usePosts";
import UserContext from "../../context/userContext";
// eslint-disable-next-line react/prop-types
function OptionsPost({ post }) {
  const [liked, setLiked] = useState(post.liked);
  const { logged } = useContext(UserContext);
  const { like } = usePosts();
  const likeHandler = () => {
    if (!logged) {
      return alert("Debes de iniciar sesion primero");
    }
    setLiked(!liked);
    like((data, err) => {
      if (err) {
        alert(err);
      }
    }, post.id);
  };
  useEffect(() => {}, []);
  return (
    <div className="block-photos__options">
      <IoMdArrowDown
        onClick={async () => {
          const resp = await fetch(
            import.meta.env.VITE_API_URL + `post/${post.id}/download`
          );

          if (resp.ok) {
            const blob = await resp.blob();
            const metadata = JSON.parse(resp.headers.get("Meta-Data"));
            download(blob, `${metadata.name}`);
          } else {
            alert("Error");
          }
        }}
        className="block-photos__icon-download"
        size={20}
      />
      <FaHeart
        onClick={() => {
          likeHandler();
        }}
        size={30}
        color={liked ? "red" : ""}
        className="block-photos__icon-heart"
      />
    </div>
  );
}

export default OptionsPost;
