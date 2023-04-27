import {Link} from 'react-router-dom';

const Admin = () => {
    return(
        <div>
            Admin Page
            <button>
                <Link to="/">Home</Link>
            </button>
        </div>
    );
}

export default Admin;