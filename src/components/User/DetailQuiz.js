import { useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { getDataQuiz } from '../../services/apiService';
import _ from "lodash";
import './DetailQuiz.scss';
import { useState } from "react";

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;

    const location = useLocation();
    const title = location?.state?.quizTitle;
    console.log(title);

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

                value.forEach((item, index) => {
                    if(index === 0){
                        questionDescription = item.description;
                        image = item.image;
                    }
                    answers.push(item.answers);
                });

                return(
                    { questionId: key, answers: answers, questionDescription, image }
                )
            })
            .value();
            console.log(data);
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
                    <div className="question">
                        Câu Hỏi 1: How are you doing?
                    </div>
                    <div className="answer">
                        <div className="a-child">A. Đáp án 1</div>
                        <div className="a-child">B. Đáp án 2</div>
                        <div className="a-child">C. Đáp án 3</div>
                    </div>
                </div>
                <div className="footer">
                    <button className="btn btn-secondary mr-3">Prev</button>
                    <button className="btn btn-primary">Next</button>
                </div>
            </div>
            <div className="right-content">
                right-content
            </div>
        </div>
    );
}

export default DetailQuiz;