import React, { useState } from "react";
import useHttp from "../hooks/useHttp";
import { API_URL } from "../config/config";

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
  const { sendRequest } = useHttp();
  const [categories, setCategories] = useState([]);

  /* Here we map API fetched categories to objects with data about category and with the corresponding list of items
  type: {id: number, name: string, isFood: boolean , items: Item[]}[]
  where Item = API schema for menu item */
  const initCategories = async (categories) => {
    try {
      const itemsPerCategory = await Promise.all(
        categories.map((category) => {
          return sendRequest(
            { url: `${API_URL}/category/${category.id}/items/` },
            () => {},
            true
          );
        })
      );

      const categoriesWithItems = categories
        .map((category, i) => ({
          ...category,
          items: itemsPerCategory.at(i),
        }))
        .filter((category) => !!category && category?.items?.length > 0);

      setCategories(categoriesWithItems);
    } catch (err) {
      throw new Error(err);
    }
  };
  return (
    <MenuContext.Provider
      value={{
        categories,
        initCategories,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
