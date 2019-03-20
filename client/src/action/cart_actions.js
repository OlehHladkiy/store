import { 
    CART_ITEM_ADD_SUCCESS, 
    CART_ITEM_CLEAR, 
    CART_ITEM_DELETE_SUCCESS, 
    GET_CART_ITEMS_BY_ID_SUCCESS,
    GET_CART_ITEMS_BY_ID_LAUNCHED,
    CART_GET_ITEMS_SUCCESS,
    AMOUNT_CART_ITEMS,
    CART_UPDATE_SUCCESS,
} from '../types/cart_types';
import axios from 'axios';
import { PRODUCT_SERVER } from '../services/linksApi';

const CART_ARTICLES = "cartArticles";

const getDataFromLocalSt = (key) => {
    let items = JSON.parse(localStorage.getItem(key));  
    return items;
}

const pushDataToLocalSt = (data, key) => {
    data = JSON.stringify(data);
    localStorage.setItem(key, data);
}

const getCartItemsByIdLaunched = () => ({
    type: GET_CART_ITEMS_BY_ID_LAUNCHED
})

const getCartItemsByIdSuccess = (cartArticles) => ({
    type: GET_CART_ITEMS_BY_ID_SUCCESS,
    cartArticles
})

export const getCartItemsById = () => async dispatch => {
    dispatch(getCartItemsByIdLaunched());
    let items = JSON.parse(localStorage.getItem(CART_ARTICLES));
    if(items && items.length > 0){
        let ids = items.map(item => item.articleId);
        const {data} = await axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${ids}&type=array`);
        let newData = data.map((item, i) => {
            let index = items.findIndex(el => el.articleId === item._id);
            return {
                article: item,
                selectedParameters: items[index].selectedParameters
            }
        })
        dispatch(getCartItemsByIdSuccess(newData));
    } else {
        dispatch(getCartItemsByIdSuccess([]));
    }
}

const calculateCartItems = () => {
    let items = getDataFromLocalSt(CART_ARTICLES);
    return {
        type: AMOUNT_CART_ITEMS,
        length: items ? items.length : 0
    }
}

export const handleCalculateCartItems = () => dispatch => {
    dispatch(calculateCartItems());
}

const addToCartHandler = (articleId, selectedParameters) => {
    let newItem = { articleId, selectedParameters };
    let newCartItems = [];
    let duplicateIndex = -1;

    let cartItems = getDataFromLocalSt(CART_ARTICLES);
    if(!cartItems) {
        cartItems = [];
    }

    cartItems.forEach((item, index) => {
        if(item.articleId === articleId){
            duplicateIndex = index;
        } 
    });

    if(duplicateIndex == -1){
        newItem.selectedParameters.quantity = 1;
        newCartItems = [...cartItems, newItem];
    } else {
        newCartItems = [...cartItems];
    }

    pushDataToLocalSt(newCartItems, CART_ARTICLES);

    return true;
}


const clearArticleId = () => ({
    type: CART_ITEM_CLEAR
})

const addToCartSuccess = (articleId) => ({
    type: CART_ITEM_ADD_SUCCESS,
    articleId
})

export const addToCart = (articleId, selectedParameters) => dispatch => {
    let success = addToCartHandler(articleId, selectedParameters);

    if(success){
        dispatch(addToCartSuccess(articleId));
        dispatch(calculateCartItems());
        setTimeout(() => {
            dispatch(clearArticleId());
        }, 2000);
    }
}

const deleteFromCartHandler = (id) => {
    let cartItems = getDataFromLocalSt(CART_ARTICLES);
    let index = cartItems.findIndex(item => item.articleId === id);

    let newCartItems = [...cartItems.slice(0, index), ...cartItems.slice(index + 1)];

    pushDataToLocalSt(newCartItems, CART_ARTICLES);

    return newCartItems;
}

const deleteFromCartSuccess = (cartArticles) => ({
    type: CART_ITEM_DELETE_SUCCESS,
    cartArticles
})

export const deleteFromCart = (id) => dispatch => {
    let newData = deleteFromCartHandler(id);
    
    dispatch(calculateCartItems());
    dispatch(deleteFromCartSuccess(newData));
}

const getCartDataSuccess = (cartArticles) => ({
    type: CART_GET_ITEMS_SUCCESS,
    cartArticles
})

export const getCartData = () => dispatch => {
    let cartData = getDataFromLocalSt(CART_ARTICLES);

    dispatch(getCartDataSuccess(cartData));
}

const updateCartSuccess = (cartArticles) => ({
    type: CART_UPDATE_SUCCESS,
    cartArticles
})

export const updateCart = (id, selectedParameters) => dispatch => {
    let cartData = [...getDataFromLocalSt(CART_ARTICLES)];

    let findItem = cartData.find((item) => item.articleId === id);
    findItem.selectedParameters = selectedParameters;

    pushDataToLocalSt(cartData, CART_ARTICLES);
    dispatch(updateCartSuccess(cartData));
}