import { useContext } from "react";
import MenuContext from "../store/menu-context";
import MenuList from "../components/Menu/MenuList/MenuList";

// Same page for food & drinks, the only difference will be the isFood prop configured from the routes in App.js
const MenuPage = ({ isFood }) => {
  const menuContext = useContext(MenuContext);

  /* Here we map API categories to objects with data about category and with a list of items
  typeof(menuGroups) = {category: Category , items: Item[]}[]
  Category = API schema for category
  Item = API schema for menu item */
  const menuGroups = menuContext.categories
    .map((category) => menuContext.getItemsOfCategory(category))
    .filter((menuGroup) => menuGroup.category.isFood === isFood);

  // we have a menuList for each menuGroup
  return (
    <>
      {menuGroups.map((group, i) => (
        <MenuList
          category={group.category}
          items={group.items}
          key={group.category.id}
          seqNo={i + 1}
        />
      ))}
    </>
  );
};

export default MenuPage;
