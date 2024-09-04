// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { TextField, Button, Typography, Paper, Box } from '@mui/material';
// import MapComponent from './MapComponent';
// import Navbar from './Navbar';

// const QuizForm: React.FC = () => {
//     const [question, setQuestion] = useState<string>('');
//     const [answer, setAnswer] = useState<string>('');
//     const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
//     const [markers, setMarkers] = useState<Array<{ position: [number, number]; question: string; answer: string }>>([]);
//     const [defaultPosition, setDefaultPosition] = useState<[number, number] | null>(null);
//     const navigate = useNavigate();
//     const location = useLocation();
    
//     const quizName = location.state?.quizName || '';
//     const username = location.state?.username || '';

//     useEffect(() => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     setDefaultPosition([latitude, longitude]);
//                 },
//                 (error) => {
//                     console.error('Error fetching user location:', error);
//                     setDefaultPosition([59.326464, 18.0584448]);
//                 }
//             );
//         } else {
//             setDefaultPosition([59.326464, 18.0584448]);
//         }
//     }, []);

//     const handleSave = (event: React.FormEvent) => {
//         event.preventDefault();
    
//         if (selectedLocation && question && answer) {
//             const newMarker = { position: selectedLocation, question, answer, quizName };
//             setMarkers([...markers, newMarker]);
    
//             setSelectedLocation(null);
//             setQuestion('');
//             setAnswer('');
//         }
//     };

//     const handleLocationSelect = (location: [number, number]) => {
//         setSelectedLocation(location);
//     };

//     const handleNavigate = () => {
//         navigate('/all-questions', {
//             state: {
//                 quizzes: [{ quizName: quizName, username: username }],
//                 markers: markers
//             }
//         });
//     };

//     return (
//         <Box sx={{ marginTop: '60px' }}>
//             <Navbar />
//             <Box
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     minHeight: '100vh',
//                     width: '100%',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     boxSizing: 'border-box',
//                     paddingTop: '60px',
//                 }}
//             >
//                 <Paper
//                     sx={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         width: '100%',
//                         maxWidth: '100%',
//                         height: '100vh',
//                         marginTop: '1rem',
//                         boxShadow: 'none',
//                         boxSizing: 'border-box',
//                     }}
//                 >
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             flexDirection: 'row',
//                             justifyContent: 'space-between', // Adjusted to use space-between
//                             width: '90%',
//                             gap: 1,
//                             mt: 2,
//                         }}
//                     >
//                         <Button
//                             onClick={() => navigate(-1)} // Navigate back to the previous page
//                             variant="outlined"
//                             color="secondary"
//                             sx={{
//                                 backgroundColor: '#f5f5f5',
//                                 color: '#333',
//                                 '&:hover': {
//                                     backgroundColor: '#e0e0e0',
//                                 },
//                             }}
//                         >
//                             Back
//                         </Button>
//                         <Button
//                             onClick={handleNavigate}
//                             variant="outlined"
//                             color="secondary"
//                             fullWidth
//                             sx={{
//                                 backgroundColor: '#2b83cb',
//                                 color: '#fff',
//                                 width:'20%',
//                                 '&:hover': {
//                                     backgroundColor: '#1a6bbd',
//                                 },
//                             }}
//                         >
//                             Let's Play!
//                         </Button>
//                     </Box>
//                     <Typography variant="h4" gutterBottom sx={{ padding: 3, marginTop: '1rem' }}>
//                         Quiz Form
//                     </Typography>
//                     <Box
//                         component="form"
//                         onSubmit={handleSave}
//                         sx={{
//                             display: 'flex',
//                             flexDirection: 'row',
//                             width: '90%',
//                             gap: 2,
//                         }}
//                     >
//                         <TextField
//                             label="Question"
//                             variant="outlined"
//                             value={question}
//                             onChange={(e) => setQuestion(e.target.value)}
//                             margin="normal"
//                             fullWidth
//                             sx={{ boxSizing: 'border-box' }}
//                         />
//                         <TextField
//                             label="Answer"
//                             variant="outlined"
//                             value={answer}
//                             onChange={(e) => setAnswer(e.target.value)}
//                             margin="normal"
//                             fullWidth
//                             sx={{ boxSizing: 'border-box' }}
//                         />
//                         <Button
//                             type="submit"
//                             variant="contained"
//                             color="primary"
//                             fullWidth
//                             disabled={!selectedLocation || !question || !answer}
//                             sx={{
//                                 height: '56px',
//                                 marginTop: 2,
//                                 backgroundColor: '#2b83cb',
//                                 color: '#fff',
//                                 '&:hover': {
//                                     backgroundColor: '#1a6bbd',
//                                 },
//                             }}
//                         >
//                             Save
//                         </Button>
//                     </Box>

