/*
=========== STATES =======
*AllUSer, 
*UserProfile, 

*/

import api from "../../utils/api"

const actionType =  {
    RECEIVE_USERS : 'RECEIVE_USERS',
}

function receiveUsersActionCreator (users){
    return {
        type: actionType.RECEIVE_USERS, 
        payload: {
            users,
        }
    }
}

function asyncRegisterUser({id, name, password}){
    return async () => {
        try{
            await api.register({id, name, password}); 
        }catch(err){
            alert(err.message);
        }
        
    }
}

export {actionType, receiveUsersActionCreator, asyncRegisterUser} ; 