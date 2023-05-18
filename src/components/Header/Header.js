import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {NavLink, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';

const Header = (props) => {
  const navigate = useNavigate();
  const account = useSelector(state => state.user.account);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogin = () => {
    navigate('/login');
  }

  const handleSignUp = () => {
    navigate('/register');
  }

  const handleLogout = async() => {
    let res = await logout(account.email, account.refresh_token);
    if(res && res.EC === 0){
      //clear data redux
      dispatch(doLogout());
      
      navigate('/login');
    } else{
      toast.error(res.EM);
    }
    console.log(res)
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink to="/" className="navbar-brand">Quiz</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/users" className="nav-link">Users</NavLink>
            <NavLink to="/admins" className="nav-link">Admin</NavLink>         
          </Nav>
          <Nav>
            {
              isAuthenticated === false ?
              <>
                <button className='btn-login' onClick={() => handleLogin()}>Log in</button>
                <button className='btn-signup' onClick={() => handleSignUp()}>Sign up</button>
              </>
              :
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
              </NavDropdown>
              }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;