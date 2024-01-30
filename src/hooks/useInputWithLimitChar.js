import { useState } from "react";


function useInputWithLimitChar({defaultVal, lengthChar}){
    const [input, setInput] = useState(defaultVal);
    const handleInputChange = ({target}) => {
        if(target.value.length <= lengthChar) {
            setInput(target.value);
        }
    }
    return [input, handleInputChange]; 
}

export {useInputWithLimitChar};