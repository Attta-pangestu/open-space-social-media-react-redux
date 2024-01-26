/*
========== STATES =======
*AllTalks
*DetailTalks
*SingleTalk
*/


import api from "../../utils/api";

const actionType = {
    RECEIVE_TALKS: 'RECEIVE_TALKS', 
    ADD_TALK : 'ADD_TALK', 
    TOGGLE_LIKE_TALK: 'TOGGLE_LIKE_TALK'
}; 


function receiveTalksActionCreator(talks) {
    return {
        type: actionType.RECEIVE_TALKS, 
        payload: {
            talks,
        }
    }
}

function addTalkActionCreator(talk) {
    return {
        type: actionType.ADD_TALK, 
        payload: {
            talk,
        }
    }
}

function toggleLikeTalkActionCreator({talkId, userId}){
    return{
        type: actionType.TOGGLE_LIKE_TALK,
        payload: {
            talkId,
            userId,
        }
    }
}

function asyncAddTalk(text,replyTo=''){
    return async (dispatch) => {
        try{
            const talk = await api.createNewTalk(text,replyTo);
            dispatch(addTalkActionCreator(talk));
        }catch(err){
            alert(err.message);
        }

    } 
}

function asyncToggleLikeTalk(talkId) {
    return async (dispatch, getState) => {
        const {authUser} = getState();
        // update UI first
        dispatch(toggleLikeTalkActionCreator({talkId, userId : authUser.id})); 
        // update database
        try{
            await api.toggleLikeTalk(talkId);
        }catch(err){
            alert(err.message);
            // rollback toggle like
            dispatch(toggleLikeTalkActionCreator({talkId, userId : authUser.id})); 
        }
        
    }
}


export {
    actionType, 
    receiveTalksActionCreator, 
    addTalkActionCreator,  
    toggleLikeTalkActionCreator,  
    asyncAddTalk,
    asyncToggleLikeTalk
};