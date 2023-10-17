import React, { useContext } from "react";
import Category from "../components/Categories/Category/Category";
import MenuContext from "../store/menu-context";

const MainPage = () => {
  const menuContext = useContext(MenuContext);

  return (
    <div className="card">
      {menuContext.categories.map((category) => (
        <Category category={category} key={category.id} />
      ))}
    </div>
  );
};

export default MainPage;
