import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FcPlus} from 'react-icons/fc'

const ModalViewQuiz = (props) => {
    const {show, setShow, dataViewQuiz} = props;

    const handleClose = () => {
        setShow(false);
      };

    return(
            <>
                <Modal show={show} onHide={handleClose} size='xl' backdrop="static" className='modal-add-user'>
                    <Modal.Header closeButton>
                    <Modal.Title>Update Quiz</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Name</label>
                                <input 
                                type="text" 
                                className="form-control"
                                value={dataViewQuiz.name}
                                disabled
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Description</label>
                                <input
                                type="text" 
                                className="form-control" 
                                value={dataViewQuiz.description}
                                disabled
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Difficulty</label>
                                <select className="form-select" disabled value={dataViewQuiz.difficulty}>
                                    <option value="EASY">EASY</option>
                                    <option value="MEDIUM">MEDIUM</option>
                                    <option value="HARD">HARD</option>
                                </select>
                            </div>
                            <div className='col-md-12 img-preview'>
                                {
                                dataViewQuiz.image
                                ?
                                <img src={`data:image/jpeg;base64,${dataViewQuiz.image}`} />
                                :
                                <span>preview image</span>
                                }
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
    )
}

export default ModalViewQuiz;