import {combineReducers} from 'redux';
import user from './user_reducer';
import kindOfCategory from './categories_reducer';
import product from './product_reducer';

const rootReducer = combineReducers({
    user,
    kindOfCategory,
    product
});

export default rootReducer;