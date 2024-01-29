/* eslint-disable react-refresh/only-export-components */
import PropTypes from 'prop-types';
import { postedAt } from '../utils/postedAt';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function TalkItem ({id,text, createdAt,userTalk, authUser, likes, likeHandler }) {
    const navigate = useNavigate();
    
    const isLiked = likes.includes(authUser);

    const onTalkClick = () => {
        navigate(`/detail-talk/${id}`);
    }

    const onLikeClicked = (event) => {
        event.stopPropagation(); 
        likeHandler(id);
    }

    return (
            <div  role="button" tabIndex={0} className="talk-item" onClick={onTalkClick} >
                <div className="talk-item__user-photo">
                    <img src={userTalk.photo} alt="" />
                </div>
                <div className="talk-item__detail">
                    <header>
                    <div className="talk-item__user-info">
                        <p className="talk-item__user-name">{userTalk.name}</p>
                        <p className="talk-item__user-id">@{userTalk.id}</p>
                    </div>
                    <p className="talk-item__created-at">{postedAt(createdAt)}</p>
                    </header>
                    <article>
                    <p className="talk-item__text">{text}</p>
                    </article>
                    { likeHandler && (
                        <div className="talk-item__likes">
                            <p>
                                <button type='button' aria-label="like" onClick={onLikeClicked}> 
                                    {isLiked ? <FaHeart style={{color:'red'}}/> : <FaRegHeart />}
                                </button>
                            </p>
                        </div>
                    )
                    }
                    
                </div>
            </div>
        
    )
}

const userShape = {
    id : PropTypes.string.isRequired, 
    name : PropTypes.string.isRequired, 
    photo : PropTypes.string.isRequired
}

const talkItemShape = {
    id: PropTypes.string.isRequired, 
    text: PropTypes.string.isRequired, 
    createdAt: PropTypes.string.isRequired, 
    likes: PropTypes.arrayOf(PropTypes.string).isRequired, 
    userTalk: PropTypes.shape(userShape),
    authUser: PropTypes.string
}

TalkItem.propTypes = {
    ...talkItemShape,
    likeHandler: PropTypes.func, 
}

TalkItem.defaultProps = {
    likeHandler: null, 
}

export { talkItemShape };

export default TalkItem;