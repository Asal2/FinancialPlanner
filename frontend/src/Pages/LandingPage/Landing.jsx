import React from 'react'
import Navbar from '../../components/Navbar'
import { Box, Button, Typography } from "@mui/material";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  
  return (
    <div>
      <Navbar />
      <Box
        sx={
        {minHeight: "100vh",
        width: "100vw",
        display: "flex",  // Enables flexbox layout
        flexDirection: "column",  // Arranges children in a column
        alignItems: "center",  // Centers content horizontally
        textAlign: "center",  // Aligns text to the center
        background: "linear-gradient(to right, #1e3c72, #2a5298)", // Adds a blue gradient background
        color: "white",  // Sets text color to white
        padding: 4}}  // Adds padding around the content
      >
        <Typography variant="h2" fontWeight="bold" sx={{mt: 10}}>
          Welcome to Finance Buddy
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.8, mt: 5 }}>
          Your ultimate financial companion.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to='/intro'
          sx={{ mt: 5, backgroundColor: "#4CAF50", "&:hover": { backgroundColor: "#388E3C" } }}
        >
          Get Started
        </Button>
        <DotLottieReact
          src="https://lottie.host/cf6aa1d5-de95-407e-856d-b6d0f8d41537/F6eyevPRch.lottie"
          loop
          autoplay
          className="mt-10"
        />
      </Box>
    </div>
  )
}

export default Landing