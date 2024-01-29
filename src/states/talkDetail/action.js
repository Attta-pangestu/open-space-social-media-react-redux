/*
============= STATES =========
* receivetalkDetail

*/
import api from "../../utils/api"

const actionType = {
    RECEIVE_TALK_DETAIL: 'RECEIVE_TALK_DETAIL', 
    CLEAR_TALK_DETAIL: 'CLEAR_TALK_DETAIL', 
    TOGGLE_TALK_LIKE: 'TOGGLE_TALK_LIKE' 
}

function receiveTalkDetailActionCreator(talkDetail) {
    return {
        type: actionType.RECEIVE_TALK_DETAIL, 
        payload: {
            talkDetail,
        }
    }
}

function asyncReceiverTalkDetail(id){
    return async (dispatch) => {
        // clear previous talk detail
        dispatch(clearTalkDetailActionCreator());
        try{
            const talkDetail = await api.getDetailTalks(id);
            console.log({talkDetail});
            dispatch(receiveTalkDetailActionCreator(talkDetail));
        } catch(err) {
            alert(err.message);
        }
        
    }
}


function clearTalkDetailActionCreator() {
    return {
        type: actionType.RECEIVE_TALK_DETAIL, 
    }
}


function toggleLikeDetailActionCreator(userId){
    return {
        type: actionType.TOGGLE_TALK_LIKE, 
        payload: {
            userId,
        }
    }
}

function asyncToggleLikeTalkDetail(){
    return async (dispatch, getState) => {
        const {authUser, talks} =  getState();
        // change UI 
        dispatch(toggleLikeDetailActionCreator(authUser.id));
        
        // change the database
        try{
            await api.toggleLikeTalk(talks.id);
        }catch(err){
            alert(err.message);
            // fallback
            dispatch(toggleLikeDetailActionCreator(authUser.id));
            
        }
    };
}


export {
    actionType, 
    receiveTalkDetailActionCreator, 
    clearTalkDetailActionCreator, 
    toggleLikeDetailActionCreator, 
    asyncReceiverTalkDetail, 
    asyncToggleLikeTalkDetail, 
};


