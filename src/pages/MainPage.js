import React, { useContext } from "react";
import Category from "../components/Categories/Category/Category";
import MenuContext from "../store/menu-context";
import Stories from "../components/Categories/Stories/Stories";

const MainPage = () => {
  const menuContext = useContext(MenuContext);

  return (
    <main className="main main-page">
      <Stories />
      <div className="card">
        {menuContext.categories.map((category) => (
          <Category category={category} key={category.id} />
        ))}
      </div>
    </main>
  );
};

export default MainPage;
