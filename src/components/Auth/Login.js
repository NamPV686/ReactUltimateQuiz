import { useState } from 'react';
import './Login.scss'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        alert("Login");
    }

    return(
        <div className="login-container">
            <div className='header'>
                Don't have an account yet?
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
                    />
                </div>
                <span>Forgot password</span>
                <div className='align-center'>
                    <button onClick={() => handleLogin()}>Login To Quiz</button>
                </div>
            </div>
        </div>
    );
}

export default Login;