import { useEffect, useState } from 'react';
import Select from 'react-select';
import './QuizQA.scss';
import {BiImageAdd} from 'react-icons/bi'
import { BsPatchPlusFill, BsFillPatchMinusFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import _  from 'lodash';
import Lightbox from 'react-awesome-lightbox';
import { getAllQuizForAdmin, postUpsertQA, getQuizWithQA } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const QuizQA = (props) => {
    const initQuestions = [
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
    ];

    const [ dataImagePreview, setDataImagePreview ] = useState({
        title: '',
        url: ''
    });

    const [ questions, setQuestions ] = useState(initQuestions);

    const [ isPreviewImage, setIsPreviewImage ] = useState(false);
    const [ listQuiz, setListQuiz ] = useState([]);
    const [ selectedQuiz, setSelectedQuiz ] = useState();

    useEffect(() => {
        fetchQuiz();
    }, []);

    useEffect(() => {
        if(selectedQuiz && selectedQuiz.value){
            fetchQuizWithQA();
        }
    }, [selectedQuiz]);

    //return a promise that resolves with a File instance
    function urltoFile(url, filename, mimeType){
        return (fetch(url)
            .then(function(res){return res.arrayBuffer();})
            .then(function(buf){return new File([buf], filename,{type:mimeType});})
        );
    }

    const fetchQuizWithQA = async() => {
        let res = await  getQuizWithQA(+selectedQuiz.value);

        if(res && res.EC ===0){
            //Convert base64 to file Oobject
            let newQA =[];
            for(let i = 0; i < res.DT.qa.length; i++){
                let q = res.DT.qa[i];
                if(q.imageFile){
                    q.imageName = `Question-${q.id}.png`;
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`,`Question-${q.id}.png`);
                }
                newQA.push(q);
            }
            setQuestions(newQA)
        }
    }

    const fetchQuiz = async() => {
        let res = await getAllQuizForAdmin();
        if(res && res.EC === 0){
            let newQuiz = res.DT.map(item => {
                return({
                    value: item.id,
                    label: `${item.id}-${item.description}`
                })
            })
            setListQuiz(newQuiz);
        }
    }
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
        if(type === 'ADD'){
            const newAnswer = {
                id: uuidv4(),
                description: '',
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

    const handleSubmitQuestionForQuiz = async() => {
        //validate
        if(_.isEmpty(selectedQuiz)){
            toast.error("Please choose a Quiz!");
            return;
        }

        //validate answer
        let isValidAnswer = true;
        let indexQ = 0, indexA = 0;

        for(let i = 0; i<questions.length; i++){
            for(let j=0; j<questions[i].answers.length; j++){
                if(!questions[i].answers[j].description){
                    isValidAnswer = false;
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if(isValidAnswer === false) break;
        }

        if(isValidAnswer === false){
            toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`);
            return;
        }

        //validate question
        let isValidQuestion = true;
        let indexQ1;

        for(let i = 0; i<questions.length; i++){
                if(!questions[i].description){
                    isValidQuestion = false;
                    indexQ1 = i;
                    break;
                }
            }

        if(isValidQuestion === false){
            toast.error(`Not empty description for Question ${indexQ1 + 1}`);
            return;
        }

        //Submit question
        let questionClone = _.cloneDeep(questions);

        for(let i = 0; i< questionClone.length; i++){
            if(questionClone[i].imageFile){
                questionClone[i].imageFile = await toBase64(questionClone[i].imageFile);
            }
        }
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionClone
        });

        if(res && res.EC === 0){
            toast.success(res.EM);
            fetchQuizWithQA();
        } else{
            toast.error(res.EM);
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

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
            <div className="add-new-question">
                <label>Select Quiz</label>
                <div className='col-6 from-group mt-1 mb-3'>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
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

export default QuizQA;