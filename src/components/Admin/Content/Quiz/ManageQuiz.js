import { useState, useRef } from 'react';
import './ManageQuiz.scss';
import Select from 'react-select';
import { postCreateNewQuiz } from '../../../../services/apiService';
import {toast } from 'react-toastify';

const ManageQuiz = () => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
      ];

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [image, setImage] = useState(null);
    const imageRef = useRef(null);

    const handleUploadFile = (event) => {
        if(event.target && event.target.files && event.target.files[0]){
            // setPreviewImage(URL.createObjectURL(event.target.files[0]));
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

            setName("");
            setDescription("");
            imageRef.current.value = null;
          }
      
          if(res && res.EC !== 0){
            toast.error(res.EM);
          }
    }

    return (
        <div className="quiz-container">
            <div className="title">
                Manage Quizzes
            </div>
            <hr />
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
                    <div className='mt-3'>
                        <button 
                            className='btn btn-warning'
                            onClick={() => handleSubmitQuiz()}
                        >
                            Save
                        </button>
                    </div>
                </fieldset>
            </div>
            <div className="list-detail">
                Table
            </div>
        </div>
    )
}

export default ManageQuiz;