import { 
    OPEN_DIALOG, 
    CLOSE_DIALOG 
} from "../types";

export const openDialog = (article) => dispatch => {
    dispatch({
        type: OPEN_DIALOG,
        article
    })
}

export const closeDialog = () => dispatch => {
    dispatch({
        type: CLOSE_DIALOG
    })
}