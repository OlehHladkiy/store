import {
  OPEN_BUY_DIALOG,
  CLOSE_BUY_DIALOG,
  OPEN_CART_DIALOG,
  CLOSE_CART_DIALOG
} from "../types/buy_types";

const initState = {
  openDialogStatus: false,
  openCartDialogStatus: false,
  article: null
};

export default function(state = initState, action) {
  switch (action.type) {
    case OPEN_BUY_DIALOG:
      return { ...state, openDialogStatus: true, article: action.article };
    case CLOSE_BUY_DIALOG:
      return { ...state, openDialogStatus: false, article: null };
    case OPEN_CART_DIALOG:
      return { ...state, openCartDialogStatus: true };
    case CLOSE_CART_DIALOG:
      return { ...state, openCartDialogStatus: false };
    default:
      return state;
  }
}
