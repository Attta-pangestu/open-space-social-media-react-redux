import { useState } from "react";


function useInputWithLimitChar({defaultVal, lengthChar}){
    const [input, setInput] = useState(defaultVal);
    const inputHandler = ({target}) => {
        if(target.value.length <= lengthChar) {
            setInput(target.value);
        }
    }
    return [input, inputHandler]; 
}

export {useInputWithLimitChar};