import React, { useReducer, useState } from "react";

/*
Cart
type:{
      itemId: {
        id: number,
        name: string,
        price: number,
        b2StorageFile: string,
      },
      quantity: number,
    }[]
*/

// initialized with mock object for better autocompletion
const OrderContext = React.createContext({
  cart: [
    {
      item: {
        id: "-1",
        name: "",
        price: 2,
        b2StorageFile: "",
      },
      quantity: 0,
    },
  ],
  items: [],
  cartDetails: {
    id: 0,
    status: "Open",
    table: 1,
    closedAt: "",
    total: 0,
  },
  setCart: (fetchedCart) => {},
  addToCart: (item) => {},
  incrementItem: (itemId) => {},
  decrementItem: (itemId) => {},
  removeItem: (itemId) => {},
});

// one function used for all cart data manipulation
// on action.type we keep the identifier for the action we want to perform
// action.type enum: 'add' | 'remove' | 'increment-quantity' | 'decrement-quantity'
const cartReducer = (state, action) => {
  switch (action.type) {
    // Add item to cart action
    case "add":
      // If item is already in cart => map state to return same array but with incremented quantity for the clicked item
      if (state.find((item) => item.item.id === action.item.id)) {
        return state.map((item) =>
          item.item.id === action.item.id
            ? {
                item: item.item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }
      // If new item is added we return the current state + new pushed item (from which we keep only the data that we need), with quantity set to 1
      else
        return [
          ...state,
          {
            item: {
              id: action.item.id,
              name: action.item.name,
              price: parseFloat(action.item.price),
              b2StorageFile: action.item.b2StorageFile,
            },
            quantity: 1,
          },
        ];

    // loop over state and increment quantity for the desired item
    case "increment-quantity":
      return state.map((item) =>
        item.item.id === action.id
          ? {
              item: item.item,
              quantity: item.quantity + 1,
            }
          : item
      );
    // loop over state and decrement quantity for the desired item
    case "decrement-quantity":
      return state.map((item) =>
        item.item.id === action.id
          ? {
              item: item.item,
              quantity: item.quantity - 1,
            }
          : item
      );
    // filter out the item to be removed
    case "remove":
      return state.filter((item) => item.item.id !== action.id);
    default:
      throw new Error("Unkown Action");
  }
};

export const OrderContextProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [cartDetails, setCartDetails] = useState({});

  const addToCart = (item) => {
    // here we use the dispatch function to specify the action we want to perform + the payload (action.item in this situation)
    dispatch({ type: "add", item: item });
  };

  const incrementItem = (itemId) => {
    dispatch({ type: "increment-quantity", id: itemId });
  };

  const decrementItem = (itemId) => {
    dispatch({ type: "decrement-quantity", id: itemId });
  };

  const removeItem = (itemId) => {
    dispatch({ type: "remove", id: itemId });
  };

  const setCart = async (cart) => {
    const fetchedCartDetails = {
      id: cart.id,
      status: cart.status,
      table: cart.table,
      closedAt: cart.closed_at,
      total: cart.total,
    };
    setCartDetails(fetchedCartDetails);
  };

  return (
    <OrderContext.Provider
      value={{
        cart,
        cartDetails,
        setCart,
        addToCart,
        incrementItem,
        decrementItem,
        removeItem,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
