import React, { useState } from "react";

// Init context with an object with the same structure as the value used for the provider
const MenuContext = React.createContext({
  categories: [],
  items: [],
  initCategories: (categories) => {},
  initItems: (items) => {},
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

  return (
    <MenuContext.Provider
      value={{
        categories,
        items,
        initCategories,
        initItems,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
