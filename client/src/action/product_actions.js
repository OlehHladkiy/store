import axios from 'axios';
import { ADD_PRODUCT_SUCCESS, ADD_PRODUCT_CLEAR, ADD_PRODUCT_ERROR } from '../types';
import { PRODUCT_SERVER } from '../services/linksApi';

const addProductSuccess = () => ({
    type: ADD_PRODUCT_SUCCESS
})

const addProductError = (message) => ({
    type: ADD_PRODUCT_ERROR,
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
        type: ADD_PRODUCT_CLEAR
    })
}