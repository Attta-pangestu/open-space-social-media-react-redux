
/*
STATE
* isPreLoad
* authUser
*/

const actionType = {
    setIsPreload : 'SET_IS_PRELOAD', 
    setAuthUser : 'SET_AUTH_USER',
    unsetAuthUser : 'UNSET_AUTH_USER'
}

function setIsPrealoadActionCreator(){
    return {
        type : actionType.setIsPreload, 
    }
}

function setAuthUserActionCreator(token){
    return {
        type : actionType.setAuthUser, 
        payload: {
            token, 
        }
    }
}

function unsetAuthUserActionCreator() {
    return {
        type : actionType.unsetAuthUser, 
    }
}


export {
    setIsPrealoadActionCreator,
    setAuthUserActionCreator,
    unsetAuthUserActionCreator, 
}