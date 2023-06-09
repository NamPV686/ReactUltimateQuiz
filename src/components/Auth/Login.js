import { useState } from 'react';
import './Login.scss';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa';
import { postLogin } from '../../services/apiService';
import {toast } from 'react-toastify';
import {NavLink, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import Language from '../Header/Language';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async() => {
        //Validate
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            };
    
        const isValidEmail = validateEmail(email);
    
        if(!isValidEmail){
            toast.error("Invalid email")
            return;
        }

        setIsLoading(true);

        //Call API
        let data = await postLogin(email, password);

        if(data && +data.EC === 0){
            dispatch(doLogin(data));
            toast.success(data.EM);
            setIsLoading(false);
            navigate('/');
        }
      
        if(data && +data.EC !== 0){
            toast.error(data.EM);
            setIsLoading(false);
        }
    }

    const handleKewDown = (event) => {
        if(event.key === 'Enter'){
            handleLogin();
        }
    }

    return(
        <div className="login-container">
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button onClick={() => navigate("/register")}>SignUp</button>
                <Language />
            </div>
            <div className='title col-4 mx-auto'>
                Quiz
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type={'email'} 
                        className='form-control' 
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type={'password'}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handleKewDown(event)}
                    />
                </div>
                <span>Forgot password</span>
                <div>
                    <button onClick={() => handleLogin()} 
                        disabled = {isLoading}
                    >
                        { isLoading === true && <FaSpinner className='loader-icon'/> }
                        <span>Login To Quiz</span>
                    </button>
                </div>
                <div className='back'>
                    <span onClick={() => navigate("/")}>
                        <AiOutlineArrowLeft /><AiOutlineArrowLeft />Go to HomePage
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Login;