import { useInput } from "../hooks/useInput";
import PropTypes from 'prop-types';

function LoginInput({handler}) {
    const [id, setIdHandler] = useInput('');
    const [password, setPasswordHandler] = useInput('');
    
    return(
        <form className="login-input">
            <input type="text" placeholder="Username" value={id} onChange={setIdHandler} />
            <input type="password" placeholder="Password" value={password} onChange={setPasswordHandler} />
            <button type="button" onClick={() => handler({id, password})}>Login</button>
        </form>
    );
}

LoginInput.propTypes = {
    handler : PropTypes.func.isRequired,
}

export default LoginInput;