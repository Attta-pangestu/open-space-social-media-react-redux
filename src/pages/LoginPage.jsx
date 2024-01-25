import PropTypes from 'prop-types';
import {IoEarthOutline} from 'react-icons/io5';
// component
import LoginInput from '../components/LoginInput';
import { Link } from 'react-router-dom';

function LoginPage({page}){
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
                
                <LoginInput/>
                {page === 'login' ?  
                <p>Don&#39;t have an account? <Link to="/register">Register</Link></p>
                :
                <p>Already have an account? {<Link to="/login">Login</Link>}</p>

                }
                
            </article>
        </section>
    );
}

LoginPage.propTypes = {
    page : PropTypes.string.isRequired
}

export default LoginPage;