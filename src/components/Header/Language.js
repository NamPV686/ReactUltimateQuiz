import { useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation, Trans } from 'react-i18next';

const Language = (props) => {
    const { t, i18n } = useTranslation();
    // const [ title, setTitle ] = useState("Việt Nam");
    const [ title, setTitle ] = useState(i18n.language==='vi' ? "Việt Nam" : "English");

    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
        if(language === 'vi'){
            setTitle("Việt Nam")
        }

        if(language === 'en'){
            setTitle("English")
        }
    }
    return(
        <>
            <NavDropdown title={title} id="basic-nav-dropdown1" className='language'>
                  <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>English</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>Việt Nam</NavDropdown.Item>
              </NavDropdown>
        </>
    )
}

export default Language;