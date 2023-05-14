import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import {BiImageAdd} from 'react-icons/bi'
import { BsPatchPlusFill, BsFillPatchMinusFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const Questions = (props) => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
      ];

    const [ selectedQuiz, setSelectedQuiz ] = useState();

    const [ questions, setQuestions ] = useState(
        [
            {
                id: uuidv4(),
                description: 'questions 1',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: 'answer 1',
                        isCorrect: false
                    }
                ]
            }
        ]
    );

    const handleAddRemoveQuestion = (type, id) => {
        if(type === 'ADD'){
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: 'answer 1',
                        isCorrect: false
                    }
                ]
            }
            
            setQuestions([...questions, newQuestion]);
        }

        if(type === 'REMOVE'){
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestions(questionClone);
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionClone = _.cloneDeep(questions);

        if(type === 'ADD'){
            const newAnswer = {
                id: uuidv4(),
                description: 'answer 1',
                isCorrect: false
            }

            let index = questionClone.findIndex(item => item.id === questionId);
            questionClone[index].answers.push(newAnswer);
            setQuestions(questionClone);
        }

        if(type === 'REMOVE'){
            let index = questionClone.findIndex(item => item.id === questionId);
            questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionClone);
        }
    }

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
                {
                    questions && questions.length > 0
                    && questions.map((question, index) => {
                        return(
                            <div key={question.id} className='q-main mb-3'>
                                <div className='question-content'>
                                    <div className="col-md-6">
                                        <input 
                                        type="text" 
                                        className="form-control"
                                        value={question.description}
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
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <BsPatchPlusFill className='icon-add'/>
                                        </span>
                                        {
                                            questions && questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <BsFillPatchMinusFill className='icon-delete'/>
                                            </span>
                                        }
                                    </div>
                                </div>
                                {
                                    question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => {
                                        return(
                                            <>
                                                <div key={answer.id} className='answer-content mt-3'>
                                                    <div className="form-check mt-1">
                                                        <input className="form-check-input" 
                                                            type="checkbox"
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <input
                                                        type="text" 
                                                        value={answer.description}
                                                        className="form-control"
                                                        />
                                                    </div>
                                                    <div className='col-md-5 btn-add'>
                                                        <span onClick={() => handleAddRemoveAnswer('ADD', question.id, '')}>
                                                            <BsPatchPlusFill className='icon-add'/>
                                                        </span>
                                                        {
                                                            question.answers && question.answers.length > 1 &&
                                                            <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                                <BsFillPatchMinusFill className='icon-delete'/>
                                                            </span>
                                                        }
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
} 

export default Questions;