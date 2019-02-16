import {
    PRODUCT_GET_BRANDS_ERROR,
    PRODUCT_GET_BRANDS_SUCCESS,
    PRODUCT_GET_BRANDS_LAUNCHED,
    PRODUCT_DELETE_BRAND_SUCCESS, 
    PRODUCT_DELETE_BRAND_ERROR,
    PRODUCT_DELETE_BRAND_LAUNCHED,
    PRODUCT_ADD_BRAND_SUCCESS,
    PRODUCT_ADD_BRAND_ERROR,
    PRODUCT_ADD_BRAND_LAUNCHED,

    PRODUCT_GET_CATEGORIES_ERROR,
    PRODUCT_GET_CATEGORIES_SUCCESS,
    PRODUCT_GET_CATEGORIES_LAUNCHED,
    PRODUCT_DELETE_CATEGORY_SUCCESS, 
    PRODUCT_DELETE_CATEGORY_ERROR,
    PRODUCT_DELETE_CATEGORY_LAUNCHED,
    PRODUCT_ADD_CATEGORY_SUCCESS,
    PRODUCT_ADD_CATEGORY_ERROR,
    PRODUCT_ADD_CATEGORY_LAUNCHED,
    PRODUCT_UPDATE_BRAND_SUCCESS,
    PRODUCT_UPDATE_CATEGORY_SUCCESS
} from '../types'
import axios from 'axios';
import { PRODUCT_SERVER } from '../services/linksApi';

const getBrandsSuccess = (brands) => ({
    type: PRODUCT_GET_BRANDS_SUCCESS,
    brands
})

const getBrandsError = (errorMessage) => ({
    type: PRODUCT_GET_BRANDS_ERROR,
    errorMessage
})

const getBrandsLaunched = () => ({
    type: PRODUCT_GET_BRANDS_LAUNCHED
})

export const getBrands = () => async dispatch => {
    dispatch(getBrandsLaunched());
    const { data } = await axios.get(`${PRODUCT_SERVER}/brands`);

    if(data.success){
        dispatch(getBrandsSuccess(data.brands));
    } else {
        dispatch(getBrandsError(data.err));
    }
}

const deleteBrandSuccess = (brands) => ({
    type: PRODUCT_DELETE_BRAND_SUCCESS,
    brands
})

const deleteBrandError = (errorMessage) => ({
    type: PRODUCT_DELETE_BRAND_ERROR,
    errorMessage
})

const deleteBrandLaunched = () => ({
    type: PRODUCT_DELETE_BRAND_LAUNCHED
})

export const deleteBrand = (id, previousData) => async dispatch => {
    dispatch(deleteBrandLaunched());
    const { data } = await axios.delete(`${PRODUCT_SERVER}/brand?id=${id}`);

    if(data.success){
        let index = previousData.findIndex((item) => {
            return item._id === id
        })
        let newData = [...previousData.slice(0, index), ...previousData.slice(index + 1)];
        dispatch(deleteBrandSuccess(newData));
    } else {
        dispatch(deleteBrandError(data.err));
    }
}

const addBrandSuccess = (brands) => ({
    type: PRODUCT_ADD_BRAND_SUCCESS,
    brands
})

const addBrandError = (errorMessage) => ({
    type: PRODUCT_ADD_BRAND_ERROR,
    errorMessage
})

const addBrandLaunched = () => ({
    type: PRODUCT_ADD_BRAND_LAUNCHED
})

export const addBrand = (dataToSubmit, previousData) => async dispatch => {
    dispatch(addBrandLaunched());
    const {data} = await axios.post(`${PRODUCT_SERVER}/brand`, dataToSubmit);

    if(data.success){
        let newData = [...previousData, data.brand];
        dispatch(addBrandSuccess(newData));
    } else {
        dispatch(addBrandError(data.err))
    }
}

const getCategoriesSuccess = (categories) => ({
    type: PRODUCT_GET_CATEGORIES_SUCCESS,
    categories
})

const getCategoriesError = (errorMessage) => ({
    type: PRODUCT_GET_CATEGORIES_ERROR,
    errorMessage
})

const getCategoriesLaunched = () => ({
    type: PRODUCT_GET_CATEGORIES_LAUNCHED
})

export const getCategories = () => async dispatch => {
    dispatch(getCategoriesLaunched());
    const { data } = await axios.get(`${PRODUCT_SERVER}/categories`);

    if(data.success){
        dispatch(getCategoriesSuccess(data.categories));
    } else {
        console.log(data);
        dispatch(getCategoriesError(data.err));
    }
}

const addCategorySuccess = (categories) => ({
    type: PRODUCT_ADD_CATEGORY_SUCCESS,
    categories
})

const addCategoryError = (errorMessage) => ({
    type: PRODUCT_ADD_CATEGORY_ERROR,
    errorMessage
})

const addCategoryLaunched = () => ({
    type: PRODUCT_ADD_CATEGORY_LAUNCHED
})

export const addCategory = (dataToSubmit, previousData) => async dispatch => {
    dispatch(addCategoryLaunched());
    const {data} = await axios.post(`${PRODUCT_SERVER}/category`, dataToSubmit);

    if(data.success){
        let newData = [...previousData, data.category];
        dispatch(addCategorySuccess(newData));
    } else {
        dispatch(addCategoryError(data.err))
    }
}

const deleteCategorySuccess = (categories) => ({
    type: PRODUCT_DELETE_CATEGORY_SUCCESS,
    categories
})

const deleteCategoryError = (errorMessage) => ({
    type: PRODUCT_DELETE_CATEGORY_ERROR,
    errorMessage
})

const deleteCategoryLaunched = () => ({
    type: PRODUCT_DELETE_CATEGORY_LAUNCHED
})

export const deleteCategory = (id, previousData) => async dispatch => {
    dispatch(deleteCategoryLaunched());
    const { data } = await axios.delete(`${PRODUCT_SERVER}/category?id=${id}`);

    if(data.success){
        let index = previousData.findIndex((item) => {
            return item._id === id
        })
        let newData = [...previousData.slice(0, index), ...previousData.slice(index + 1)];
        dispatch(deleteCategorySuccess(newData));
    } else {
        dispatch(deleteCategoryError(data.err));
    }
}

const updateBrandSuccess = (brands) => ({
    type: PRODUCT_UPDATE_BRAND_SUCCESS,
    brands
})

export const updateBrand = (dataToSubmit, previousData, id) => async dispatch => {
    const { data } = await axios.post(`${PRODUCT_SERVER}/updateBrand?id=${id}`, dataToSubmit);
    if(data.success){
        let index = previousData.findIndex((item) => {
            return item._id === id
        })
        const newData = [...previousData];
        newData[index].name = dataToSubmit.name;
        dispatch(updateBrandSuccess(newData));
    }
}

const updateCategorySuccess = (categories) => ({
    type: PRODUCT_UPDATE_CATEGORY_SUCCESS,
    categories
})

export const updateCategory = (dataToSubmit, previousData, id) => async dispatch => {
    const { data } = await axios.post(`${PRODUCT_SERVER}/updateCategory?id=${id}`, dataToSubmit);
    if(data.success){
        let index = previousData.findIndex((item) => {
            return item._id === id
        })
        const newData = [...previousData];
        newData[index].name = dataToSubmit.name;
        dispatch(updateCategorySuccess(newData));
    }
}