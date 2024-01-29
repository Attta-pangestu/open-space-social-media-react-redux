/*
=========== STATES =======
*AllUSer, 
*UserProfile, 

*/

import api from "../../utils/api";

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

function asyncRegisterUser({id, username, password}){ 
    return async () => {
        try{
            const user =  await api.register({id, name : username, password}); 
            return {error : false, data : user}
        }catch(err){
            console.log(err);
            return {error : true, data : null}
        }
        
    }
}

export {actionType, receiveUsersActionCreator, asyncRegisterUser} ; 