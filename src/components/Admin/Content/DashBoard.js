import { useState } from 'react';
import './DashBoard.scss';
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer} from 'recharts';
import { useEffect } from 'react';
import { getOverView } from '../../../services/apiService';

const DashBoard = (props) => {
    const [ dataOverView, setDataOverView ] = useState([]);
    const [ dataChart, setDataChart ] = useState([]);

    useEffect(() => {
        fetchDataOverView();
    }, [])

    const fetchDataOverView = async() => {
        let res = await getOverView();

        if(res && res.EC === 0){
            setDataOverView(res.DT);
            
            //process chart data
            let Us = 0, Qz = 0, Qs = 0, As = 0;
            Us = res?.DT?.users?.total ?? 0;
            Qz = res?.DT?.others?.countQuiz ?? 0;
            Qs = res?.DT?.others?.countQuestions ?? 0;
            As = res?.DT?.others?.countAnswers ?? 0;

            const data = [
                { name: "Users", Us: Us },
                { name: "Quizzes", Qz: Qz },
                { name: "Questions", Qs: Qs },
                { name: "Answers", As: As }
            ];

            setDataChart(data);
        }
    }

    console.log(dataOverView)

    return(
        <div className="dashboard-container">
            <div className='title'>
                Analytics DashBoard
            </div>
            <div className='content'>
                <div className='c-left'>
                    <div className='child'>
                        <span className='text-1'>Total users</span>
                        <span className='text-2'>
                           {
                            dataOverView && dataOverView.users && dataOverView.users.total 
                            ?
                            dataOverView.users.total
                            :
                            0
                           }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Quizzes</span>
                        <span className='text-2'>
                            {
                                dataOverView && dataOverView.others && dataOverView.others.countQuiz 
                                ?
                                dataOverView.others.countQuiz
                                :
                                0
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Questions</span>
                        <span className='text-2'>
                            {
                                dataOverView && dataOverView.others && dataOverView.others.countQuestions 
                                ?
                                dataOverView.others.countQuestions
                                :
                                0
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Answers</span>
                        <span className='text-2'>
                            {
                                dataOverView && dataOverView.others && dataOverView.others.countAnswers 
                                ?
                                dataOverView.others.countAnswers
                                :
                                0
                            }
                        </span>
                    </div>
                </div>
                <div className='c-right'>
                    <ResponsiveContainer width="90%" height="95%">
                        <BarChart data={dataChart} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            {/* <YAxis /> */}
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Us" fill="#8884d8" />
                            <Bar dataKey="Qz" fill="#82ca9d" />
                            <Bar dataKey="Qs" fill="#fcb123" />
                            <Bar dataKey="As" fill="#edb879" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default DashBoard;