import { useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import {FcPlus} from 'react-icons/fc'

const ManagerUser = (props) => {

    const[showModalCreateUser, setModalCreateUser] = useState(false);

    return(
        <div className="manager-user-container">
            <div className="title">
                ManagerUser
            </div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-secondary" onClick={() => setModalCreateUser(true)}><FcPlus/>Add New User</button>
                </div>
                <div className="table-users-container">
                    Table
                </div>
                <ModalCreateUser show={showModalCreateUser} setShow={setModalCreateUser}/>
            </div>
        </div>
    )
}

export default ManagerUser;