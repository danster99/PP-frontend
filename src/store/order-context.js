import React, { useReducer, useState } from "react";
import useHttp from "../hooks/useHttp";
import { API_URL } from "../config/config";
import { cartReducer, orderReducer } from "./cart-reducer";

/*
Cart
type: array of items with 2 properties: item (keeps item relevant data) & quantity
    {
      item: {
        id: number,
        name: string,
        price: number,
        b2StorageFile: string,
      },
      quantity: number,
    }[]

CartDetails type:
    {
      id: number,
      status: "Open" | "Closed",
      table: number,
      closedAt: string,
      total: string,
    }
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
  check: [
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
  cartDetails: {
    id: 0,
    status: "Open",
    table: 1,
    closedAt: "",
    total: 0,
    items: [],
  },
  setCart: async (fetchedCart) => {},
  sendCart: async () => {},
  addToCart: (item) => {},
  incrementItem: (itemId) => {},
  decrementItem: (itemId) => {},
  removeItem: (itemId) => {},
});

export const OrderContextProvider = ({ children }) => {
  // if we have data in local storage, we use it as an initial cart
  const initialCart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const [check, dispatchCheck] = useReducer(orderReducer, []);
  const [cartDetails, setCartDetails] = useState({});

  const { sendRequest } = useHttp();

  const setCart = async (fetchedCart) => {
    // 1) Set current cart details (from current table)
    if (!fetchedCart) return;
    setCartDetails({ ...fetchedCart, items: undefined });

    try {
      // 2) Group and execute calls to get item data for each data
      const itemsArr = await Promise.all(
        fetchedCart.items.map((item) => {
          return sendRequest({ url: `${API_URL}/item/${item}/` }, null, true);
        })
      );

      // 3) Add each fetched item into the cart with "add" action
      itemsArr.forEach(
        (item) => item && dispatchCheck({ type: "add", item: item })
      );
    } catch (err) {
      // 4) If we catch an error we throw it further to be handled with an alert in the View
      throw new Error(err.message);
    }
  };

  // Kept for future use, if needed (function configures a promise for removing an item from database cart)
  // const removeOneItemFromDb = (itemId) => {
  //   const reqConfig = {
  //     url: `${API_URL}/cart/${cartDetails.id}/remove_item/`,
  //     method: "PUT",
  //     body: {
  //       item: itemId,
  //     },
  //   };
  //   // returns configured promise that will remove an item to the cart in the database
  //   return sendRequest(reqConfig, null, true);
  // };

  const addOneItemToDb = async (itemId) => {
    const reqConfig = {
      url: `${API_URL}/cart/${cartDetails.id}/add_item/`,
      method: "PUT",
      body: {
        item: itemId,
      },
    };

    // returns configured promise that will add an item to the cart in the database
    return sendRequest(reqConfig, null, true);
  };

  const sendCart = async () => {
    // Prepare an array with item ids that will be added to the remote cart
    const items = cart
      .map((item) =>
        new Array(item.quantity).fill(item.item.id, 0, item.quantity)
      )
      .flat();

    // await 'put' operations to finish
    try {
      await Promise.all(
        items.map((item) => {
          return addOneItemToDb(item);
        })
      );
      // local cart items are pushed into the orderCart
      cart.forEach((item) => {
        dispatchCheck({ type: "add-item-with-quantity", item: item });
      });
      // local cart is reinitialized
      dispatch({ type: "reinit" });
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const addToCart = (item) => {
    dispatch({ type: "add", item: item });
  };

  const incrementItem = (itemId) => {
    dispatch({ type: "increment-quantity", id: itemId });
  };

  const decrementItem = (itemId) => {
    dispatch({ type: "decrement-quantity", id: itemId });
  };

  const removeItem = async (itemId) => {
    dispatch({ type: "remove", id: itemId });
  };

  return (
    <OrderContext.Provider
      value={{
        cart,
        check,
        cartDetails,
        sendCart,
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
