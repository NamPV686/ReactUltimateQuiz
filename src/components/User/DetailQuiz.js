import { useEffect } from "react";
import { useParams } from "react-router";
import { getDataQuiz } from '../../services/apiService';
import _ from "lodash";

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;

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

                console.log('value: ', value);
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
        <div>
            DetailQuiz
        </div>
    );
}

export default DetailQuiz;