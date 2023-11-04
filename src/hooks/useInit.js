import { useContext, useEffect, useRef, useState, useCallback } from "react";
import MenuContext from "../store/menu-context";
import useHttp from "./useHttp";
import { API_URL } from "../config/config";
import RestaurantContext from "../store/restaurant-context";
import OrderContext from "../store/order-context";

const cacheImages = async (srcArray) => {
  const promises = await srcArray.map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve();
      img.onerror = reject();
    });
  });
  await Promise.all(promises);
};

const useInit = () => {
  // saving reference to the context, so as context updates won't trigger the hook again
  const menuContext = useRef(useContext(MenuContext));
  const restaurantContext = useRef(useContext(RestaurantContext));
  const orderContext = useRef(useContext(OrderContext));
  const [isLoading, setIsLoading] = useState(true);
  const { error, sendRequest, setError } = useHttp();

  // keeps all calls to the api that will be done when app is initialised
  const initCalls = useCallback(async () => {
    setIsLoading(true);

    // Config get requests urls
    const reqConfigRestaurant = {
      url: `${API_URL}/restaurant/1/`,
    };
    const reqConfigStories = {
      url: `${API_URL}/menu/1/stories/`,
    };
    const reqConfigCategories = {
      url: `${API_URL}/menu/1/categories/`,
    };

    // Config post request for cart init
    const reqConfigCart = {
      url: `${API_URL}/table/2/new_cart/`,
      method: "POST",
      body: {
        restaurant: 1,
        number: 1,
      },
    };

    let stories = [];

    // Run all requests at once
    await Promise.all([
      sendRequest(reqConfigRestaurant, (data) =>
        restaurantContext.current.initRestaurant(data)
      ),
      sendRequest(reqConfigStories, (data) => {
        restaurantContext.current.initStories(data);
        stories = data.map((story) => story.b2StorageFile);
      }),
      sendRequest(reqConfigCategories, (data) => {
        menuContext.current.initCategories(data);
      }),
      sendRequest(reqConfigCart, (data) => {
        orderContext.current.setCart(data);
      }),
    ]);

    // Preload stories in background
    await cacheImages(stories);

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
