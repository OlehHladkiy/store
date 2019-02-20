import { 
    CART_ITEM_ADD_SUCCESS, 
    CART_ITEM_CLEAR,
    CART_GET_ITEMS_SUCCESS,
    CART_ITEM_DELETE_SUCCESS,
    AMOUNT_CART_ITEMS
} from '../types';

const initState = {
    addedToCartItem: ""
}

export default function(state = initState, action){
    switch(action.type){
        case CART_ITEM_ADD_SUCCESS:
            return {...state, addedToCartItem: action.articleId};
        case CART_ITEM_CLEAR:
            return {...state, addedToCartItem: ""};
        case CART_ITEM_DELETE_SUCCESS:
            return {...state, cartArticles: action.cartArticles };
        case CART_GET_ITEMS_SUCCESS:
            return {...state, cartArticles: action.cartArticles };
        case AMOUNT_CART_ITEMS:
            return {...state, cartLength: action.length}
        default:
            return state;
    }
}