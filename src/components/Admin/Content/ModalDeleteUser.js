import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import './ManageUser.scss';
import { deleteUser } from "../../../services/apiService";
import {toast } from 'react-toastify';

const ModalDeleteUser = (props) => {
  const {show, setShow, dataDelete, fetchListUser} = props;

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmitDeleteUser = async() => {
    let data = await deleteUser(dataDelete.id);

    if(data && data.EC === 0){
      toast.success(data.EM);
      handleClose();
      await fetchListUser();
    }

    if(data && data.EC !== 0){
      toast.error(data.EM);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete the user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure delete this user: <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            variant="danger"
            onClick={() => handleSubmitDeleteUser()}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;