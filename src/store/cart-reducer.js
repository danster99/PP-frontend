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
    case "reinit":
      return [];
    case "add-item-with-quantity":
      if (state.find((item) => item.item.id === action.item.item.id)) {
        return state.map((item) =>
          item.item.id === action.item.item.id
            ? {
                item: item.item,
                quantity: item.quantity + action.item.quantity,
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
              id: action.item.item.id,
              name: action.item.item.name,
              price: parseFloat(action.item.item.price),
              b2StorageFile: action.item.item.b2StorageFile,
            },
            quantity: action.item.quantity,
          },
        ];
    default:
      throw new Error("Unkown Action");
  }
};

export default cartReducer;
