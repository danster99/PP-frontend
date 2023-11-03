import React, { useContext, useState } from "react";
import classes from "./Gallery.module.scss";
import MenuContext from "../../../store/menu-context";
import { useNavigate } from "react-router-dom";

const Gallery = ({ categoryNumber, items }) => {
  const [allShown, setAllShown] = useState(false);
  const navigate = useNavigate();
  const menuContext = useContext(MenuContext);

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

  const images = allShown ? items : items.slice(0, 8);

  return (
    <>
      <div className={classes.gallery}>
        {images.map((image) => (
          <div
            className={classes.gallery__item}
            key={image.id}
            onClick={handleNavigateToItem}
          >
            <div
              data-id={image.id}
              className={classes.gallery__img}
              style={{
                backgroundImage: `url("${image.b2StorageFile}"), linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05))`,
              }}
            ></div>
          </div>
        ))}
        {((!allShown && items.length > 9) ||
          (allShown && images.length > 9)) && (
          <div
            className={`${classes.gallery__item} ${classes.gallery__more}`}
            onClick={() => setAllShown((allShown) => !allShown)}
          >
            {allShown ? "x" : "..."}
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
