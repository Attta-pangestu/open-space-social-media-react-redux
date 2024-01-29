import { actionType } from "./action";

function talksReducer(talks=[], action={}) {
    switch(action.type) {
        case actionType.RECEIVE_TALKS:
            return action.payload.talks;
        case actionType.ADD_TALK :
            return [...talks, action.payload.talk];
        case actionType.TOGGLE_LIKE_TALK:
            return talks.map((talk) => {
            const {payload : {userId, talkId}} = action;
            if(talk.id === talkId) {
                return {...talk, 
                likes : talk.likes.includes(userId) ?
                        // remove user from  likes person
                        talk.likes.filter((id) => id !== userId )
                        : 
                        // add user to likes array
                        talk.likes.concat([userId]),
                }
            }
            return talk;
            }); 
        default:
            return talks; 
    }
}


export default talksReducer;