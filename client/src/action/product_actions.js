import axios from 'axios';
import { 
    PRODUCT_ADD_SUCCESS, 
    PRODUCT_ADD_CLEAR, 
    PRODUCT_ADD_ERROR, 
    PRODUCT_FROM_SERVER_SUCCESS, 
    PRODUCT_FROM_SERVER_ERROR, 
    PRODUCT_FROM_SERVER_LAUNCHED } from '../types';
import { PRODUCT_SERVER } from '../services/linksApi';

const addProductSuccess = () => ({
    type: PRODUCT_ADD_SUCCESS
})

const addProductError = (message) => ({
    type: PRODUCT_ADD_ERROR,
    message
})

export const addProduct = (dataToSubmit) => async dispatch => {
    const { data } = await axios.post(`${PRODUCT_SERVER}/article`, dataToSubmit);

    if(data.success){
        dispatch(addProductSuccess());      
    } else {
        dispatch(addProductError(data.err.message));
    }
}

export const addProductClear = () => dispatch => {
    dispatch({
        type: PRODUCT_ADD_CLEAR
    })
}

const productsFromServerSuccess = (articles) => ({
    type: PRODUCT_FROM_SERVER_SUCCESS,
    articles
})

const productsFromServerError = (errorMessage) => ({
    type: PRODUCT_FROM_SERVER_ERROR,
    errorMessage
})

const productsFromServerLaunched = () => ({
    type: PRODUCT_FROM_SERVER_LAUNCHED
})

export const productsFromServer = (limit, skip, filters, previousData = []) => async (dispatch) => {
    dispatch(productsFromServerLaunched());
    const dataToSubmit = {
        limit,
        skip,
        filters
    }

    const { data } = await axios.post(`${PRODUCT_SERVER}/shop`, dataToSubmit);
    let newData = [
        ...previousData,
        ...data.articles
    ]
    
    if(data.success){
        dispatch(productsFromServerSuccess(newData));
    } else {
        dispatch(productsFromServerError(data.err.errmsg));
    }
}