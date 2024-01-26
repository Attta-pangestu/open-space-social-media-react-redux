import { actionType } from "./action";

actionType
function isPreloadReducer(isPreload=true, action={}) {
    switch(action.type) {
        case actionType.setIsPreload : 
            return  action.payload.isPreload;
        default:
            return isPreload;
    }
}

export default isPreloadReducer;