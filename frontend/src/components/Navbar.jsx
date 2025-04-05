import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
//import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
//import Menu from '@mui/material/Menu';
//import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
//import Avatar from '@mui/material/Avatar';
//import Button from '@mui/material/Button';
//import Tooltip from '@mui/material/Tooltip';
//import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { SignInButton } from '@clerk/clerk-react'
import { Link, useLocation } from 'react-router-dom'

const pages = [{label: 'About us', path: "/aboutUs"}]; 

function ResponsiveAppBar() {
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  

  return (
    <AppBar position="static"> {/* the navigation bar remains at the top */}
      <Container maxWidth="xl"> {/* limiting the width and keep it responsive*/}
        <Toolbar disableGutters> {/* acts as a flexible layout container for aligning items inside the AppBar */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 4 }} /> {/* Android logo is displayed only on medium and larger screens*/}

          {/* For Desktop: Here is for the letter 'Finance Buddy' */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              marginRight: 4,
              cursor: "pointer"
            }}
          >
            Finance Buddy 
          </Typography>

          {/* for desktop: show navigation bar list */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginRight: 3 }}> 
            <ul className="flex items-center">
              {pages.map(({label, path}) => (
                <li key={path}>
                  <Link
                    to={path} 
                    className={`gap-2 p-2 rounded-md ${     
                      location.pathname === path
                        ? "text-green-300 font-bold "
                        : "text-white-600 hover:text-green-300 font-bold"
                    }`}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
          <SignInButton />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;