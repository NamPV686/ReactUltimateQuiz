import ModalCreateUser from "./ModalCreateUser";

const ManagerUser = () => {
    return(
        <div className="manager-user-container">
            <div className="title">
                ManagerUser
            </div>
            <div className="user-content">
                <div>
                    <button>Add New User</button>
                </div>
                <div>
                    Table
                    <ModalCreateUser />
                </div>
            </div>
        </div>
    )
}

export default ManagerUser;