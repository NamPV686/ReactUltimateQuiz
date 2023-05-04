import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from './ModalUpdateUser';
import ModalViewUser from "./ModalViewUser";
import { FcPlus } from 'react-icons/fc';
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from '../../../services/apiService'
import ModalDeleteUser from "./ModalDeleteUser";

const ManagerUser = (props) => {

    const[showModalCreateUser, setModalCreateUser] = useState(false);
    const [showModalUpdateUser, setModalUpdateUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [showModalViewUser, setModalViewUser] = useState(false);
    const [dataView, setDataView] = useState({});
    const [showModalDeleteUser, setModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

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

    const handleClickBtnUpdate = (user) => {
        setModalUpdateUser(true);
        setDataUpdate(user);
    }

    const resetUpdateData = () => {
        setDataUpdate("");
    }

    const handleClickBtnView = (user) => {
        setModalViewUser(true);
        setDataView(user);
    }

    const handleClickBtnDelete = (user) => {
        setModalDeleteUser(true);
        setDataDelete(user);
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
                    <TableUser
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                    />
                </div>
                <ModalCreateUser 
                    show={showModalCreateUser} 
                    setShow={setModalCreateUser}
                    fetchListUser={fetchListUser}
                />
                <ModalUpdateUser 
                    show={showModalUpdateUser} 
                    setShow={setModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    resetUpdateData={resetUpdateData}
                />
                <ModalViewUser
                    show={showModalViewUser} 
                    setShow={setModalViewUser}
                    dataView={dataView}
                    fetchListUser={fetchListUser}
                    resetUpdateData={resetUpdateData}
                />

                <ModalDeleteUser 
                    show={showModalDeleteUser} 
                    setShow={setModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUser={fetchListUser}
                />
            </div>
        </div>
    )
}

export default ManagerUser;