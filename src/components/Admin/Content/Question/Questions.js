import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import {BiImageAdd} from 'react-icons/bi'
import { BsPatchPlusFill, BsFillPatchMinusFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import _  from 'lodash';
import Lightbox from 'react-awesome-lightbox';

const Questions = (props) => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
      ];

    const [ dataImagePreview, setDataImagePreview ] = useState({
        title: '',
        url: ''
    });
    const [ isPreviewImage, setIsPreviewImage ] = useState(false);
    const [ selectedQuiz, setSelectedQuiz ] = useState();
    const [ questions, setQuestions ] = useState(
        [
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
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
                        description: '',
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
        console.log("Q: ", questions)
        if(type === 'ADD'){
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }

            let index = questionClone.findIndex(item => item.id === questionId);
            questionClone[index].answers.push(newAnswer);
            setQuestions(questionClone);
            console.log("Q: ", questions)
        }

        if(type === 'REMOVE'){
            let index = questionClone.findIndex(item => item.id === questionId);
            questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionClone);
        }
    }

    const handleOnChange = (type, questionId, value) => {
        if(type === 'QUESTION'){
            let questionClone = _.cloneDeep(questions);
            let index = questionClone.findIndex(item => item.id === questionId);

            if(index > -1){
                questionClone[index].description = value;
                setQuestions(questionClone);
            }
        }
    }

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);

        if(index > -1 && event.target && event.target.files && event.target.files[0]){
            questionClone[index].imageFile = event.target.files[0];
            questionClone[index].imageName = event.target.files[0].name;
            setQuestions(questionClone);
        }
    }

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);

        if(index > -1){
            questionClone[index].answers = questionClone[index].answers.map(answer => {
                if(answer.id === answerId){
                    if(type === 'CHECKBOX'){
                        answer.isCorrect = value;
                    }

                    if(type === 'INPUT'){
                        answer.description = value;
                    }
                }
                return answer;
            })
            setQuestions(questionClone);
        }
    }

    const handleSubmitQuestionForQuiz = () => {
        console.log("Question: ", questions)
    }

    const handlePreviewImage = (questionId) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === questionId)
        if(index > -1){
            setDataImagePreview({
                url: URL.createObjectURL(questionClone[index].imageFile),
                title: questionClone[index].imageName
            })
            setIsPreviewImage(true);
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
                                            placeholder='Question'
                                            value={question.description}
                                            onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label 
                                            className="form-label label-upload" 
                                            htmlFor={`${question.id}`}
                                        >
                                            <span><BiImageAdd className='icon-image'/></span>
                                        </label>
                                        <input
                                            type='file' 
                                            hidden
                                            id={`${question.id}`}
                                            onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                        />
                                        <span>
                                            { 
                                                question && question.imageName ? 
                                                <span onClick={() => handlePreviewImage(question.id)}>{question.imageName} </span>
                                                : 
                                                'Upload File Image'
                                            }
                                        </span>
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
                                            <div key={answer.id} className='answer-content mt-3'>
                                                <div className="form-check mt-1">
                                                    <input className="form-check-input" 
                                                        type="checkbox"
                                                        checked={answer.isCorrect}
                                                        onChange={(event) => handleAnswerQuestion('CHECKBOX', question.id, answer.id, event.target.checked)}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                    type="text" 
                                                    placeholder='Answer'
                                                    value={answer.description}
                                                    className="form-control"
                                                    onChange={(event) => handleAnswerQuestion('INPUT', question.id, answer.id, event.target.value)}
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
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button 
                            className='btn btn-warning'
                            onClick={() => handleSubmitQuestionForQuiz()}
                        >
                            Save Questions
                        </button>
                    </div>
                }
                {
                    isPreviewImage === true &&
                    <Lightbox 
                        image={dataImagePreview.url}
                        title={dataImagePreview.title} 
                        onClose={() => setIsPreviewImage(false)}
                    ></Lightbox>
                }
            </div>
        </div>
    )
} 

export default Questions;