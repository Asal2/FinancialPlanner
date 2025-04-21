import React from 'react'
import Navbar from '../../../components/Navbar'
import { Box, Typography, Grid, Paper } from '@mui/material'
import ExpensePhoto from './jakub-zerdzicki-ykgLX_CwtDw-unsplash.jpg'
import BudgetPhoto from './goodnotes-5-1s5TOXcMZQ8-unsplash.jpg'
import InvestmentPhoto from './maxim-hopman-fiXLQXAhCfk-unsplash.jpg'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

const features = [
    {
        title: 'Expense tracking',
        description: 'Stay on top of your spendings with real-time tracking.',
        image: ExpensePhoto
    },
    {
        title: 'Budget Planner',
        description: 'Plan your budget and set spending goals.',
        image: BudgetPhoto
    },
    {
        title: 'investment Overview',
        description: 'Visualize your portfolio and track your financial growth.',
        image: InvestmentPhoto
    },
];

const Intro = () => {
  return (
    <div>
        <Navbar />
        <Box 
        sx={{wordBreak: 'break-word',
            minHeight: '100vh',
            display: "flex",  // Enables flexbox layout
            flexDirection: "column",  // Arranges children in a column
            alignItems: "center",  // Centers content horizontally
            textAlign: "center",  // Aligns text to the center
            background: "linear-gradient(to right, #1e3c72, #2a5298)", // Adds a blue gradient background
            color: "white",  // Sets text color to white
            padding: 4,
            px: 3,
            py: 6,
            }}
        >   
            {/* Header Message */}
            <Typography variant="h2" sx={{ fontWeight: 500, textAlign: 'center', mb: 6, fontStyle: 'italic', fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
                We make it easy for you !
            </Typography>

            {/* Features Section */}
            <Grid container spacing={3} justifyContent="center" sx={{mt:5}}>
                {features.map(({title, description, image}, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Paper
                            elevation={6}
                            sx={{
                                borderRadius: 3,
                                overflow: 'hidden',
                                backgroundColor: '#f5f5f5',
                                color: 'black',
                                //textAlign: 'center',
                                //height: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <Box>
                                <img
                                    src={image}
                                    alt={`${title} Visual`}
                                    style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'cover',
                                    }}
                                />
                            </Box>
                            <Box sx={{ p: 3, flexGrow: 1}}>
                                <Typography variant="h5" fontWeight='bold' gutterBottom>
                                    {title}
                                </Typography>
                                <Typography variant="body2" fontWeight='bold' color="text.secondary">
                                    {description}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>    
                ))}
            </Grid>
            {/* CTA Button */}
            <Box mt={10}>
                <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to='/sign-in'
                    sx={{
                    backgroundColor: '#4caf50',
                    color: 'white',
                    px: 5,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    '&:hover': {
                        backgroundColor: '#388e3c',
                    },
                    }}
                >
                    Try Finance Buddy
                </Button>
            </Box>
        </Box>
    </div>
  )
}

export default Intro