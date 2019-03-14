import { 
    CART_ITEM_ADD_SUCCESS, 
    CART_ITEM_CLEAR,
    AMOUNT_CART_ITEMS,
    GET_CART_ITEMS_BY_ID_SUCCESS,
    GET_CART_ITEMS_BY_ID_LAUNCHED
} from '../types/cart_types';

const initState = {
    addedToCartItem: "",
    cartArticles: [],
}

export default function(state = initState, action){
    switch(action.type){
        case CART_ITEM_ADD_SUCCESS:
            return {...state, addedToCartItem: action.articleId};
        case CART_ITEM_CLEAR:
            return {...state, addedToCartItem: ""};
        case GET_CART_ITEMS_BY_ID_LAUNCHED:
            return {...state, cartItemsFetching: true};
        case GET_CART_ITEMS_BY_ID_SUCCESS:
            return {...state, cartItemsFetching: false, cartArticles: action.cartArticles};
        case AMOUNT_CART_ITEMS:
            return {...state, cartLength: action.length}
        default:
            return state;
    }
}