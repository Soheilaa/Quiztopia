import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';


const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <AppBar
        position="fixed"
        sx={{ 
            backgroundColor: '#ededed', 
            height: '60px',  
            padding: { xs: '0.5rem 8px', sm: '1rem 16px' }, 
            top: 0, 
            left: 0,
            width: '100%', 
            boxShadow: 'none', 
        }}
    >
        <Toolbar
            sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                '@media (min-width: 600px)': {
                    minHeight: '29px', // Reduced minHeight for larger screens
                }
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                    variant="h6"
                    sx={{ 
                        fontFamily: 'Playfair Display',
                        fontSize: { xs: '1.2rem', sm: '1.5rem' },
                        color: 'black',
                    }}
                >
                    Quiztopia
                </Typography>
            </Box>
            
            <Button
                onClick={() => navigate('/')}
                variant="text"
                sx={{
                    backgroundColor: '#2b83cb',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#1a6bbd',
                    },
                    textAlign: 'center', 
                }}
            >
                Log Out
            </Button>
        </Toolbar>
    </AppBar>
    );
};

export default Navbar;


