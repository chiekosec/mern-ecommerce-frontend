import React, { useState } from "react";
import { API } from "../../backend";

function ImageHelper({ product }) {
  const [pic, setPic] = useState(404);

  const checkpic = () => {
    return fetch(`${API}/product/photo/${product._id}`)
      .then((res) => res.status)
      .catch((er) => console.log(er));
  };
  checkpic()
    .then((res) => {
      setPic(res);
    })
    .catch((e) => console.log(e));

  const imageUrl =
    product && pic === 200
      ? `${API}/product/photo/${product._id}`
      : "https://unsplash.com/a/img/empty-states/photos.png";
  return (
    <div className="rounded border p-2" style={{ height: "354px" }}>
      <img
        src={`${imageUrl}`}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
}

export default ImageHelper;
