import { useContext, useEffect, useRef } from "react";
import MenuContext from "../store/menu-context";
import useHttp from "./useHttp";

const useInit = () => {
  // saving reference to the context, so as context updates won't trigger the hook again
  const menuContext = useRef(useContext(MenuContext));
  const { loading, error, sendRequest } = useHttp();

  useEffect(() => {
    // Fetch and init categories
    const reqConfigCategories = {
      url: "https://plate-pal-97cd0667892d.herokuapp.com/api/menu/3/categories/",
    };
    sendRequest(reqConfigCategories, (data) =>
      menuContext.current.initCategories(data)
    );

    // Fetch and init menu-items
    const reqConfigItems = {
      url: "https://plate-pal-97cd0667892d.herokuapp.com/api/item/",
    };
    sendRequest(reqConfigItems, (data) => menuContext.current.initItems(data));
  }, [sendRequest, menuContext]);

  return { error, loading };
};

export default useInit;
