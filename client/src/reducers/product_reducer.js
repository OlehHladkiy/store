import { ADD_PRODUCT_SUCCESS, ADD_PRODUCT_CLEAR, ADD_PRODUCT_ERROR } from "../types";

export default function(state = {}, action){
    switch(action.type){
        case ADD_PRODUCT_SUCCESS:
            return { ...state, isFetchingAddProduct: false, addProductSuccess: true }
        case ADD_PRODUCT_ERROR:
            return { ...state, isFetchingAddProduct: false, addProductSuccess: false, errorMessage: action.message}
            case ADD_PRODUCT_CLEAR:
            return { ...state, addProductSuccess: false }
        default:
            return state;
    }
}