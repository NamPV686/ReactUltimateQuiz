import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz } from '../../../../services/apiService';
import {toast } from 'react-toastify';

const ModalDeleteQuiz = (props) => {
  const {show, setShow, dataDelete, fetchQuiz} = props;

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmitDeleteUser = async() => {
    let data = await deleteQuiz(dataDelete.id);

    if(data && data.EC === 0){
      toast.success(data.EM);
      handleClose();
      await fetchQuiz();
    }

    if(data && data.EC !== 0){
      toast.error(data.EM);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete the quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure delete this Quiz: <b>{dataDelete && dataDelete.name ? dataDelete.name : ""}</b>
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

export default ModalDeleteQuiz;