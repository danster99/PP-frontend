import React, { useReducer } from "react";

/*
Cart
type:{
      itemId: number,
      quantity: number,
    }[]
*/

// initialized with mock object for better autocompletion
const OrderContext = React.createContext({
  cart: [
    {
      itemId: "-1",
      quantity: 0,
    },
  ],
  addToCart: (itemId) => {},
});

const cartReducer = (state, action) => {
  switch (action.type) {
    case "add":
      if (state.find((item) => item.itemId === action.id)) {
        return state.map((item) =>
          item.itemId === action.id
            ? {
                itemId: item.itemId,
                quantity: item.quantity + 1,
              }
            : item
        );
      } else return [...state, { itemId: action.id, quantity: 1 }];
    default:
      throw new Error("Unkown Action");
  }
};

export const OrderContextProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (itemId) => {
    dispatch({ type: "add", id: itemId });
  };

  return (
    <OrderContext.Provider value={{ cart, addToCart }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
