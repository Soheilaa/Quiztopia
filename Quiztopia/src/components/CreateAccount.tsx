import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper } from '@mui/material';
import './CreateAccount.css';

type User = {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
};

export default function CreateAccount() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [slideIn, setSlideIn] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        setSlideIn(true); // Trigger slide-in animation when component mounts
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        const userData: User = { username, password, firstname, lastname };
    
        try {
            const response = await fetch('https://a1voqdpubd.execute-api.eu-north-1.amazonaws.com/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                throw new Error(errorData.message || 'Something went wrong');
            }
    
            const data = await response.json();
            console.log(data);
            // Handle successful response here
        } catch (error: any) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div className={`create-account-container ${slideIn ? 'slide-in' : ''}`}>
            <Paper className="create-account-overlay">
                <Typography variant="h4">Create Account</Typography>
                <form onSubmit={handleSubmit} className="create-account-form">
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
                    <TextField
                        label="First Name"
                        variant="outlined"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <Button
                        id="create-account-btn"
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ margin: '10px 0' }}
                    >
                        Create Account
                    </Button>
                </form>
                <Button
                    onClick={() => navigate('/')}
                    variant="text"
                    color="secondary"
                    className="back-button"
                    id="back_btn"
                >
                    Back to Login Page
                </Button>
            </Paper>
        </div>
    );
}

