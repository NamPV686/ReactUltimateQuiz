import Select from "react-select";
import { useState, useEffect } from "react";
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";

const AssignQuiz = () => {
    const [ listQuiz, setListQuiz ] = useState([]);
    const [ selectedQuiz, setSelectedQuiz ] = useState();

    const [ listUser, setListUser ] = useState([]);
    const [ selectedUser, setSelectedUser ] = useState();

    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, []);

    const fetchQuiz = async() => {
        let res = await getAllQuizForAdmin();
        if(res && res.EC === 0){
            let quizzes = res.DT.map(item => {
                return({
                    value: item.id,
                    label: `${item.id}-${item.name}`
                })
            })
            setListQuiz(quizzes);
        }
    }

    const fetchUser = async() => {
        let res = await getAllUsers();
        if(res && res.EC === 0){
            let users = res.DT.map(item => {
                return({
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                })
            })
            setListUser(users);
        }
    }

    const handleSubmitAssignQuiz = async() => {
        if(selectedQuiz && selectedUser){
            let res = await postAssignQuiz(+selectedQuiz.value, +selectedUser.value);

            if(res.EC === 0){
                toast.success(res.EM);
            }

            if(res.EC !== 0){
                toast.error(res.EM);
            }
        }
    }

    return(
        <div className="assign-quiz-container">
           <div className="row">
            <div className='col-6 from-group mt-1 mb-3'>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                        placeholder={"Question type..."}
                    />
                </div>
                <div className='col-6 from-group mt-1 mb-3'>
                    <Select
                        defaultValue={selectedUser}
                        onChange={setSelectedUser}
                        options={listUser}
                        placeholder={"User choose..."}
                    />
                </div>
           </div>
           <div>
                <button onClick={() => handleSubmitAssignQuiz()} className="btn btn-warning">Assign</button>
           </div>
        </div>
    )
}

export default AssignQuiz;