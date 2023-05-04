import { useState } from 'react';
import './Login.scss';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';
import { postSignUp } from '../../services/apiService';
import {toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async() => {
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

          if(!password){
            toast.error("Invalid password")
            return;
          }

        //Call API
        let data = await postSignUp(email, password, username);

        if(data && +data.EC === 0){
            toast.success(data.EM);
            navigate('/login');
        }
      
        if(data && +data.EC !== 0){
            toast.error(data.EM);
        }
    }

    return(
        <div className="login-container">
            <div className='header'>
                <span>Already have an account?</span>
                <button onClick={() => navigate("/login")}>Login</button>
            </div>
            <div className='title col-4 mx-auto'>
                Quiz
            </div>
            <div className='welcome col-4 mx-auto'>
                Start your journey?
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
                    <label><AiOutlineEye />Password</label>
                    <input
                        type={'password'}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Username</label>
                    <input
                        type={'text'} 
                        className='form-control' 
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    <button onClick={() => handleSignUp()}>Create my free account</button>
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

export default Register;