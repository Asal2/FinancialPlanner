import React from 'react';
import Navbar from '../../components/Navbar';
import { Box, Typography, Grid, Avatar, Container, Paper } from '@mui/material';

const teamMembers = [
  { name: 'Joe', role: 'Frontend', image: 'https://cdn.discordapp.com/attachments/1328360376571527168/1365422841025269811/E5F777FD-A824-40D6-A280-15508FDD382F_1_102_o.jpeg?ex=680fe39d&is=680e921d&hm=9f281ea7a4ea182c35f5d33918e68bf647a5771433e0df7e2d720ef3928d8fc2&' },
  { name: 'Asal', role: 'Frontend', image: 'https://cdn.discordapp.com/attachments/1328360376571527168/1366226742926250074/IMG_1116_Original.jpg?ex=68102d4e&is=680edbce&hm=83c565a81bc9f262e02762194f51033a69f9a4adb498c5112f720911fb3dd9f6&' },
  { name: 'Aryan', role: 'Backend', image: 'https://cdn.discordapp.com/attachments/1328360376571527168/1366238831057174528/IMG_1553.jpg?ex=68103890&is=680ee710&hm=a259cb28f663ff9e756c7d439638091c3279807e904351053654f370d1072eb8&' },
  { name: 'Ethan', role: 'Backend', image: 'https://cdn.discordapp.com/attachments/1365426386231365712/1366233439858327653/LinkedIn_pfp.png?ex=6810338b&is=680ee20b&hm=9594bb270a92385b92a388e88b4d54ed1255d98f00c1ca5baca0c7d82aa20e9f&' },
];

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <Box sx={{wordBreak: 'break-word',
      minHeight: '100vh',
      display: "flex",  // Enables flexbox layout
      background: "linear-gradient(to right, #1e3c72, #2a5298)", // Adds a blue gradient background
      color: "white",  // Sets text color to white
      }}>
        <Container maxWidth="lg" sx={{ py: 6, background: "linear-gradient(to right, #1e3c72, #2a5298)", minWidth: '100vw'}}>
          {/* Who Are We Section */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              textAlign: 'center',
              mb: 3,
              fontStyle: 'italic',
              fontFamily: 'Comic Sans MS, cursive',
            }}
          >
            Who are we?
          </Typography>

          <Typography
            variant="h6"
            sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mb: 6 }}
          >
            We are a passionate team focused on creating the best financial analysis tool.
          </Typography>

          {/* Team Section */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              textAlign: 'center',
              mb: 3,
              fontStyle: 'italic',
              fontFamily: 'Comic Sans MS, cursive',
            }}
          >
            Meet Our Team
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: 3,
                  }}
                >
                  <Avatar
                    alt={member.name}
                    src={member.image}
                    sx={{ width: 100, height: 100, margin: '0 auto', mb: 2 }}
                  />
                  <Typography variant="h6">{member.name}</Typography>
                  <Typography variant="body2">{member.role}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Vision Section */}
          <Box sx={{ mt: 8 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                textAlign: 'center',
                mb: 3,
                fontStyle: 'italic',
                fontFamily: 'Comic Sans MS, cursive',
              }}
            >
              Our Vision
            </Typography>

            <Typography
              variant="h6"
              sx={{
                maxWidth: 900,
                mx: 'auto',
                textAlign: 'center',
                fontWeight: 400,
                lineHeight: 1.7,
              }}
            >
              Our goal is to democratize financial literacy. We believe that everyone should have access to the tools they
              need to understand their finances and make informed decisions. Through our app, we aim to provide transparency
              and control over personal and business finances, driving smarter financial decisions.
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default AboutUs;
