import { 
    PRODUCT_ADD_SUCCESS, 
    PRODUCT_ADD_CLEAR, 
    PRODUCT_ADD_ERROR, 
    PRODUCT_FROM_SERVER_LAUNCHED,
    PRODUCT_FROM_SERVER_SUCCESS, 
    PRODUCT_FROM_SERVER_ERROR
} from "../types";

export default function(state = {}, action){
    switch(action.type){
        case PRODUCT_ADD_SUCCESS:
            return { ...state, isFetchingAddProduct: false, addProductSuccess: true }
        case PRODUCT_ADD_ERROR:
            return { ...state, isFetchingAddProduct: false, addProductSuccess: false, errorMessage: action.message }
        case PRODUCT_ADD_CLEAR:
            return { ...state, addProductSuccess: null }
        case PRODUCT_FROM_SERVER_LAUNCHED: 
            return { ...state, isFetchingArticles: true }
        case PRODUCT_FROM_SERVER_SUCCESS:
            return { ...state,  isFetchingArticles: false, articles: action.articles, articlesSize: action.articlesSize }
        case PRODUCT_FROM_SERVER_ERROR:
            return { ...state, isFetchingArticles: false, errorMessage: action.errorMessage }
        default:
            return state;
    }
}