import { useContext, useEffect, useRef, useState, useCallback } from "react";
import MenuContext from "../store/menu-context";
import useHttp from "./useHttp";
import { API_URL } from "../config/config";
import RestaurantContext from "../store/restaurant-context";
import OrderContext from "../store/order-context";

const useInit = () => {
  // saving reference to the context, so as context updates won't trigger the hook again
  const menuContext = useRef(useContext(MenuContext));
  const restaurantContext = useRef(useContext(RestaurantContext));
  const orderContext = useRef(useContext(OrderContext));
  const [isLoading, setIsLoading] = useState(true);
  const { error, sendRequest, setError } = useHttp();

  // keeps all calls to the api that will be dome when app is initialised
  const initCalls = useCallback(async () => {
    setIsLoading(true);
    // Fetch and init restaurant
    const reqConfigRestaurant = {
      url: `${API_URL}/restaurant/1/`,
    };
    await sendRequest(reqConfigRestaurant, (data) =>
      restaurantContext.current.initRestaurant(data)
    );

    // Fetch and init categories with their items
    const reqConfigCategories = {
      url: `${API_URL}/menu/1/categories/`,
    };
    await sendRequest(reqConfigCategories, (data) =>
      menuContext.current.initCategories(data)
    );

    // Add or init a cart for the table
    const reqConfigCart = {
      url: `${API_URL}/table/2/new_cart/`,
      method: "POST",
      body: {
        restaurant: 1,
        number: 1,
      },
    };
    await sendRequest(reqConfigCart, (data) => {
      orderContext.current.setCart(data);
    });

    // Add a short delay to show preloader and to give time to the images to render
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [sendRequest, menuContext, setIsLoading]);

  // the actual effect that will trigger the function
  useEffect(() => {
    initCalls();
  }, [initCalls]);

  return { error, isLoading, setError, sendRequest };
};

export default useInit;
