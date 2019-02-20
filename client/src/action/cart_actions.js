import { 
    CART_ITEM_ADD_SUCCESS, 
    CART_ITEM_CLEAR, 
    CART_ITEM_DELETE_SUCCESS, 
    CART_GET_ITEMS_SUCCESS,
    AMOUNT_CART_ITEMS,
} from '../types';

const CART_ARTICLES = "cartArticles";

const getDataFromLocalSt = (key) => {
    let items = JSON.parse(localStorage.getItem(key));
    return items;
}

const pushDataToLocalSt = (data, key) => {
    data = JSON.stringify(data);
    localStorage.setItem(key, data);
}

const cartChange = () => {
    let items = getDataFromLocalSt(CART_ARTICLES);
    return {
        type: AMOUNT_CART_ITEMS,
        length: items ? items.length : 0
    }
}

export const handleCartChange = () => dispatch => {
    dispatch(cartChange());
}

const addToCartHandler = (article, selectedParameters) => {
    let newItem = { article, selectedParameters };
    let newCartItems = [];
    let duplicate = false;
    let duplicateIndex = -1;

    let cartItems = getDataFromLocalSt(CART_ARTICLES);
    if(!cartItems) {
        cartItems = [];
    }

    cartItems.forEach((item, index) => {
        if(item.article._id === article._id){
            newItem.article.quantity++;
            duplicateIndex = index;
            duplicate = true;
        }
    })

    if(duplicate){
        cartItems[duplicateIndex] = newItem;

        newCartItems = [...cartItems];
    } else {
        newItem.article.quantity = 1;
        newCartItems = [...cartItems, newItem];
    }

    pushDataToLocalSt(newCartItems, CART_ARTICLES);

    return true;
}

const deleteFromCartHandler = (id) => {
    let cartItems = getDataFromLocalSt(CART_ARTICLES);
    let index = cartItems.findIndex(item => item.article._id === id);

    let newCartItems = [...cartItems.slice(0, index), ...cartItems.slice(index + 1)];

    pushDataToLocalSt(newCartItems, CART_ARTICLES);

    return newCartItems;
}

const addToCartSuccess = (articleId) => ({
    type: CART_ITEM_ADD_SUCCESS,
    articleId
})

const clearArticleId = () => ({
    type: CART_ITEM_CLEAR
})

export const addToCart = (article, selectedParameters) => dispatch => {
    let success = addToCartHandler(article, selectedParameters);

    if(success){
        dispatch(addToCartSuccess(article._id));
        dispatch(cartChange());
        setTimeout(() => {
            dispatch(clearArticleId());
        }, 2000);

    }
}

const deleteFromCartSuccess = (cartArticles) => ({
    type: CART_ITEM_DELETE_SUCCESS,
    cartArticles
})

export const deleteFromCart = (id) => dispatch => {
    let newData = deleteFromCartHandler(id);
    
    dispatch(cartChange());
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

export const updateCart = () => dispatch => {
    
}