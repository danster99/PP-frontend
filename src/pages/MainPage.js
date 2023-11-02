import React, { useContext } from "react";
import Category from "../components/Categories/Category/Category";
import MenuContext from "../store/menu-context";
import Stories from "../components/Categories/Stories/Stories";

const MainPage = () => {
  const menuContext = useContext(MenuContext);
  const categories = [
    ...menuContext.categories.filter((category) => category.isFood),
    ...menuContext.categories.filter((category) => !category.isFood),
  ];

  return (
    <main className="main main-page">
      <Stories />
      <div className="card">
        {categories.map((category) => (
          <Category category={category} key={category.id} />
        ))}
      </div>
    </main>
  );
};

export default MainPage;
