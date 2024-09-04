import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper } from '@mui/material';
import './QuizNamePage.css'; // Import the CSS file

const QuizNamePage: React.FC = () => {
    const [quizName, setQuizName] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        if (!storedUsername) {
            navigate('/'); // Redirect to login if no username found
        }
    }, [navigate]);

    const handleSave = (event: React.FormEvent) => {
        event.preventDefault();

        if (!quizName.trim()) {
            setError('Quiz name is required.');
            return;
        }

        const username = sessionStorage.getItem('username');
        console.log('Stored Username:', username); // Add this line
        if (!username) {
            setError('No username found in session storage.');
            return;
        }

        navigate('/quiz-form', { state: { quizName, username } });
    };

    return (
        <div className="quiz-name-container">
            <Paper className="quiz-name-overlay">
                <Typography variant="h4">Enter Quiz Name</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSave} className="quiz-name-form">
                    <TextField
                        label="Quiz Name"
                        variant="outlined"
                        value={quizName}
                        onChange={(e) => setQuizName(e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Proceed to Quiz Form
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

export default QuizNamePage;




