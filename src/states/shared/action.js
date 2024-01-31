import api from "../../utils/api";
import { receiveTalksActionCreator } from "../talks/action";
import { receiveUsersActionCreator } from "../users/action";
import { showLoading, hideLoading } from "react-redux-loading-bar";

function asyncPopulateUsersAndTalks() {
    return async (dispatch) => {
        dispatch(showLoading());
        try{
            // get data from api
            const users = await api.getAllUsers();
            const talks = await api.getAllTalks();
            //send to state dispatch
            dispatch(receiveUsersActionCreator(users));
            dispatch(receiveTalksActionCreator(talks));
        }catch(err) {
            alert(err.message);
        }finally{
            dispatch(hideLoading())
        }
    };
}


export {asyncPopulateUsersAndTalks};