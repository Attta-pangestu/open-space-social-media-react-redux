import { useParams } from "react-router-dom";
import {  useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";


// component
import TalkItem from "../components/TalkItem";

// action
import { asyncReceiverTalkDetail } from "../states/talkDetail/action";

// api
import api from "../utils/api";
function DetailPage() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {talkDetail=null} = useSelector((states) => states);
    // const [talkDetail, setTalkDetail] = useState(null);
    
    useEffect(() => {
        const fetchDetail = async () => {
            console.log("memanggil use Effect");
            await dispatch(asyncReceiverTalkDetail(id));
        };
        fetchDetail();
    }, [dispatch, id]);

    // useEffect(() => {
    //     (async() =>{
    //         const talkDetailData = await api.getDetailTalks(id);
    //         setTalkDetail(talkDetailData);
    //         console.log(talkDetail);
            
    //     }) ();
    // }, [])
    
    if(talkDetail === null) {
        return null;
    }

    return(
        <section className="detail-page">
            <div className="detail-page__parent">
                <h3>Replying To</h3>
                {/* parent */}
                <TalkItem {...talkDetail.parent} userTalk={talkDetail.parent.user} />
                <TalkItem {...talkDetail} userTalk={talkDetail.user} />
            </div>
        </section>
    );
}
export default DetailPage;