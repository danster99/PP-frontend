// one function used for all cart data manipulation, for local cart
// on action.type we keep the identifier for the action we want to perform
// action.type enum: 'add' | 'remove' | 'increment-quantity' | 'decrement-quantity' | 'reinit' | 'add-item-with-quantity'
export const cartReducer = (state, action) => {
  switch (action.type) {
    // Add item to cart action
    case "add":
      // If item is already in cart => map state to return same array but with incremented quantity for the clicked item
      if (state.find((item) => item.item.id === action.item.id)) {
        const newState = state.map((item) =>
          item.item.id === action.item.id
            ? {
                item: item.item,
                quantity: item.quantity + 1,
              }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(newState));
        return newState;
      }
      // If new item is added we return the current state + new pushed item (from which we keep only the data that we need), with quantity set to 1
      else {
        const newState = [
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
        localStorage.setItem("cart", JSON.stringify(newState));
        return newState;
      }
    // loop over state and increment quantity for the desired item
    case "increment-quantity": {
      const newState = state.map((item) =>
        item.item.id === action.id
          ? {
              item: item.item,
              quantity: item.quantity + 1,
            }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    }
    // loop over state and decrement quantity for the desired item
    case "decrement-quantity": {
      const newState = state.map((item) =>
        item.item.id === action.id
          ? {
              item: item.item,
              quantity: item.quantity - 1,
            }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    }
    // filter out the item to be removed
    case "remove": {
      const newState = state.filter((item) => item.item.id !== action.id);
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    }
    case "reinit": {
      localStorage.setItem("cart", JSON.stringyfy([]));
      return [];
    }

    case "add-item-with-quantity":
      if (state.find((item) => item.item.id === action.item.item.id)) {
        const newState = state.map((item) =>
          item.item.id === action.item.item.id
            ? {
                item: item.item,
                quantity: item.quantity + action.item.quantity,
              }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(newState));
        return newState;
      }
      // If new item is added we return the current state + new pushed item (from which we keep only the data that we need), with quantity set to 1
      else {
        const newState = [
          ...state,
          {
            item: {
              id: action.item.item.id,
              name: action.item.item.name,
              price: parseFloat(action.item.item.price),
              b2StorageFile: action.item.item.b2StorageFile,
            },
            quantity: action.item.quantity,
          },
        ];
        localStorage.setItem("cart", JSON.stringify(newState));
        return newState;
      }
    default:
      throw new Error("Unkown Action");
  }
};

// keeps logic for 'add' action from cartReducer in order to manage the items fetched on init from the db cart (order)
// same action as in orderReducer, but it doesn't persist the state in localStorage, hence it is used for managing the remote cart
export const orderReducer = (state, action) => {
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
    default:
      throw new Error("Unkown Action");
  }
};
