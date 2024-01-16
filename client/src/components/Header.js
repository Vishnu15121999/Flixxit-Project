import React, { useState } from 'react'
import { AppBar, Box, Button, IconButton, MenuItem, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { styled } from '@mui/system';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState();
    //const [name, setName] = useState([]);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const userData = useSelector((state) => state.user.userDetails);
    const navigate = useNavigate();

    const hanldeEdit = () => {
        navigate('/user');
    }

    const createHandleMenuClick = (menuItem) => {
        return () => {
            console.log(`Clicked on ${menuItem}`);
        };
    };

    return (
        <AppBar className='header-appbar' position='sticky'
            sx={{ background: "linear-gradient(90deg, rgba(2,0,36,1) 38%, rgba(5,5,5,1) 60%, rgba(99,33,52,1) 100%)" }}>
            <Toolbar className='header-toolbar'>
                <h1 className='web-title' variant='h4'>Flixxit Liv</h1>
                {isLoggedIn && <Box className="tabs-box" display={'flex'} marginLeft='auto'>
                    <Tabs className='header-tabs' textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
                        <Tab LinkComponent={Link} to="/trending" label="Trending" />
                        <Tab LinkComponent={Link} to="/tvShow" label="TV Shows" />
                        <Tab LinkComponent={Link} to="/movies" label="Movies" />
                        <Tab LinkComponent={Link} to="/search" label="Search" />
                        <Tab LinkComponent={Link} to="/myList" label="My List" />
                        <Tab LinkComponent={Link} to='/about' label='About' />
                    </Tabs>
                </Box>}
                <Box className="header-box-buttons" display={'flex'} marginLeft='auto'>
                    {!isLoggedIn && <><Button LinkComponent={Link} to="/auth" sx={{ margin: 1, borderRadius: 10 }} color='warning' variant='contained'>Login</Button>
                        <Button LinkComponent={Link} to="/auth" sx={{ margin: 1, borderRadius: 10 }} color='warning' variant='contained'>Signup</Button></>}
                    {isLoggedIn &&
                        <Dropdown>
                            <MenuButton><IconButton><PersonOutlineIcon></PersonOutlineIcon></IconButton></MenuButton>
                            <Menu slots={{ listbox: Listbox }}>
                                <MenuItem><Typography>Hello {userData[0]?.name}</Typography></MenuItem>
                                <MenuItem sx={{ marginTop: 1 }} onClick={createHandleMenuClick('Profile')}><Typography onClick={hanldeEdit}>Edit Profile</Typography></MenuItem>
                                <MenuItem onClick={createHandleMenuClick('Log out')}><Typography onClick={() => dispatch(authActions.logout())} LinkComponent={Link} to='/auth'>Logout</Typography></MenuItem>
                            </Menu>
                        </Dropdown>}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Listbox = styled('ul')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
    z-index: 1;
    `,
);

export default Header;

//<Button onClick={()=>dispatch(authActions.logout())} LinkComponent={Link} to='/auth' sx={{ margin: 1, borderRadius: 10 }} color='warning' variant='contained'>Logout</Button>