/* eslint-disable react-refresh/only-export-components */
import PropTypes from 'prop-types';
import { postedAt } from '../utils/postedAt';
import {FaHeart, FaRegHeart} from 'react-icons/fa';

function TalkDetail ({id,text, createdAt,userTalk, authUser, likes, likeHandler }) {
    const isLiked = likes.includes(authUser);


    const onLikeClicked = (event) => {
        event.stopPropagation(); 
        likeHandler(id);
    }

    return (
        <section className='talk-detail'>
            <header>
                <img src={userTalk.photo} />
                <div className='talk-detail__user-info'>
                    <p className='talk-detail__user-name'>{userTalk.name}</p>
                    <p className='talk-detail__user-id'>@{userTalk.id}</p>
                </div>
            </header>
            <article>
                <p className='talk-detail__text'>{text}</p>
            </article>
            <footer>
                <div className='talk-detail__like'>
                    <button type='button' aria-label='like' onClick={onLikeClicked} >
                        {isLiked ? <FaHeart style={{color:'red'}}/> : <FaRegHeart />}
                    </button>
                    <span>
                        {likes.length} {' '} Likes
                    </span>
                </div>
                <p className='talk-detail__created-at'>{postedAt(createdAt)}</p>
            </footer>
        </section>

    );
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

TalkDetail.propTypes = {
    ...talkItemShape,
    likeHandler: PropTypes.func, 
}

TalkDetail.defaultProps = {
    likeHandler: null, 
}



export default TalkDetail;