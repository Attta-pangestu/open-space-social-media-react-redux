import api from "../../utils/api"
import { setAuthUserActionCreator } from "../auth/action"

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
        try{
            const authUser = await api.getOwnProfile();
            dispatch(setAuthUserActionCreator(authUser)) ; 
        }catch(err) {
            console.log(err);
            // fallback process
            dispatch(setAuthUserActionCreator(null));
        }finally{
            dispatch(setIsPrealoadActionCreator(false));
        }
        
    }
}

export {actionType, setIsPrealoadActionCreator, asyncPreloadProcess};