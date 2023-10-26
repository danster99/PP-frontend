import React, { useContext } from "react";
import classes from "./Gallery.module.scss";
import MenuContext from "../../../store/menu-context";
import { useNavigate } from "react-router-dom";

const Gallery = ({ categoryNumber }) => {
  const navigate = useNavigate();
  const menuContext = useContext(MenuContext);

  // here we derive an array with the first 6 items from a category (if they exist)
  const images = menuContext.items
    .filter((category) => category.category === categoryNumber)
    .slice(0, 6);

  const handleNavigateToItem = (e) => {
    // 1) retrieve the item id from the clicked image data-id attribute and find the item category
    const itemId = e.target.dataset.id;
    const itemCategory = menuContext.categories.find(
      (category) => category.id === categoryNumber
    );

    // 2) conditionally navigate to food or drinks menu, depending on the category of the menu item that was clicked
    // itemId is saved as a query param in the url so the page can detect if scroll is needed
    if (itemCategory.isFood) navigate(`/food?item=${itemId}`);
    else navigate(`/drinks?item=${itemId}`);
  };

  return (
    <div className={classes.gallery}>
      {images.map((image) => (
        <div
          className={classes.gallery__item}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), url("${image.b2StorageFile}")`,
          }}
          key={image.id}
          data-id={image.id}
          onClick={handleNavigateToItem}
        ></div>
      ))}
    </div>
  );
};

export default Gallery;
