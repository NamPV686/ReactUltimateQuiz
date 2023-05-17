import '../DetailQuiz.scss';
import CountDown from './CountDown';

const RightContent = (props) => {
    const { dataQuiz, handleFinish } = props;

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
                            <div key={index} className='question'>{index + 1}</div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default RightContent;