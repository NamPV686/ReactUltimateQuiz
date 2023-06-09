import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import './ListQuiz.scss';
import { useNavigate } from "react-router";

const ListQuiz = () => {
    const [ arrQuiz, setArrQuiz] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getQuizData();
    }, []);

    const getQuizData = async() => {
        let res = await getQuizByUser();
        setArrQuiz(res.DT);
    }

    return (
        <div className="list-quiz-container container">
            {
                 arrQuiz && arrQuiz.length > 0 &&
                 arrQuiz.map((quiz, index) => {
                    return (
                        <div className="card" style={{width: "18rem"}} key={`quiz-${index}`}>
                            <img src={`data:image/jpeg;base64,${quiz.image}`} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <div className="card-content">
                                    <h5 className="card-title">Quiz {index + 1}</h5>
                                    <p className="card-text">{quiz.description}</p>
                                </div>
                                <button href="#" className="btn btn-primary"
                                    onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description} })}
                                >
                                    Start now
                                </button>
                            </div>
                        </div>
                    );
                 })
            }

            {
                 arrQuiz && arrQuiz.length === 0 &&
                 <div>
                    You don't have any quiz now...
                 </div>
            }
        </div>
    );
}

export default ListQuiz;