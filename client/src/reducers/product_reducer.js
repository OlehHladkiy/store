import { 
    PRODUCT_ADD_SUCCESS, 
    PRODUCT_ADD_CLEAR, 
    PRODUCT_ADD_ERROR, 
    PRODUCT_FROM_SERVER_LAUNCHED,
    PRODUCT_FROM_SERVER_SUCCESS, 
    PRODUCT_FROM_SERVER_ERROR,
    GET_PRODUCT_LAUNCHED,
    SAVE_PRODUCT_SUCCESS,
    GET_PRODUCT_SUCCESS,
    CLEAR_PRODUCT,
    PRODUCT_ADD_LAUNCHED,
    REMOVE_PRODUCT_LAUNCHED,
    REMOVE_PRODUCT_SUCCESS
} from "../types";

export default function(state = {}, action){
    switch(action.type){
        case PRODUCT_ADD_SUCCESS:
            return { ...state, isFetchingAddProduct: false, addProductSuccess: true }
        case PRODUCT_ADD_ERROR:
            return { ...state, isFetchingAddProduct: false, addProductSuccess: false, errorMessage: action.message }
        case PRODUCT_ADD_CLEAR:
            return { ...state, addProductSuccess: null }
        case PRODUCT_ADD_LAUNCHED:
            return {...state, isFetchingAddProduct: true}
        case PRODUCT_FROM_SERVER_LAUNCHED: 
            return { ...state, isFetchingArticles: true }
        case PRODUCT_FROM_SERVER_SUCCESS:
            return { ...state,  isFetchingArticles: false, articles: action.articles, articlesSize: action.articlesSize }
        case PRODUCT_FROM_SERVER_ERROR:
            return { ...state, isFetchingArticles: false, errorMessage: action.errorMessage }
        case GET_PRODUCT_SUCCESS:
            return {...state, isFetchingProduct: false, updateArticle: action.article}
        case GET_PRODUCT_LAUNCHED:
            return {...state, isFetchingProduct: true}
        case CLEAR_PRODUCT:
            return {...state, updateArticle: null}
        case REMOVE_PRODUCT_LAUNCHED:
            return {...state, isFetchingRemoveProduct: true};
        case REMOVE_PRODUCT_SUCCESS: 
            return {...state, isFetchingRemoveProduct: false, articles: action.articles}
        default:
            return state;
    }
}