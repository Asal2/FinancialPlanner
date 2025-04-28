import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import { SignInButton } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";

const pages = [
  { label: "About us", path: "/aboutUs" },
  { label: "Intro", path: "/intro" },
];

function ResponsiveAppBar() {
  const location = useLocation();

  return (
    <AppBar position="static" sx={{ display: "flex", width: "100vw" }}>
      {" "}
      {/* the navigation bar remains at the top */}
      <Toolbar disableGutters sx={{ ml: 5, mr: 5 }}>
        {" "}
        {/* with "disableGutters",acts as a flexible layout container for aligning items inside the AppBar */}
        <AdbIcon sx={{ display: "flex", mr: 4 }} />
        {/* For Desktop: Here is for the letter 'Finance Buddy' */}
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: "flex",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            marginRight: 4,
            cursor: "pointer",
          }}>
          Finance Buddy
        </Typography>
        {/* for desktop: show navigation bar list */}
        <Box sx={{ flexGrow: 1, display: "flex", marginRight: 3 }}>
          <ul className="flex items-center">
            {pages.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`gap-2 p-3 rounded-md ${
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
        {/* Right: Sign-in button */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SignInButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
