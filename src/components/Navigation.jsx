import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navigation({authUser, signOutHandler}) {
    const {id, photo, name} = authUser;

    return(
        <div className="navigation">
            <img src={photo} alt={id} title={name} />
            <nav>
                <Link to="/">Home</Link>
            </nav>
            <button type='button' onClick={signOutHandler} >Sign Out</button>
        </div>
    );
}

const authUserShape = {
    id: Proptypes.string.isRequired,
    photo: Proptypes.string.isRequired,
    name: Proptypes.string.isRequired,
}

Navigation.propTypes = {
    authUser: Proptypes.shape(authUserShape).isRequired, 
    signOutHandler: Proptypes.func.isRequired, 
}

export default Navigation;