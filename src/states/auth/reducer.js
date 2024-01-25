import { actionType } from "./action"

function authUserReducer(authUser=null, action={}) {
    switch (action.type) {
        case actionType.setAuthUser:
            return action.payload.authUser;
        case actionType.unsetAuthUser : 
            return null;
        default : 
        return authUser;
    }
    
}

export default authUserReducer;