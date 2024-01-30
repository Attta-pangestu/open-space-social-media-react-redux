import { useParams } from "react-router-dom";
import {  useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";


// component
import TalkItem from "../components/TalkItem";
import TalkDetail from "../components/TalkDetail";

// action
import { asyncReceiverTalkDetail } from "../states/talkDetail/action";

// api
import api from "../utils/api";
function DetailPage() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {talkDetail=null, authUser} = useSelector((states) => states);
    // const [talkDetail, setTalkDetail] = useState(null);
    
    useEffect(() => {
        console.log({id});
        dispatch(asyncReceiverTalkDetail(id));
    }, [dispatch, id]);
    
    
    if(talkDetail === null) {
        return null;
    }

    return(
        <section className="detail-page">
            <div className="detail-page__parent">
                <h3>Replying To</h3>
                {/* parent */}
                <TalkItem {...talkDetail.parent} userTalk={talkDetail.parent.user} />
                <TalkDetail {...talkDetail} userTalk={talkDetail.user} />
            </div>
        </section>
    );
}
export default DetailPage;