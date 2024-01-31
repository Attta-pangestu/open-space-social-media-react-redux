import { useParams } from "react-router-dom";
import {  useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";


// component
import TalkItem from "../components/TalkItem";
import TalkDetail from "../components/TalkDetail";
import TalkReplyInput from "../components/TalkReplyInput";
// action
import { asyncReceiverTalkDetail, toggleLikeDetailActionCreator } from "../states/talkDetail/action";
import { asyncAddTalk } from "../states/talks/action";
import { asyncToggleLikeTalkDetail } from "../states/talkDetail/action";

function DetailPage() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {talkDetail=null, authUser} = useSelector((states) => states);
    
    useEffect(() => {
        dispatch(asyncReceiverTalkDetail(id));
    }, [dispatch, id]);

    const replyTextAPIHandler = (text) => {
        dispatch(asyncAddTalk(text,id));
    }

    const likeHandlerAPI = () => {
        dispatch(asyncToggleLikeTalkDetail(authUser.id));
    }
    
    if(!talkDetail) {
        return null;
    }

    return(
        <section className="detail-page">
            <div className="detail-page__parent">
                {
                    talkDetail.parent  && ( 
                        <>
                        <h3>Replying To</h3>
                        <TalkItem {...talkDetail.parent} userTalk={talkDetail.parent.user} />
                    </>
                    )
                }
                <TalkDetail {...talkDetail} authUser={authUser.id} userTalk={talkDetail.user} likeHandler={likeHandlerAPI} />
                <TalkReplyInput replyTextAPIHandler={replyTextAPIHandler} />
            </div>
        </section>
    );
}
export default DetailPage;