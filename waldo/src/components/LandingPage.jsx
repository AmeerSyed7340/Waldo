import '../styles/LandingPage.css'
import{useNavigate} from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    function handleOnClick(){
        navigate('/game');
    }

    return (
        <div className='appBackground'>
            <button className='playBtn' onClick={handleOnClick}>Start Game</button>
        </div>
    );
}

export default LandingPage;