import {combineReducers} from 'redux';
import user from './user_reducer';
import kindOfCategory from './categories_reducer';
import product from './product_reducer';
import buyDialog from './buy_dialog_reducer';

const rootReducer = combineReducers({
    user,
    buyDialog,
    kindOfCategory,
    product
});

export default rootReducer;