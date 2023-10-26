import React, { useState } from "react";

// object created for the init render when some dummy data is needed before API data arrives,
// and for better autocompletion when dealing with context variables
const initialRestaurantData = {
  id: -1,
  name: "Liod's",
  address: "",
  phone: "",
  website: "",
};

const RestaurantContext = React.createContext({
  restaurant: initialRestaurantData,
  initRestaurant: (restaurantData) => {},
});

export const RestaurantContextProvider = ({ children }) => {
  const [restaurant, setRestaurant] = useState(initialRestaurantData);

  const initRestaurant = (restaurantData) => {
    setRestaurant(restaurantData);
  };
  return (
    <RestaurantContext.Provider value={{ restaurant, initRestaurant }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContext;
