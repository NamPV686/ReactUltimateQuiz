import { useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { getDataQuiz, postSubmitQuiz } from '../../services/apiService';
import _ from "lodash";
import './DetailQuiz.scss';
import { useState } from "react";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;
    const [ dataQuiz, setDataQuiz ] = useState([]);
    const [ index, setIndex ] = useState(0);
    const location = useLocation();
    const title = location?.state?.quizTitle;
    const [ isShowModalResult, setIsShowModalResult ] = useState(false);
    const [ dataModalResult, setDataModalResult] = useState({});

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const fetchQuestions = async() => {
        let res = await getDataQuiz(quizId);
        
        if(res && res.EC === 0){
            let raw = res.DT;
            let data = _.chain(raw)
            // Group the elements of Array based on `id` property
            .groupBy("id")
            // `key` is group's name (id), `value` is the array of objects
            // .map((value, key) => ({ questionId: key, data: value }))
            .map((value, key) => {
                let answers = [];
                let questionDescription, image = null;
                let isSelected = false;

                value.forEach((item, index) => {
                    if(index === 0){
                        questionDescription = item.description;
                        image = item.image;
                    }
                    item.answers.isSelected = false;
                    answers.push(item.answers);
                });

                answers = _.orderBy(answers, ['id'], ['asc'])
                return(
                    { questionId: key, answers: answers, questionDescription, image}
                )
            })
            .value();
            setDataQuiz(data);
        }
    }

    const handleNext = () => {
        if(dataQuiz && dataQuiz.length > index +1){
            setIndex(index +1);
        }
    }

    const handlePrev = () => {
        if(index > 0){
            setIndex(index - 1);
        }
    }

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId);

        if(question && question.answers){
            let b = question.answers.map((item) => {
                if(+item.id === +answerId){
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            question.answers = b;
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
        if(index > -1){
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }

    const handleFinish = async() => {
        let payload = {
            quizId: +quizId,
            answers: []
        }

        let answers = [];
        if(dataQuiz && dataQuiz.length > 0){
            dataQuiz.forEach((question) => {
                let questionId = question.questionId;
                let userAnswerId = [];

                question.answers.forEach((a) => {
                    if(a.isSelected === true){
                        userAnswerId.push(a.id);
                    }
                })

                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })

            payload.answers = answers;

            //Submit API
            let res = await postSubmitQuiz(payload);

            if(res && res.EC === 0){
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                });
                setIsShowModalResult(true);
            } else{
                alert("Something wrongs...")
            }
        }
    }

    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    <h2>Quiz {quizId}: {title}</h2>
                </div>
                <hr></hr>
                <div className="q-body">
                    
                </div>
                <div className="q-content">
                    <Question 
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : [] } 
                        index={index}
                        handleCheckbox={handleCheckbox}
                    />
                </div>
                <div className="footer">
                    <button className="btn btn-secondary mr-3"  onClick={() => handlePrev()}>Prev</button>
                    <button className="btn btn-primary" onClick={() => handleNext() }>Next</button>
                    <button className="btn btn-warning" onClick={() => handleFinish() }>Finish</button>
                </div>
            </div>
            <div className="right-content">
                <RightContent 
                    dataQuiz={dataQuiz}
                    handleFinish={handleFinish}
                    setIndex={setIndex}
                />
            </div>
            <ModalResult 
                show={isShowModalResult} 
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    );
}

export default DetailQuiz;