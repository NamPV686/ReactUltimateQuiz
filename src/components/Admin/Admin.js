// import {Link} from 'react-router-dom';

// const Admin = (props) => {
//     return(
//         <div>
//             Admin Page
//             <button>
//                 <Link to="/">Home</Link>
//             </button>
//         </div>
//     );
// }

// export default Admin;

// import SideBar from "./NewSideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import SideBar from './SideBar';

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                {/* <SideBar collapsed={collapsed} /> */}
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <FaBars onClick={() => setCollapsed(!collapsed)} />
                content goes here
            </div>
        </div>
    )
}
export default Admin;