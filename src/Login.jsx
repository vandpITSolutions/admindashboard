// src/pages/Login.js
import React, { useState } from 'react';
import { auth, db } from './firebase/config';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';
import logo from './logo.png';


const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isSignup) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Update Firebase Auth profile
                await updateProfile(user, {
                    displayName: fullName
                });

                // Save additional user data in Firestore
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    fullName,
                    phone,
                    email,
                    createdAt: serverTimestamp()
                });

                navigate('/dashboard');
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message || 'Authentication failed.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-right">
                <img src={logo} alt="College Logo" />
                <h1>Starlight College of Science & Technology</h1>
                <p>"Empowering students to shape the future through innovation, knowledge, and leadership."</p>
            </div>
            {/* Left Side - Form */}
            <div className="login-left">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>{isSignup ? 'Create an Account' : 'Welcome Back!'}</h2>
                    <p>{isSignup ? 'Register to access the admin portal.' : 'Login to your admin dashboard.'}</p>

                    {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

                    {isSignup && (
                        <>
                            <label>Full Name:</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />

                            <label>Phone Number:</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </>
                    )}

                    <label>Email Address:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {!isSignup && (
                        <div style={{ textAlign: 'right', fontSize: '12px', marginBottom: '10px' }}>
                            <a href="#" onClick={() => alert('Forgot password not implemented yet.')}>
                                Forgot Password?
                            </a>
                        </div>
                    )}

                    <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>

                    <p style={{ marginTop: '15px' }}>
                        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <span onClick={() => setIsSignup(!isSignup)}>
                            {isSignup ? 'Login' : 'Sign Up'}
                        </span>
                    </p>

                    <p style={{ fontSize: '12px', textAlign: 'center', marginTop: '20px', color: '#999' }}>
                        Having trouble logging in? <a href="mailto:support@college.edu">Contact Support</a>
                    </p>
                </form>
            </div>

            {/* Right Side - Image or Info */}
            <div className="login-right"></div>
        </div>
    );
};

export default Login;
