
/*
STATE
* isPreLoad
* authUser
*/

import api from "../../utils/api";

const actionType = {
    setAuthUser : 'SET_AUTH_USER',
    unsetAuthUser : 'UNSET_AUTH_USER'
}



function setAuthUserActionCreator(authUser){
    return {
        type : actionType.setAuthUser, 
        payload: {
            authUser, 
        }
    }
}

function asyncSetAuthUser({id, password}){
    return async (dispatch) => {
        try {
            const token = await api.login({id,password});
            api.putAccessToken(token);
            const authUser = await api.getOwnProfile();
            // update state
            dispatch(setAuthUserActionCreator(authUser))
            return {error: false};
        }catch(err){
            alert(err.message);
            return {error: true};
        }
    };
}

function unsetAuthUserActionCreator() {
    return {
        type : actionType.unsetAuthUser, 
        payload : null
    }
}

function asyncUnsetAuthUser() {
    return async (dispatch) => {
        api.putAccessToken('');
        dispatch(unsetAuthUserActionCreator());
    }
}


export {
    actionType,
    setAuthUserActionCreator,
    unsetAuthUserActionCreator, 
    asyncSetAuthUser, 
    asyncUnsetAuthUser,
}