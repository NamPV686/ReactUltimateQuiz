import { useState, useRef, useEffect } from 'react';
import './ManageQuiz.scss';
import Select from 'react-select';
import { postCreateNewQuiz, getAllQuizForAdmin } from '../../../../services/apiService';
import {toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import ModalUpdateQuiz from './ModalUpdateQuiz';
import ModalViewQuiz from './ModalViewQuiz';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';

const ManageQuiz = () => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
      ];

    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ difficulty, setDifficulty ] = useState("");
    const [ image, setImage ] = useState(null);
    const imageRef = useRef(null);
    const [ showModalDeleteQuiz, setShowModalDeleteQuiz ] = useState(false);
    const [ showModalUpdateQuiz, setShowModalUpdateQuiz ] = useState(false);
    const [ previewImage, setPreviewImage ] = useState("");
    const [ dataDelete, setDataDelete ] = useState({});
    const [ listQuiz, setListQuiz ] = useState([]);
    const [ dataUpdateQuiz, setDataUpdateQuiz ] = useState({});
    const [ showModalViewQuiz, setShowModalViewQuiz ] = useState(false);
    const [ dataViewQuiz, setDataViewQuiz ] = useState({});

    useEffect(() => {
        fetchQuiz();
    },[]);

    const fetchQuiz = async() => {
        let res = await getAllQuizForAdmin();
        if(res && res.EC === 0){
            setListQuiz(res.DT);
        }
    }

    const handleUploadFile = (event) => {
        if(event.target && event.target.files && event.target.files[0]){
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
          }
    }

    const handleSubmitQuiz = async() => {
        if(!description || !name){
            toast.error("Name or Description is empty");
            return;
        }

        let res = await postCreateNewQuiz(description, name, difficulty?.value, image);

        if(res && res.EC === 0){
            toast.success(res.EM);
            fetchQuiz();

            setName("");
            setDescription("");
            setPreviewImage("");
            imageRef.current.value = null;
          }
      
          if(res && res.EC !== 0){
            toast.error(res.EM);
          }
    }

    const handleClickBtnDelete = (quiz) => {
        setShowModalDeleteQuiz(true);
        setDataDelete(quiz);
    }

    const handleClickBtnUpdate = (quiz) => {
        setShowModalUpdateQuiz(true);
        setDataUpdateQuiz(quiz);
    }

    const resetUpdateData = () => {
        setDataUpdateQuiz("");
    }

    const handleClickBtnView = (quiz) => {
        setShowModalViewQuiz(true);
        setDataViewQuiz(quiz);
    }

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className="title">Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add New Quiz</legend>
                                <div className="form-floating mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Name" 
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label>Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Description" 
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <label>Description</label>
                                </div>
                                <div className='mt-3'>
                                    <Select
                                        defaultValue={difficulty}
                                        onChange={setDifficulty}
                                        options={options}
                                        placeholder={"Quiz type..."}
                                    />
                                </div>
                                <div className="more-actions mt-3">
                                    <label className='mb-2'>Upload Image</label>
                                    <input 
                                        type="file" 
                                        ref={imageRef}
                                        className="form-control" 
                                        onChange={(event) => handleUploadFile(event)}
                                    />
                                </div>
                                <div className='col-md-12 mt-3 img-preview'>
                                    {
                                    previewImage
                                    ?
                                    <img src={previewImage} />
                                    :
                                    <span>preview image</span>
                                    }
                                </div>
                                <div className='mt-3'>
                                    <button 
                                        className='btn btn-warning'
                                        onClick={() => handleSubmitQuiz()}
                                    >
                                        Save
                                    </button>
                                </div>
                                <div className="list-detail mt-3">
                                    <TableQuiz 
                                        listQuiz={listQuiz}
                                        handleClickBtnDelete={handleClickBtnDelete}
                                        handleClickBtnUpdate={handleClickBtnUpdate}
                                        handleClickBtnView={handleClickBtnView}
                                    />
                                </div>
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header className="title">Update Q/A Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <fieldset className="border rounded-3 p-3">
                            <legend className="float-none w-auto px-3">Manager Question</legend>
                            <QuizQA/>
                        </fieldset>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header className="title">Assign to Users</Accordion.Header>
                    <Accordion.Body>
                        <fieldset className="border rounded-3 p-3">
                            <AssignQuiz />
                        </fieldset>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <ModalDeleteQuiz
                show={showModalDeleteQuiz} 
                setShow={setShowModalDeleteQuiz}
                dataDelete={dataDelete}
                fetchQuiz={fetchQuiz}
            />
            <ModalUpdateQuiz 
                show={showModalUpdateQuiz} 
                setShow={setShowModalUpdateQuiz}
                dataUpdateQuiz={dataUpdateQuiz}
                fetchQuiz={fetchQuiz}
                resetUpdateData={resetUpdateData}
            />
            <ModalViewQuiz 
                show={showModalViewQuiz} 
                setShow={setShowModalViewQuiz}
                dataViewQuiz={dataViewQuiz}
            />
        </div>
    )
}

export default ManageQuiz;