import { useContext, useEffect, useRef, useState } from "react";
import MenuContext from "../store/menu-context";
import useHttp from "./useHttp";
import { API_URL } from "../config/config";
import RestaurantContext from "../store/restaurant-context";
import OrderContext from "../store/order-context";

/* 
    TO DO!!!! Refactor for better context management and useInit call => fetch category, then add items
*/

const useInit = () => {
  // saving reference to the context, so as context updates won't trigger the hook again
  const menuContext = useRef(useContext(MenuContext));
  const restaurantContext = useRef(useContext(RestaurantContext));
  const orderContext = useRef(useContext(OrderContext));
  const [isLoading, setIsLoading] = useState(true);
  const { error, sendRequest, setError } = useHttp();

  useEffect(() => {
    setIsLoading(true);
    // Fetch and init restaurant
    const reqConfigRestaurant = {
      url: `${API_URL}/restaurant/1/`,
    };
    sendRequest(reqConfigRestaurant, (data) =>
      restaurantContext.current.initRestaurant(data)
    );

    // Fetch and init categories with their items
    const reqConfigCategories = {
      url: `${API_URL}/menu/1/categories/`,
    };
    sendRequest(reqConfigCategories, (data) =>
      menuContext.current.initCategories(data)
    );

    // TO DO!!! Finish cart integration

    // Add or init a cart for the table
    const reqConfigCart = {
      url: `${API_URL}/table/2/new_cart/`,
      method: "POST",
      body: {
        restaurant: 1,
        number: 1,
      },
    };
    sendRequest(reqConfigCart, (data) => {
      orderContext.current.setCart(data);
    });

    // Add a short delay to show preloader and to give time to the images to render
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [sendRequest, menuContext, setIsLoading]);

  return { error, isLoading, setError, sendRequest };
};

export default useInit;
