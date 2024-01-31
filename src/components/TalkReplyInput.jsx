import { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

function TalkReplyInput({replyTextAPIHandler}){
    const navigate = useNavigate();

    // Talk Input
    const [text, setText] = useState('');

    function handleTextChange({ target }) {
        if (target.value.length <= 320) {
          setText(target.value);
        }
      }
    

    // UI handler
    function replyTexthandler() {
        if(text.trim()) {
            replyTextAPIHandler(text);
            setText('');
            navigate('/');
        }
    }

    

    return (
        <div className="talk-input">
            <textarea
            type="text"
            placeholder="what are you thinking"
            value={text}
            onChange={handleTextChange}
            />
            <p className="talk-input__char-left">
            <strong>{text.length}</strong>/320
            </p>
            <button type="submit" onClick={() => replyTexthandler(text)} >Reply</button>
        </div>
    );
}

TalkReplyInput.propTypes = {
    replyTextAPIHandler: PropTypes.func.isRequired, 
}

export default TalkReplyInput;