import { 
    OPEN_DIALOG, 
    CLOSE_DIALOG 
} from "../types";

const defaultState = {
    openDialogStatus: false,
    article: null
};

export default function(state = defaultState, action){
    switch(action.type){
        case OPEN_DIALOG:
            return { ...state, openDialogStatus: true, article: action.article };
        case CLOSE_DIALOG:
            return { ...state, openDialogStatus: false, article: null }
        default: 
            return state;
    }
}