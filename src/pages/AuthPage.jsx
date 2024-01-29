import PropTypes from 'prop-types';
import {IoEarthOutline} from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
// // store context
import { useDispatch } from 'react-redux';
// action
import { asyncRegisterUser } from '../states/users/action';
import { asyncSetAuthUser } from '../states/auth/action';
// component
import LoginInput from '../components/LoginInput';
import RegisterInput from '../components/RegisterInput';
import { Link } from 'react-router-dom';

function AuthPage({page}){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const registerHandler = async  ({name, username, password}) => {
        const {error, data}= await dispatch(asyncRegisterUser({username, password, id : name}))
        if(!error) {
            alert("Berhasil mendaftarkan akun, Hai " + data.name );
            navigate('/login');
        }
    }

    const loginHandler = async ({id, password}) => {
        const {error} = dispatch(asyncSetAuthUser({id, password}));
        if(!error) {
            alert("Berhasil Login"); 
            navigate('/');
        }

    };
    

    return(
        <section className={page === 'login'? "login-page" : "register-page"}>
            <header className={page === 'login'? "login-page__hero" : "register-page__hero"}>
                <h1><IoEarthOutline /></h1>
            </header>
            <article className={page === 'login'? 'login-page__main': 'register-page__main' }>
                {   page === 'login' ?
                        (<h2>
                            See {' '} <strong> The World</strong>, 
                            {' '}
                            <br />
                            Through Open Space
                        </h2>) 
                    :

                    (<h2>
                        Create Your Account
                    </h2>) 
                }   
                {page === "login"? <LoginInput handler={loginHandler}/> : <RegisterInput handler={registerHandler} /> }
                
                {page === 'login' ?  
                <p>Don&#39;t have an account? <Link to="/register">Register</Link></p>
                :
                <p>Already have an account? {<Link to="/login">Login</Link>}</p>

                }
                
            </article>
        </section>
    );
}

AuthPage.propTypes = {
    page : PropTypes.string.isRequired
}

export default AuthPage;