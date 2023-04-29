import {Link} from "react-router-dom";

const User = (props) => {
    return(
        <div>
            User Page
            <button>
                <Link to="/">Home</Link>
            </button>
        </div>
    );
}

export default User;