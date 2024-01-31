import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

// action
import { asyncPopulateUsersAndTalks } from "../states/shared/action";
import { asyncToggleLikeTalk, asyncAddTalk} from "../states/talks/action";

// component
import TalkList from "../components/TalkList";
import TalkInput from "../components/TalkInput";

function HomePage() {
    const dispatch = useDispatch();
    const { users=[], talks=[], authUser } = useSelector((states) => states);
    const [talksWithUsers, setTalksWithUsers] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        await dispatch(asyncPopulateUsersAndTalks());
        };
        fetchData();
    }, [dispatch]);


    useEffect(() => {
        if(talks && users) {
            setTalksWithUsers(
                talks.map((talk) => {
                    return {
                        ...talk,
                        authUser: authUser.id, 
                        userTalk: authUser.id !== talk.user ? users.find((user) => talk.user === user.id) : {...authUser, name: "You" }  ,
                    };
                    })
            );
        }
    }, [talks, users, authUser])


    const onLikeHandler = async (talkId) => {
        await dispatch(asyncToggleLikeTalk(talkId));
    }

    const onAddTalkHandler = async (text) => {
        dispatch(asyncAddTalk(text));
    }


    return (
        <section className="home-page">
        {/* TalkInput */}
        <TalkInput onAddTalkHandler={onAddTalkHandler} />
        {/* Talk List */}
        {talksWithUsers &&  <TalkList likeHandler={onLikeHandler} talksList={talksWithUsers}/> }
        </section>
    );
    }

export default HomePage;