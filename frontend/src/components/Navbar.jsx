import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const Navbar = () => {
    const navItems = [
        {label: "About us", href: "#"}
    ]

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
        <div className="container px-4 mx-auto relative text-sm">
            <div className="flex justify center item-center">
                <div className="flex item-center flex-shrink-0 mr-5">
                    <span className="text-xl tracking-tight">Finance Buddy</span>
                </div>
                <ul className="flex hidden lg:flex ml-14 space-x-12 m-5">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <a href={item.href}>{item.label}</a>
                        </li>
                    ))}
                </ul>
                <div>
                    <Stack direction="row" spacing={2}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <Avatar alt="Jo Ishizaki" src="/static/images/avatar/2.jpg" />
                        <Avatar alt="Andres Contreras" src="/static/images/avatar/3.jpg" />
                    </Stack>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar