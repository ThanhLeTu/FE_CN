import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {login} from "../../utils/UserService.jx";


function LoginPage(){
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const userData = await login(email, password);
        // console.log(userData);
        if (userData && userData.token) {
            localStorage.setItem('token', userData.token);
            localStorage.setItem('role', userData.role);
            navigate('/profile');
        } else {
            setError(userData ? userData.message : 'Vui lòng nhập đủ thông tin. Please try again.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        setError('An unexpected error occurred. Please try again.');
        setTimeout(() => {
            setError('');
        }, 5000);
    }
}



    return(
        <div className="auth-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )

}

export default LoginPage;