//                     <Box
//                         sx={{
//                             width: '90%',
//                             height: '50vh',
//                             marginTop: 2,
//                             position: 'relative',
//                         }}
//                     >
//                         {defaultPosition ? (
//                             <MapComponent
//                                 center={defaultPosition}
//                                 onLocationSelect={handleLocationSelect}
//                                 markers={markers}   
//                             />
//                         ) : (
//                             <Typography variant="body1" align="center">
//                                 Loading map...
//                             </Typography>
//                         )}
//                     </Box>
//                 </Paper>
//             </Box>
//         </Box>
//     );
// };

// export default QuizForm;


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import MapComponent from './MapComponent';
import Navbar from './Navbar';

const QuizForm: React.FC = () => {
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
    const [markers, setMarkers] = useState<Array<{ position: [number, number]; question: string; answer: string; quizName: string }>>([]);
    const [defaultPosition, setDefaultPosition] = useState<[number, number] | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    
    const quizName = location.state?.quizName || '';
    const username = location.state?.username || '';

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setDefaultPosition([latitude, longitude]);
                },
                (error) => {
                    console.error('Error fetching user location:', error);
                    setDefaultPosition([59.326464, 18.0584448]);
                }
            );
        } else {
            setDefaultPosition([59.326464, 18.0584448]);
        }
    }, []);

    const handleSave = (event: React.FormEvent) => {
        event.preventDefault();
    
        if (selectedLocation && question && answer) {
            const newMarker = { position: selectedLocation, question, username, answer, quizName };
            setMarkers([...markers, newMarker]);
    
            setSelectedLocation(null);
            setQuestion('');
            setAnswer('');
        }
    };

    const handleLocationSelect = (location: [number, number]) => {
        setSelectedLocation(location);
    };

    const handleNavigate = () => {
        navigate('/all-questions', {
            state: {
                quizzes: [{ quizName: quizName, username: username }],
                markers: markers,
                username: username 
            }
        });
    };

    return (
        <Box sx={{ marginTop: '60px' }}>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    paddingTop: '60px',
                }}
            >
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        maxWidth: '100%',
                        height: '100vh',
                        marginTop: '1rem',
                        boxShadow: 'none',
                        boxSizing: 'border-box',
                    }}
                >
               <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                        padding: 2, 
                        textAlign: 'left', 
                        width: '100%', 
                        marginLeft: '16px', 
                        fontFamily: 'Roboto, sans-serif', // Font family
                        fontWeight: '500', // Medium weight for welcome text
                        color: '#555' // Medium gray color
                    }}
                >
                    Welcome, 
                    <Typography 
                        variant="h6" 
                        component="span" // Keeps it inline with the welcome text
                        sx={{ 
                            fontWeight: '600', // Bold weight for username
                            color: '#007BFF' // Primary color
                        }}
                    >
                        {username}
                    </Typography>!
                </Typography>
                <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '90%',
                            gap: 1,
                            mt: 2,
                        }}
                    >
                        <Button
                            onClick={() => navigate(-1)} // Navigate back to the previous page
                            variant="outlined"
                            color="secondary"
                            sx={{
                                backgroundColor: '#f5f5f5',
                                color: '#333',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            Back
                        </Button>
                        <Button
                            onClick={handleNavigate}
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            sx={{
                                backgroundColor: '#2b83cb',
                                color: '#fff',
                                width: '20%',
                                '&:hover': {
                                    backgroundColor: '#1a6bbd',
                                },
                            }}
                        >
                            Let's Play!
                        </Button>
                    </Box>
                    <Box
                        component="form"
                        onSubmit={handleSave}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '90%',
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="Question"
                            variant="outlined"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            margin="normal"
                            fullWidth
                            sx={{ boxSizing: 'border-box' }}
                        />
                        <TextField
                            label="Answer"
                            variant="outlined"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            margin="normal"
                            fullWidth
                            sx={{ boxSizing: 'border-box' }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={!selectedLocation || !question || !answer}
                            sx={{
                                height: '56px',
                                marginTop: 2,
                                backgroundColor: '#2b83cb',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#1a6bbd',
                                },
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            width: '90%',
                            height: '50vh',
                            marginTop: 2,
                            position: 'relative',
                        }}
                    >
                        {defaultPosition ? (
                            <MapComponent
                                center={defaultPosition}
                                onLocationSelect={handleLocationSelect}
                                markers={markers}   
                            />
                        ) : (
                            <Typography variant="body1" align="center">
                                Loading map...
                            </Typography>
                        )}
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default QuizForm;















