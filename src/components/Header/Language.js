import NavDropdown from 'react-bootstrap/NavDropdown';

const Language = (props) => {
    return(
        <>
            <NavDropdown title="Tiếng Việt" id="basic-nav-dropdown1" className='language'>
                  <NavDropdown.Item>English</NavDropdown.Item>
                  <NavDropdown.Item>Tiếng Việt</NavDropdown.Item>
              </NavDropdown>
        </>
    )
}

export default Language;