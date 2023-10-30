import { useContext, useState } from "react";
import MenuContext from "../store/menu-context";
import MenuList from "../components/Menu/MenuList/MenuList";
import MenuTabs from "../components/Menu/MenuTabs/MenuTabs";

// Same page for food & drinks, the only difference will be the isFood prop configured from the routes in App.js
const MenuPage = ({ isFood }) => {
  const menuContext = useContext(MenuContext);

  // State for category that is active on the screen
  const [activeCategory, setActiveCategory] = useState(undefined);

  // here we keep only relevant categories for the page (either food or drinks)
  const menuCategories = menuContext.categories.filter(
    (category) => category.isFood === isFood
  );

  return (
    <div className="menu-page">
      <MenuTabs categories={menuCategories} activeCategory={activeCategory} />
      <main className="main">
        {menuCategories.map((category, i) => (
          <MenuList
            category={category}
            items={category.items}
            key={category.id}
            seqNo={i + 1}
            onVisibilityChange={(activeCategory) =>
              setActiveCategory(activeCategory)
            }
          />
        ))}
      </main>
    </div>
  );
};

export default MenuPage;
