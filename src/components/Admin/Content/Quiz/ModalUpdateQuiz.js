import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FcPlus} from 'react-icons/fc'
import {toast } from 'react-toastify';
import { putUpdateQuizForAdmin } from '../../../../services/apiService';
import _ from 'lodash';

const ModalUpdateQuiz = (props) => {
  const {show, setShow, dataUpdateQuiz, resetUpdateData, fetchQuiz} = props;

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setDifficulty("");
    setQuizImage("");
    resetUpdateData();
  };

  const[name, setName] = useState("");
  const[description, setDescription] = useState("");
  const[difficulty, setDifficulty] = useState("");
  const[quizImage, setQuizImage] = useState("");
  const[previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if(!_.isEmpty(dataUpdateQuiz)){
        //Update state
        setName(dataUpdateQuiz.name);
        setDescription(dataUpdateQuiz.description);
        setDifficulty(dataUpdateQuiz.difficulty);
        setQuizImage("");

        if(dataUpdateQuiz.image){
            setPreviewImage(`data:image/jpeg;base64,${dataUpdateQuiz.image}`);
        }
    }
  }, [dataUpdateQuiz]);

  const handleUploadFile = (event) => {
    if(event.target && event.target.files && event.target.files[0]){
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setQuizImage(event.target.files[0]);
    }
  }

  const handleSubmitUpdate = async() => {
    //Call API
    let data = await putUpdateQuizForAdmin(dataUpdateQuiz.id, description, name, difficulty, quizImage);

    if(data && data.EC === 0){
      toast.success(data.EM);
      fetchQuiz();
      handleClose();
    }

    if(data && data.EC !== 0){
      toast.error(data.EM);
    }
  }

  return (
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
                       value={name}
                       onChange={(event) => setName(event.target.value)}
                      />
                  </div>
                  <div className="col-md-6">
                      <label className="form-label">Description</label>
                      <input
                       type="text" 
                       className="form-control" 
                       value={description}
                       onChange={(event) => setDescription(event.target.value)}
                      />
                  </div>
                  <div className="col-md-6">
                      <label className="form-label">Difficulty</label>
                      <select className="form-select" onChange={(event) => setDifficulty(event.target.value)} value={difficulty}>
                          <option value="EASY">EASY</option>
                          <option value="MEDIUM">MEDIUM</option>
                          <option value="HARD">HARD</option>
                      </select>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label label-upload" htmlFor='labelUpload'><FcPlus/>Upload File Image</label>
                    <input 
                     type='file' 
                     hidden 
                     id='labelUpload'
                     onChange={(event) => handleUploadFile(event)}
                    />
                  </div>
                  <div className='col-md-12 img-preview'>
                    {
                      previewImage
                      ?
                      <img src={previewImage} />
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
          <Button variant="primary" onClick={() => handleSubmitUpdate()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateQuiz;