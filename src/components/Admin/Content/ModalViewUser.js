import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import './ManageUser.scss'

const ModalViewUser = (props) => {
  const {show, setShow, dataView, resetUpdateData} = props;

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreviewImage("");
    resetUpdateData();
  };

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[username, setUsername] = useState("");
  const[role, setRole] = useState("USER");
  const[image, setImage] = useState("");
  const[previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if(!_.isEmpty(dataView)){
        //Update state
        setEmail(dataView.email);
        setUsername(dataView.username);
        setRole(dataView.role);

        if(dataView.image){
            setPreviewImage(`data:image/jpeg;base64,${dataView.image}`);
        }
    }
  }, [dataView]);

  return (
    <>
      <Modal show={show} onHide={handleClose} size='xl' backdrop="static" className='modal-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>User Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3">
                  <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input 
                       type="email" 
                       className="form-control"
                       value={email}
                       disabled
                       />
                  </div>
                  <div className="col-md-6">
                      <label className="form-label">Password</label>
                      <input
                       type="password" 
                       className="form-control" 
                       value={password}
                       disabled
                      />
                  </div>
                  <div className="col-md-6">
                      <label className="form-label">Username</label>
                      <input
                       type="text" 
                       className="form-control"
                       disabled
                       value={username}
                      />
                  </div>
                  <div className="col-md-4">
                      <label className="form-label">Role</label>
                      <select className="form-select" disabled value={role}>
                          <option value="USER">USER</option>
                          <option value="ADMIN">ADMIN</option>
                      </select>
                  </div>
                  <div>
                    <label>Image</label>
                    <div className='col-md-12 img-preview'>
                        {
                        previewImage
                        ?
                        <img src={previewImage} />
                        :
                        <span>preview image</span>
                        }
                    </div>
                  </div>
              </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalViewUser;