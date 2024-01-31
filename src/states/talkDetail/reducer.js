import { actionType } from "./action";

function talkDetailReducer(talkDetail=null, action={}) {
    switch(action.type) {
        case actionType.RECEIVE_TALK_DETAIL :
            return action.payload.talkDetail;
        case actionType.CLEAR_TALK_DETAIL :
            return null;
        case actionType.TOGGLE_TALK_LIKE :
            return {
                ...talkDetail,
                likes : talkDetail.likes.includes(action.payload.userId) ?
                        // remove user from likes
                        talkDetail.likes.filter((id) => id !== action.payload.userId )
                        :
                        // add user to likes
                        talkDetail.likes.concat([action.payload.userId]), 
            }
        default: 
            return talkDetail;
    }
}

export default talkDetailReducer;