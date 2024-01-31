import { useInputWithLimitChar } from "../hooks/useInputWithLimitChar";
import PropTypes from 'prop-types';

function TalkInput({onAddTalkHandler}){
     // Talk Input
     const [text, setTextHandler] = useInputWithLimitChar({
        defaultVal: "",
        lengthChar: 320,
    });
    return (
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
            <button type="submit" onClick={() => onAddTalkHandler(text)} >Talk</button>
        </div>
    );
}

TalkInput.propTypes = {
    onAddTalkHandler: PropTypes.func.isRequired, 
}

export default TalkInput;