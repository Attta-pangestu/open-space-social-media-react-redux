import { useState } from "react";

function useInput(defaultVal) {
    const [input, setInput] = useState(defaultVal);
    const setInputHandler = ({target}) => {
        setInput(target.value);
    }
    return [input, setInputHandler];
}

export {useInput};