import React, { useState } from "react";

// Init context with an object with the same structure as the value used for the provider
const MenuContext = React.createContext({
  categories: [],
  items: [],
  initCategories: (categories) => {},
  initItems: (items) => {},
  itemIsFood: (item) => false,
  getItemsOfCategory: (category) => {},
});

export const MenuContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const initCategories = (categories) => {
    setCategories(categories);
  };
  const initItems = (items) => {
    setItems(items);
  };
  const itemIsFood = (item) => {
    const itemCategory = categories.find(
      (category) => category.id === item.category
    );
    return itemCategory.isFood;
  };
  const getItemsOfCategory = (category) => {
    return {
      category: { ...category },
      items: items.filter((item) => item.category === category.id),
    };
  };

  return (
    <MenuContext.Provider
      value={{
        categories,
        items,
        initCategories,
        initItems,
        itemIsFood,
        getItemsOfCategory,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
