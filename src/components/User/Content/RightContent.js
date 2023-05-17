import '../DetailQuiz.scss';
import CountDown from './CountDown';
import { useRef } from 'react';

const RightContent = (props) => {
    const { dataQuiz, handleFinish, setIndex } = props;
    const refDiv = useRef([]);

    const getClassQuestion = (index, question) => {
        if(question && question.answers.length > 0){
            // setIndex(index);
            let isAnswered = question.answers.find(a => a.isSelected === true)

            if(isAnswered){
                return "question selected";
            }
        }
        return "question";
    }

    const handleClickQuestion = (index, question) => {
        setIndex(index);
        if(refDiv.current){
            refDiv.current.forEach(item => {
                if(item && item.className === 'question clicked'){
                    item.className = 'question';
                }
            })
        }

        if(question && question.answers.length > 0){
            let isAnswered = question.answers.find(a => a.isSelected === true)
            if(isAnswered){
                return;
            }
        }

        refDiv.current[index].className = "question clicked";
    }
    
    return(
        <>
            <div className='main-timer'>
                <CountDown handleFinish={handleFinish} />
            </div>
            <div className='main-question'>
                {
                    dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return(
                            <div 
                                key={index} 
                                className={getClassQuestion(index, item)}
                                onClick={() => handleClickQuestion(index, item)}
                                ref={element => refDiv.current[index] = element}
                            >
                                {index + 1}
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default RightContent;