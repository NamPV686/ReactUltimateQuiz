import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import {BiImageAdd} from 'react-icons/bi'
import { BsPatchPlusFill, BsFillPatchMinusFill } from 'react-icons/bs';

const Questions = (props) => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
      ];

    const [ selectedQuiz, setSelectedQuiz ] = useState();

    return(
        <div className="questions-container">
            <div className="title">
                Manager Question
            </div>
            <div className="add-new-question">
                <label>Select Quiz</label>
                <div className='col-6 from-group mt-1 mb-3'>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                        placeholder={"Question type..."}
                    />
                </div>
                <div>Add Question</div>
                <div>
                    <div className='question-content'>
                        <div className="col-md-6">
                            <input 
                            type="text" 
                            className="form-control"
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label label-upload" htmlFor='labelUpload'><BiImageAdd className='icon-image'/>Upload File Image</label>
                            <input 
                            type='file' 
                            hidden
                            id='labelUpload'
                            />
                        </div>
                        <div className='col-md-5 btn-add'>
                            <span><BsPatchPlusFill className='icon-add'/></span>
                            <span><BsFillPatchMinusFill className='icon-delete'/></span>
                        </div>
                    </div>
                    <div className='answer-content mt-3'>
                        <div className="form-check mt-1">
                            <input className="form-check-input" 
                                type="checkbox"
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                            type="text" 
                            placeholder='Answer 1'
                            className="form-control"
                            />
                        </div>
                        <div className='col-md-5 btn-add'>
                            <span><BsPatchPlusFill className='icon-add'/></span>
                            <span><BsFillPatchMinusFill className='icon-delete'/></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default Questions;