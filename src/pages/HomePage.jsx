import { useSelector, useDispatch } from "react-redux";
import { useInputWithLimitChar } from "../hooks/useInputWithLimitChar";
import { useEffect } from "react";

// action
import { asyncPopulateUsersAndTalks } from "../states/shared/action";
import { asyncToggleLikeTalk, asyncAddTalk} from "../states/talks/action";

// component
import TalkList from "../components/TalkList";


function HomePage() {
    const dispatch = useDispatch();
    const { users=[], talks=[], authUser } = useSelector((states) => states);

    // Talk Input
    const [text, setTextHandler] = useInputWithLimitChar({
        defaultVal: "",
        lengthChar: 320,
    });

    useEffect(() => {
        const fetchData = async () => {
        await dispatch(asyncPopulateUsersAndTalks());
        };
        fetchData();
    }, [dispatch]);


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

    const onAddTalkHandler = async () => {
        dispatch(asyncAddTalk(text));
    }


    return (
        // TalkInput
        <section className="home-page">
        <div className="talk-input">
            <textarea
            type="text"
            placeholder="what are you thinking"
            value={text}
            onChange={setTextHandler}
            />
            <p className="talk-input__char-left">
            <strong>{text.length}</strong>/320
            </p>
            <button type="submit" onClick={onAddTalkHandler} >Talk</button>
        </div>

        {/* Talk List */}
        <TalkList likeHandler={onLikeHandler} talksList={talkWithUsers}/>
        </section>
    );
    }

export default HomePage;