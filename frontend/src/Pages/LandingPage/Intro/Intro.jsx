import React from 'react'
import Navbar from '../../../components/Navbar'
import { Box, Typography, Grid } from '@mui/material'
import ExpensePhoto from './jakub-zerdzicki-ykgLX_CwtDw-unsplash.jpg'
import BudgetPhoto from './goodnotes-5-1s5TOXcMZQ8-unsplash.jpg'
import InvestmentPhoto from './maxim-hopman-fiXLQXAhCfk-unsplash.jpg'


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
            padding: 4}}
        >   
            {/* Header Message */}
            <Box>
                <Typography variant="h2" sx={{ fontWeight: 500, textAlign: 'center', mt: 2, fontStyle: 'italic', fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
                    We make it easy for you !
                </Typography>
            </Box>

            {/* Features Section */}
            <Grid container spacing={3} justifyContent="center" sx={{mt:5}}>
                {/* Expense Tracking */}
                <Box
                sx={{
                    backgroundColor: 'grey', // light gray
                    borderRadius: 2,            // round corners (theme spacing units)
                    p: 5,                       // padding
                    maxWidth: '600px',          // optional: limit width
                    mx: 'auto',                 // optional: center horizontally
                    my: 2                       // optional: vertical margin
                }}
                >   
                    {/* Image */}
                    <Box mb={2}>
                        <img
                        src={ExpensePhoto}
                        alt="Expense Tracking Visual"
                        style={{
                            width: '100%',
                            borderRadius: '12px',
                            maxHeight: '200px',
                            objectFit: 'cover'
                        }}
                        />
                    </Box>
                    <Grid item xs={12} md={4}>
                        <Box textAlign="center">
                            <Typography variant="h6">Expense Tracking</Typography>
                            <Typography color="text.secondary">
                                Stay on top of your spendings with real-time tracking.
                            </Typography>
                        </Box>
                    </Grid>
                </Box>
                
                {/* Budget Planner */}
                <Box
                sx={{
                    backgroundColor: 'grey', // light gray
                    borderRadius: 2,            // round corners (theme spacing units)
                    p: 5,                       // padding
                    maxWidth: '600px',          // optional: limit width
                    mx: 'auto',                 // optional: center horizontally
                    my: 2                       // optional: vertical margin
                }}
                >   
                    {/* Image */}
                    <Box mb={2}>
                        <img
                        src={BudgetPhoto}
                        alt="Expense Tracking Visual"
                        style={{
                            width: '100%',
                            borderRadius: '12px',
                            maxHeight: '200px',
                            objectFit: 'cover'
                        }}
                        />
                    </Box>
                    <Grid item xs={12} md={4}>
                        <Box textAlign="center">
                            <Typography variant="h6">Budget Planner</Typography>
                            <Typography color="text.secondary">
                                Plan your monthly budget and set spending goals.
                            </Typography>
                        </Box>
                    </Grid>
                </Box>

                {/* Investment Overview */}
                <Box
                sx={{
                    backgroundColor: 'grey', // light gray
                    borderRadius: 2,            // round corners (theme spacing units)
                    p: 5,                       // padding
                    maxWidth: '600px',          // optional: limit width
                    mx: 'auto',                 // optional: center horizontally
                    my: 2                       // optional: vertical margin
                }}
                >
                    {/* Image */}
                    <Box mb={2}>
                        <img
                        src={InvestmentPhoto}
                        alt="Expense Tracking Visual"
                        style={{
                            width: '100%',
                            borderRadius: '12px',
                            maxHeight: '200px',
                            objectFit: 'cover'
                        }}
                        />
                    </Box>
                    <Grid item xs={12} md={4}>
                        <Box textAlign="center">
                            <Typography variant="h6">Investment Overview</Typography>
                            <Typography color="text.secondary">
                                Visualize your portfolio and track your financial growth.
                            </Typography>
                        </Box>
                    </Grid>
                </Box>
            </Grid>
        </Box>
    </div>
  )
}

export default Intro