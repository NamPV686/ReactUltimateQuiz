
const TableQuiz = (props) => {
    const {listQuiz, handleClickBtnDelete, handleClickBtnUpdate, handleClickBtnView} = props;

    return (
        <div className="table-container">
            <div><h4>List Quiz</h4></div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Difficulty</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       listQuiz && listQuiz.length > 0 &&
                       listQuiz.map((quiz, index) => {
                            return(
                                <tr key={`table-quiz${index}`}>
                                    <td>{quiz.id}</td>
                                    <td>{quiz.name}</td>
                                    <td>{quiz.description}</td>
                                    <td>{quiz.difficulty}</td>
                                    <td>
                                    <button className="btn btn-info"
                                            onClick={() => handleClickBtnView(quiz)}
                                        >
                                            View
                                        </button>
                                        <button 
                                            className="btn btn-warning mx-2"
                                            onClick={() => handleClickBtnUpdate(quiz)}
                                        >
                                            Update
                                        </button>
                                        <button className="btn btn-danger"
                                            onClick={() => handleClickBtnDelete(quiz)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                       }) 
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableQuiz;