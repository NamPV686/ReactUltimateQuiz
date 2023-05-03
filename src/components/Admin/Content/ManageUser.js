import ModalCreateUser from "./ModalCreateUser";
import {FcPlus} from 'react-icons/fc';
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import {getAllUsers} from '../../../services/apiService'

const ManagerUser = (props) => {

    const[showModalCreateUser, setModalCreateUser] = useState(false);
    const [listUser, setListUser] = useState([]);

    //ComponentDidmount
    useEffect(() => {
        fetchListUser();
    }, []);

    const fetchListUser = async() => {
        let res = await getAllUsers();

        if(res.EC === 0){
            setListUser(res.DT);
        }
    }


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
                    <TableUser listUser={listUser} />
                </div>
                <ModalCreateUser 
                    show={showModalCreateUser} 
                    setShow={setModalCreateUser}
                    fetchListUser={fetchListUser}
                />
            </div>
        </div>
    )
}

export default ManagerUser;