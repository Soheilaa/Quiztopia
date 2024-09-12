import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper } from '@mui/material';
import './LoginForm.css';

type User = {
    username: string;
    password: string;
};

export default function LoginForm() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');  
    const [slideIn, setSlideIn] = useState<boolean>(false);  
    const navigate = useNavigate();

    useEffect(() => {
        setSlideIn(true);
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        if (!username || !password) {
            setError('Username and password are required.');
            return;
        }
    
        const userData: User = { username, password };
        const API_URL = "https://a1voqdpubd.execute-api.eu-north-1.amazonaws.com/auth/login";
    
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
    
            if (!response.ok) {
                throw new Error('Login failed. Please check your username and password.');
            }
    
            const data = await response.json();
    
            if (data.token) {
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('username', username); // Store the username
                setError('');
                navigate('/quiz-name-page'); // Navigate to QuizNamePage
            } else {
                throw new Error('Login failed. Please check your username and password.');
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className={`login-container ${slideIn ? 'slide-in' : ''}`}>
            <Paper className="login-overlay">
                <Typography variant="h4">Log In</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit} className="login-form">
                    <TextField
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Log In
                    </Button>
                </form>
                <Button
                    onClick={() => navigate('/')}
                    variant="text"
                    color="secondary"
                    id="back-button"
                >
                    Back to Home Page
                </Button>
            </Paper>
        </div>
    );
}

