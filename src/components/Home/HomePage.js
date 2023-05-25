import videoHomepage from '../../assets/video-homepage.mp4'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useTranslation, Trans } from 'react-i18next';

const HomePage = (props) => {
    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHomepage} type="video/mp4" />
            </video>
            <div className='homepage-content'>
                <div className='title-1'>
                    <h1>
                        {t('homepage.title1')}
                    </h1>
                </div>
                <div>
                    <p>{t('homepage.title2')}</p>
                </div>
                <div>
                    {
                        isAuthenticated === false ?
                        <button className='btn-signup' onClick={() => navigate('/login')}>{t('homepage.title3')}</button>
                        :
                        <button className='btn-signup' onClick={() => navigate('/users')}>{t('homepage.title4')}</button>

                    }
                </div>
            </div>
        </div>
    );
}

export default HomePage;