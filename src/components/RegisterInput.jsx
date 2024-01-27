import { useInput } from "../hooks/useInput";
import PropTYpes from 'prop-types';

function RegisterInput({handler}) {
    const [name, setNameHandler] = useInput('');
    const [username, setUsernameHandler] = useInput('');
    const [password, setPasswordHandler] = useInput('');

    return(
        <form className="register-input">
            <input type="text" placeholder="Name" value={name} onChange={setNameHandler} />
            <input type="text" placeholder="Username" value={username} onChange={setUsernameHandler} />
            <input type="password" placeholder="Password" value={password} onChange={setPasswordHandler} />
            <button type="button" onClick={() => handler({name, username,password})}>Register</button> 
        </form>
    );
}

RegisterInput.propTypes = {
    handler : PropTYpes.func.isRequired,
}


export default RegisterInput;