import { useState, useEffect, FormEvent } from "react";
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
    const [loading, setLoading] = useState<boolean>(false); // Add loading state
    const [slideIn, setSlideIn] = useState<boolean>(false);
    const navigate = useNavigate();
    const API_URL = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login';

    useEffect(() => {
        setSlideIn(true);
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // Clear previous errors
        setError('');
    
        // Simple validation
        if (!username || !password) {
            setError('Username and password are required.');
            return;
        }
    
        // Start loading spinner
        setLoading(true);
    
        const userData: User = { username, password };
    
        try {
            console.log('Sending Request:', JSON.stringify(userData));
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
    
            console.log('Response Status:', response.status);
            const data = await response.json();
            console.log('Response Data:', data);
    
            if (response.ok && data.success) {
                // Store token and username
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('username', username);
                console.log('Token stored:', data.token); // Verify token is stored
    
                // Navigate to the next page (quiz name page)
                navigate('/quiz-name-page');
            } else if (!data.success) {
                setError(data.message || 'Login failed. Please check your username and password.');
            } else {
                throw new Error('Unexpected error occurred.');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            setError(error.message || 'An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false); // Stop loading after the response is received
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
                        disabled={loading} // Disable the button while loading
                    >
                        {loading ? 'Logging in...' : 'Log In'} {/* Show loader text */}
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




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { TextField, Button, Typography, Paper } from '@mui/material';
// import './LoginForm.css';

// type User = {
//     username: string;
//     password: string;
// };

// export default function LoginForm() {
//     const [username, setUsername] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const [error, setError] = useState<string>('');  
//     const [slideIn, setSlideIn] = useState<boolean>(false);  
//     const navigate = useNavigate();

//     useEffect(() => {
//         setSlideIn(true);
//     }, []);

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
    
//         if (!username || !password) {
//             setError('Username and password are required.');
//             return;
//         }
    
//         const userData: User = { username, password };
//         const API_URL = "https://a1voqdpubd.execute-api.eu-north-1.amazonaws.com/auth/login";
    
//         try {
//             const response = await fetch(API_URL, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(userData)
//             });
    
//             if (!response.ok) {
//                 throw new Error('Login failed. Please check your username and password.');
//             }
    
//             const data = await response.json();
    
//             if (data.token) {
//                 sessionStorage.setItem('token', data.token);
//                 sessionStorage.setItem('username', username); // Store the username
//                 setError('');
//                 navigate('/quiz-name-page'); // Navigate to QuizNamePage
//             } else {
//                 throw new Error('Login failed. Please check your username and password.');
//             }
//         } catch (error: any) {
//             setError(error.message);
//         }
//     };

//     return (
//         <div className={`login-container ${slideIn ? 'slide-in' : ''}`}>
//             <Paper className="login-overlay">
//                 <Typography variant="h4">Log In</Typography>
//                 {error && <Typography color="error">{error}</Typography>}
//                 <form onSubmit={handleSubmit} className="login-form">
//                     <TextField
//                         label="Username"
//                         variant="outlined"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         margin="normal"
//                         fullWidth
//                     />
//                     <TextField
//                         label="Password"
//                         type="password"
//                         variant="outlined"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         margin="normal"
//                         fullWidth
//                     />
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                     >
//                         Log In
//                     </Button>
//                 </form>
//                 <Button
//                     onClick={() => navigate('/')}
//                     variant="text"
//                     color="secondary"
//                     id="back-button"
//                 >
//                     Back to Home Page
//                 </Button>
//             </Paper>
//         </div>
//     );
// }

















