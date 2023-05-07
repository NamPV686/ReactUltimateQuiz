import videoHomepage from '../../assets/video-homepage.mp4'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const HomePage = (props) => {
    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();

    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHomepage} type="video/mp4" />
            </video>
            <div className='homepage-content'>
                <div>
                    <h1>There's a better way to ask</h1>
                </div>
                <div>
                    <p>You don't want to make a boring form. And your audience won't answer one. Create a typeform instead—and make everyone happy.</p>
                </div>
                <div>
                    {
                        isAuthenticated === false ?
                        <button className='btn-signup' onClick={() => navigate('/login')}>Get started - it's free</button>
                        :
                        <button className='btn-signup' onClick={() => navigate('/users')}>Doing quiz now</button>

                    }
                </div>
            </div>
        </div>
    );
}

export default HomePage;