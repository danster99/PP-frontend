import React, { useContext } from "react";
import classes from "./Gallery.module.scss";
import MenuContext from "../../../store/menu-context";

const Gallery = ({ categoryNumber }) => {
  const menuContext = useContext(MenuContext);
  const images = menuContext.items
    .filter((category) => category.category === categoryNumber)
    .slice(0, 6);

  return (
    <div className={classes.gallery}>
      {images.map((image) => (
        <div
          className={classes.gallery__item}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), url("${image.b2StorageFile}")`,
          }}
          key={image.id}
        ></div>
      ))}
    </div>
  );
};

export default Gallery;
