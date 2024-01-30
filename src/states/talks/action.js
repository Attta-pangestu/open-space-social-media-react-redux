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
    TOGGLE_LIKE_TALK: 'TOGGLE_LIKE_TALK', 
    TOGGLE_LIKE_TALK_FAILURE : 'TOGGLE_LIKE_TALK_FAILURE'
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
            console.log(err);
        }

    } 
}

function asyncToggleLikeTalk(talkId) {
    return async (dispatch, getState) => {
      const { authUser } = getState();
  
      // Update UI untuk menampilkan perubahan like secara langsung
      dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id }));
  
      try {
        await api.toggleLikeTalk(talkId); // Mengirimkan talkId ke fungsi toggleLikeTalk
  
        // Jika request berhasil, tidak perlu melakukan manipulasi data
  
      } catch (err) {
        console.log(err);
  
        // Jika request gagal, rollback toggle like dan manipulasi data
        dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id }));
  
        // Mengubah status fail dan pesan OK pada like state
        dispatch({
          type: actionType.TOGGLE_LIKE_TALK_FAILURE,
          payload: {
            talkId,
            status: 'fail',
            message: 'OK',
          },
        });
      }
    };
  }


export {
    actionType, 
    receiveTalksActionCreator, 
    addTalkActionCreator,  
    toggleLikeTalkActionCreator,  
    asyncAddTalk,
    asyncToggleLikeTalk
};