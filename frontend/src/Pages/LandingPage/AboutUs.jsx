import React from 'react'
import Navbar from '../../components/Navbar'
import { Box, Typography, useScrollTrigger, Container, Grid, Avatar } from '@mui/material'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <Box
        sx={
        {height: "100vh",
        width: "100vw",
        display: "flex",  // Enables flexbox layout
        flexDirection: "column",  // Arranges children in a column
        alignItems: "center",  // Centers content horizontally
        textAlign: "center",  // Aligns text to the center
        background: "linear-gradient(to right, #1e3c72, #2a5298)", // Adds a blue gradient background
        color: "white",  // Sets text color to white
        padding: 4}}  // Adds padding around the content
      >
        <Typography variant="h3" sx={{ fontWeight: 600, textAlign: 'center', mb: 2, fontStyle: 'italic', fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
          Who are we? 
        </Typography>

        {/* Introduction Section */}
        <Typography variant="h6" sx={{ mb: 4 }}>
          We are a passionate team focused on creating the best financial analysis tool.
        </Typography>

        {/* Team Section */}
        <Typography variant="h3" sx={{ fontWeight: 600, textAlign: 'center', mb: 2, fontStyle: 'italic', fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
          Meet Our Team
        </Typography>

          
        <Grid container spacing={3}>  {/* the Container prop tells MUI this Grid is a parent that will hold grid items. Inside it, 
        you add <Grid item> elements as children, each representing a cell in a grid */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar
                alt="John Doe"
                src="https://via.placeholder.com/150"
                sx={{ width: 120, height: 120, margin: '0 auto' }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Joe
              </Typography>
              <Typography variant="body2" >
                Chief Technology Officer
              </Typography>
              <Typography variant="body2"  sx={{ mt: 1 }}>
                Frontend
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar
                alt="Jane Smith"
                src="https://via.placeholder.com/150"
                sx={{ width: 120, height: 120, margin: '0 auto' }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Asal 
              </Typography>
              <Typography variant="body2" >
                Project Manager
              </Typography>
              <Typography variant="body2"  sx={{ mt: 1 }}>
                Frontend
              </Typography>
            </Box>
          </Grid>

          {/* Add additional team members */}
        </Grid>
        {/* Our Vision Section */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 3 }}>
            Our Vision
          </Typography>
          <Typography variant="body1" paragraph>
            Our goal is to democratize financial literacy. We believe that everyone should have access to the tools they
            need to understand their finances and make informed decisions. Through our app, we aim to provide transparency
            and control over personal and business finances, driving smarter financial decisions.
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

export default AboutUs