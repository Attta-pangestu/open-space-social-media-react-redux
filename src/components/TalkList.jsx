import TalkItem, {talkItemShape} from './TalkItem'; 
import PropTypes from 'prop-types';

function TalkList({talksList, likeHandler}){
    console.log({talksList});
    return (
        <div className="talks-list">
            {talksList.map((talk) => {
                return <TalkItem key={talk.id} {...talk} likeHandler={likeHandler} />
            })}
        </div>
    );
}

TalkList.propTypes = {
    talksList: PropTypes.arrayOf(PropTypes.shape(talkItemShape)).isRequired, 
    likeHandler: PropTypes.func.isRequired 
}


export default TalkList;