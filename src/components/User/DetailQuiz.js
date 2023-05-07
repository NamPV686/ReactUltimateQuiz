import { useEffect } from "react";
import { useParams } from "react-router";
import { getDataQuiz } from '../../services/apiService';

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const fetchQuestions = async() => {
        const res = await getDataQuiz(quizId);
        console.log(res);
    }

    return (
        <div>
            DetailQuiz
        </div>
    );
}

export default DetailQuiz;