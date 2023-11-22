import { AppBar, Toolbar, styled, Button } from '@mui/material'; 
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

const Component = styled(AppBar)`
    background: #FFFFFF;
    color: black;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
        transition: background 0.3s, color 0.3s;
        &:hover {
            background: #6495ED; 
            color: white;
        }
    }
`;

const Header = () => {
    const navigate = useNavigate();

    const del = () => {
        localStorage.removeItem('hasBeNotified');
    }

    const logout = async () => navigate('/account');

    return (
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link to='/account' onClick={del}>LOGOUT</Link>
            </Container>
        </Component>
    );
}

export default Header;
