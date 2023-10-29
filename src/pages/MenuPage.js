import { useContext } from "react";
import MenuContext from "../store/menu-context";
import MenuList from "../components/Menu/MenuList/MenuList";
import MenuTabs from "../components/Menu/MenuTabs/MenuTabs";
import { useParams } from "react-router-dom";

// Same page for food & drinks, the only difference will be the isFood prop configured from the routes in App.js
const MenuPage = ({ isFood }) => {
  const menuContext = useContext(MenuContext);
  const { categoryId } = useParams();

  // here we keep only relevant categories for the page (either food or drinks)
  const menuCategories = menuContext.categories.filter(
    (category) => category.isFood === isFood
  );

  // find category that will be active and displayed in page
  const [renderedCategory] = menuCategories.filter(
    (group) => group.id === +categoryId
  );

  return (
    <div className="menu-page">
      <MenuTabs categories={menuCategories} />
      <main className="main">
        {renderedCategory && (
          <MenuList
            category={renderedCategory}
            items={renderedCategory.items}
            key={renderedCategory.id}
            seqNo={1}
          />
        )}
      </main>
    </div>
  );
};

export default MenuPage;
