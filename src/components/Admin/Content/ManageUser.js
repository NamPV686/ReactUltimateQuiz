import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from './ModalUpdateUser';
import ModalViewUser from "./ModalViewUser";
import { FcPlus } from 'react-icons/fc';
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers, getUserWithPaginate } from '../../../services/apiService'
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManagerUser = (props) => {
    
    const LIMIT_USER = 6;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [showModalCreateUser, setModalCreateUser] = useState(false);
    const [showModalUpdateUser, setModalUpdateUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [showModalViewUser, setModalViewUser] = useState(false);
    const [dataView, setDataView] = useState({});
    const [showModalDeleteUser, setModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [listUser, setListUser] = useState([]);

    //ComponentDidmount
    useEffect(() => {
        // fetchListUser();
        fetchListUserWithPaginate(1);
    }, []);

    const fetchListUser = async() => {
        let res = await getAllUsers();

        if(res.EC === 0){
            setListUser(res.DT);
        }
    }

    const fetchListUserWithPaginate = async(page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if(res.EC === 0){
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages);
            setCurrentPage(page);
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
                    {/* <TableUser
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                    <TableUserPaginate
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser 
                    show={showModalCreateUser} 
                    setShow={setModalCreateUser}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                />
                <ModalUpdateUser 
                    show={showModalUpdateUser} 
                    setShow={setModalUpdateUser}
                    dataUpdate={dataUpdate}
                    resetUpdateData={resetUpdateData}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                />
                <ModalViewUser
                    show={showModalViewUser} 
                    setShow={setModalViewUser}
                    dataView={dataView}
                    resetUpdateData={resetUpdateData}
                />

                <ModalDeleteUser 
                    show={showModalDeleteUser} 
                    setShow={setModalDeleteUser}
                    dataDelete={dataDelete}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                />
            </div>
        </div>
    )
}

export default ManagerUser;