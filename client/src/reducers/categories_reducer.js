import {
    PRODUCT_GET_BRANDS_ERROR,
    PRODUCT_GET_BRANDS_SUCCESS,
    PRODUCT_GET_BRANDS_LAUNCHED,
    PRODUCT_DELETE_BRAND_SUCCESS, 
    PRODUCT_DELETE_BRAND_ERROR,
    PRODUCT_DELETE_BRAND_LAUNCHED,
    PRODUCT_ADD_BRAND_LAUNCHED,
    PRODUCT_ADD_BRAND_SUCCESS,
    PRODUCT_ADD_BRAND_ERROR,
    PRODUCT_UPDATE_BRAND_SUCCESS,

    PRODUCT_GET_CATEGORIES_ERROR,
    PRODUCT_GET_CATEGORIES_SUCCESS,
    PRODUCT_GET_CATEGORIES_LAUNCHED,
    PRODUCT_DELETE_CATEGORY_SUCCESS, 
    PRODUCT_DELETE_CATEGORY_ERROR,
    PRODUCT_DELETE_CATEGORY_LAUNCHED,
    PRODUCT_ADD_CATEGORY_SUCCESS,
    PRODUCT_ADD_CATEGORY_ERROR,
    PRODUCT_ADD_CATEGORY_LAUNCHED,
    PRODUCT_UPDATE_CATEGORY_SUCCESS
} from '../types'

export default function(state = {}, action){
    switch(action.type){
        case PRODUCT_GET_BRANDS_LAUNCHED:
            return { ...state, isFetchingBrands: true };
        case PRODUCT_GET_BRANDS_SUCCESS:
            return { ...state, isFetchingBrands: false, brands: action.brands};
        case PRODUCT_GET_BRANDS_ERROR:
            return { ...state, isFetchingBrands: false, errorMessage: action.errorMessage };
        case PRODUCT_DELETE_BRAND_LAUNCHED:
            return { ...state, isFetchingDeleteBrand: true};
        case PRODUCT_DELETE_BRAND_SUCCESS:
            return { ...state, isFetchingDeleteBrand: false, brands: action.brands };
        case PRODUCT_DELETE_BRAND_ERROR:
            return { ...state, isFetchingDeleteBrand: false, errorMessage: action.errorMessage};
        case PRODUCT_ADD_BRAND_LAUNCHED: 
            return { ...state, isFetchingAddBrand: true};
        case PRODUCT_ADD_BRAND_SUCCESS:
            return { ...state, isFetchingAddBrand: false, brands: action.brands};
        case PRODUCT_ADD_BRAND_ERROR:
            return { ...state, isFetchingAddBrand: false, errorMessage: action.errorMessage};
        case PRODUCT_UPDATE_BRAND_SUCCESS: 
            return { ...state, brands: action.brands};
        case PRODUCT_UPDATE_CATEGORY_SUCCESS: 
            return { ...state, categories: action.categories};
        case PRODUCT_GET_CATEGORIES_LAUNCHED:
            return { ...state, isFetchingCategories: true };
        case PRODUCT_GET_CATEGORIES_SUCCESS:
            return { ...state, isFetchingCategories: false, categories: action.categories};
        case PRODUCT_GET_CATEGORIES_ERROR:
            return { ...state, isFetchingCategories: false, errorMessage: action.errorMessage };
        case PRODUCT_DELETE_CATEGORY_LAUNCHED:
            return { ...state, isFetchingDeleteCategory: true};
        case PRODUCT_DELETE_CATEGORY_SUCCESS:
            return { ...state, isFetchingDeleteCategory: false, categories: action.categories };
        case PRODUCT_DELETE_CATEGORY_ERROR:
            return { ...state, isFetchingDeleteCategory: false, errorMessage: action.errorMessage};
        case PRODUCT_ADD_CATEGORY_LAUNCHED: 
            return { ...state, isFetchingAddCategory: true};
        case PRODUCT_ADD_CATEGORY_SUCCESS:
            return { ...state, isFetchingAddCategory: false, categories: action.categories};
        case PRODUCT_ADD_CATEGORY_ERROR:
            return { ...state, isFetchingAddCategory: false, errorMessage: action.errorMessage};
        default:
            return state;
    }
}