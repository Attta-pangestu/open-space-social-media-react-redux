import api from "../../utils/api"
import { setAuthUserActionCreator } from "../auth/action"
import { hideLoading, showLoading } from "react-redux-loading-bar"

const actionType = {
    setIsPreload : 'SET_IS_PRELOAD', 
}

function setIsPrealoadActionCreator(isPreload){
    return {
        type : actionType.setIsPreload,
        payload : {
            isPreload,
        } 
    }
}

function asyncPreloadProcess(){
    return async (dispatch) => {
        dispatch(showLoading());
        try{
            const authUser = await api.getOwnProfile();
            dispatch(setAuthUserActionCreator(authUser)) ; 
        }catch(err) {
            console.log(err);
            // fallback process
            dispatch(setAuthUserActionCreator(null));
        }finally{
            dispatch(setIsPrealoadActionCreator(false));
            dispatch(hideLoading());
        }
    }
}

export {actionType, setIsPrealoadActionCreator, asyncPreloadProcess};