import { useContext, useEffect, useRef, useState } from "react";
import MenuContext from "../store/menu-context";
import useHttp from "./useHttp";
import { API_URL } from "../config/config";
import RestaurantContext from "../store/restaurant-context";

const useInit = () => {
  // saving reference to the context, so as context updates won't trigger the hook again
  const menuContext = useRef(useContext(MenuContext));
  const restaurantContext = useRef(useContext(RestaurantContext));
  const [isLoading, setIsLoading] = useState(true);
  const { error, sendRequest, setError } = useHttp();

  useEffect(() => {
    setIsLoading(true);
    // Fetch and init restaurant
    const reqConfigRestaurant = {
      url: `${API_URL}/restaurant/3/`,
    };
    sendRequest(reqConfigRestaurant, (data) =>
      restaurantContext.current.initRestaurant(data)
    );

    // Fetch and init categories
    const reqConfigCategories = {
      url: `${API_URL}/menu/3/categories/`,
    };
    sendRequest(reqConfigCategories, (data) =>
      menuContext.current.initCategories(data)
    );

    // Fetch and init menu-items
    const reqConfigItems = {
      url: `${API_URL}/item/`,
    };
    sendRequest(reqConfigItems, (data) => menuContext.current.initItems(data));

    // Add a short delay to show preloader and to give time to the images to render
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [sendRequest, menuContext, setIsLoading]);

  return { error, isLoading, setError };
};

export default useInit;
