import { 
    OPEN_BUY_DIALOG, 
    CLOSE_BUY_DIALOG, 
    OPEN_CART_DIALOG,
    CLOSE_CART_DIALOG
} from "../types";

export const openBuyDialog = (article) => dispatch => {
    dispatch({
        type: OPEN_BUY_DIALOG,
        article
    })
}

export const closeBuyDialog = () => dispatch => {
    dispatch({
        type: CLOSE_BUY_DIALOG
    })
}

export const openCartDialog = () => dispatch => {
    dispatch({
        type: OPEN_CART_DIALOG
    })
}

export const closeCartDialog = () => dispatch => {
    dispatch({
        type: CLOSE_CART_DIALOG
    })
}