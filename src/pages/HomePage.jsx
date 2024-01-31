import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

// action
import { asyncPopulateUsersAndTalks } from "../states/shared/action";
import { asyncToggleLikeTalk, asyncAddTalk} from "../states/talks/action";

// component
import TalkList from "../components/TalkList";
import TalkInput from "../components/TalkInput";

function HomePage() {
    const dispatch = useDispatch();
    const { users=[], talks=[], authUser } = useSelector((states) => states);

    useEffect(() => {
        const fetchData = async () => {
        await dispatch(asyncPopulateUsersAndTalks());
        };
        fetchData();
    }, [dispatch]);


    useEffect(() => {
        console.log("talks has changed");
    }, [talks])



    const talkWithUsers = talks.map((talk) => {
        return {
            ...talk,
            authUser: authUser.id, 
            userTalk: authUser.id !== talk.user ? users.find((user) => talk.user === user.id) : {...authUser, name: "You" }  ,
        };
        });

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
        <TalkList likeHandler={onLikeHandler} talksList={talkWithUsers}/>
        </section>
    );
    }

export default HomePage;