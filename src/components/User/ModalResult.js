import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';

const ModalResult = (props) => {
  const {show, setShow, dataModalResult} = props;

  const handleClose = () => {
    setShow(false);
  };
  
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Your result......</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>Total Question: <b>{dataModalResult.countTotal}</b></div>
            <div>Total Correct Answer:<b>{dataModalResult.countCorrect}</b> </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">
            Show answers
          </Button>
          <Button 
            variant="danger"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalResult;