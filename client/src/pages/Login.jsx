import React, { useState } from 'react';
import Layout from "../layout/Layout.jsx";
import { loginUser } from '../apiRecqust/apiRecqust.js'; // Import the API function

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await loginUser(email, password);
            setLoading(false);
            localStorage.setItem('token', data.token); // Assuming the server returns a token
            window.location.href = '/UserDashboard'; // Redirect
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 401) {
                setError(error.response.data.message || 'Invalid credentials');
            } else {
                setError('Login failed. Please try again.');
                console.error('Login error:', error);
            }
        }
    };

    return (
        <Layout>
            <div className="login-container min-h-90 flex justify-center items-center">
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    {/* ... your form input fields ... */}
                    <div className="join">
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                               className="input join-item" placeholder="Email"/>
                        <input type="password" id="password" value={password}
                               onChange={(e) => setPassword(e.target.value)} required className="input join-item"
                               placeholder="Pasword"/>
                        <button type="submit" disabled={loading} className="btn join-item rounded-r-full">
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Login;