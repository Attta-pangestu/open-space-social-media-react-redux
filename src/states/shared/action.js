import api from "../../utils/api";
import { receiveTalksActionCreator } from "../talks/action";
import { receiveUsersActionCreator } from "../users/action";

function asyncPopulateUsersAndTalks() {
    return async (dispatch) => {
        try{
            // get data from api
            const users = await api.getAllUsers();
            const talks = await api.getAllTalks();
            
            //send to state dispatch
            dispatch(receiveUsersActionCreator(users));
            dispatch(receiveTalksActionCreator(talks));
        }catch(err) {
            alert(err.message);
        }
    };
}


export {asyncPopulateUsersAndTalks};