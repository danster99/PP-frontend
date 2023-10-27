import { useContext } from "react";
import MenuContext from "../store/menu-context";
import MenuList from "../components/Menu/MenuList/MenuList";
import MenuTabs from "../components/Menu/MenuTabs/MenuTabs";
import { useParams } from "react-router-dom";

// Same page for food & drinks, the only difference will be the isFood prop configured from the routes in App.js
const MenuPage = ({ isFood }) => {
  const menuContext = useContext(MenuContext);
  const { categoryId } = useParams();

  /* Here we map API categories to objects with data about category and with a list of items
  typeof(menuGroups) = {category: Category , items: Item[]}[]
  Category = API schema for category
  Item = API schema for menu item */
  const menuGroups = menuContext.categories
    .map((category) => menuContext.getItemsOfCategory(category))
    .filter(
      (category) =>
        category.category.isFood === isFood && category.items.length > 0
    );

  // we only show the active list
  const [renderedList] = menuGroups.filter(
    (group) => group.category.id === +categoryId
  );

  return (
    <div className="menu-page">
      <MenuTabs categories={menuGroups} />
      <main className="main">
        {renderedList && (
          <MenuList
            category={renderedList.category}
            items={renderedList.items}
            key={renderedList.category.id}
            seqNo={1}
          />
        )}
      </main>
    </div>
  );
};

export default MenuPage;
