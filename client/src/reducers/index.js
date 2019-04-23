import { combineReducers } from "redux";
import user from "./user_reducer";
import kindOfCategory from "./categories_reducer";
import product from "./product_reducer";
import dialogs from "./dialogs_reducer";
import cart from "./cart_reducer";

const rootReducer = combineReducers({
  user,
  dialogs,
  cart,
  kindOfCategory,
  product
});

export default rootReducer;
