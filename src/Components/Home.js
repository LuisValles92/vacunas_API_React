import React from "react";
import imagenes from "../assets/imagenes";

const inicio = () => {
  return (
    <div className="App">
      <img
        src={imagenes.img2}
        alt="Home image"
        width="90%"
        height="800px"
      ></img>
    </div>
  );
};

export default inicio;
