import axios from "axios";
import {
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_CLEAR,
  PRODUCT_ADD_ERROR,
  PRODUCT_FROM_SERVER_SUCCESS,
  PRODUCT_FROM_SERVER_ERROR,
  PRODUCT_FROM_SERVER_LAUNCHED,
  PRODUCT_ADD_TO_CART_SUCCESS,
  SAVE_PRODUCT_SUCCESS,
  GET_PRODUCT_SUCCESS,
  CLEAR_PRODUCT,
  GET_PRODUCT_LAUNCHED,
  PRODUCT_ADD_LAUNCHED,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_LAUNCHED
} from "../types/product_types";
import { PRODUCT_SERVER } from "../services/linksApi";

const addProductSuccess = () => ({
  type: PRODUCT_ADD_SUCCESS
});

const addProductError = message => ({
  type: PRODUCT_ADD_ERROR,
  message
});

const addProductLaunched = () => ({
  type: PRODUCT_ADD_LAUNCHED
});

export const addProduct = dataToSubmit => async dispatch => {
  dispatch(addProductLaunched());
  const { data } = await axios.post(`${PRODUCT_SERVER}/article`, dataToSubmit);

  if (data.success) {
    dispatch(addProductSuccess());
  } else {
    dispatch(addProductError(data.err.message));
  }
};

export const addProductClear = () => dispatch => {
  dispatch({
    type: PRODUCT_ADD_CLEAR
  });
};

const getProductSuccess = article => ({
  type: GET_PRODUCT_SUCCESS,
  article
});

const getProductLaunched = () => ({
  type: GET_PRODUCT_LAUNCHED
});

export const getProduct = id => async dispatch => {
  dispatch(getProductLaunched());
  const { data } = await axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${id}`);

  if (data) {
    dispatch(getProductSuccess(data[0]));
  }
};

const saveProductSuccess = () => ({
  type: SAVE_PRODUCT_SUCCESS
});

export const saveProduct = (dataToSubmit, id) => async dispatch => {
  const { data } = await axios.post(
    `${PRODUCT_SERVER}/updateArticle?id=${id}`,
    dataToSubmit
  );
  if (data.success) {
    dispatch(saveProductSuccess());
  }
};

export const clearUpdateStatus = () => dispatch => {
  dispatch({
    type: CLEAR_PRODUCT
  });
};

const removeArticleLaunched = () => ({
  type: REMOVE_PRODUCT_LAUNCHED
});

const removeArticleSuccess = articles => ({
  type: REMOVE_PRODUCT_SUCCESS,
  articles
});

export const removeArticle = (id, previousData) => async dispatch => {
  dispatch(removeArticleLaunched());
  const { data } = await axios.delete(
    `${PRODUCT_SERVER}/remove_article?id=${id}`
  );

  if (data.success) {
    let index = previousData.findIndex(item => item._id === id);
    let newArticles = [
      ...previousData.slice(0, index),
      ...previousData.slice(index + 1)
    ];
    dispatch(removeArticleSuccess(newArticles));
  }
};

const productsFromServerSuccess = (articles, articlesSize, wholeSize) => ({
  type: PRODUCT_FROM_SERVER_SUCCESS,
  articles,
  articlesSize,
  wholeSize
});

const productsFromServerError = errorMessage => ({
  type: PRODUCT_FROM_SERVER_ERROR,
  errorMessage
});

const productsFromServerLaunched = () => ({
  type: PRODUCT_FROM_SERVER_LAUNCHED
});

export const productsFromServer = (
  limit,
  skip,
  filters,
  previousData = []
) => async dispatch => {
  dispatch(productsFromServerLaunched());
  const dataToSubmit = {
    limit,
    skip,
    filters
  };

  const { data } = await axios.post(`${PRODUCT_SERVER}/shop`, dataToSubmit);
  let newData = [...previousData, ...data.articles];

  if (data.success) {
    dispatch(productsFromServerSuccess(newData, data.size, data.wholeSize));
  } else {
    dispatch(productsFromServerError(data.err.errmsg));
  }
};
