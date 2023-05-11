import { useState } from 'react';
import './ManageQuiz.scss';
import Select from 'react-select';

const ManageQuiz = () => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
      ];

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [type, setType] = useState("EASY");
    const [image, setImage] = useState(null);

    const handleUploadFile = () => {

    }

    return (
        <div className="quiz-container">
            <div className="title">
                Manage Quizzes
            </div>
            <hr />
            <div className="add-new">
                <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3">Add New Quiz</legend>
                    <div class="form-floating mb-3">
                        <input 
                            type="text" 
                            class="form-control" 
                            placeholder="Name" 
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <label for="floatingInput">Name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input 
                            type="text" 
                            class="form-control" 
                            placeholder="Description" 
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                        <label>Description</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input 
                            type="text" 
                            class="form-control" 
                            placeholder="Difficulty" 
                            value={difficulty}
                            onChange={(event) => setDifficulty(event.target.value)}
                        />
                        <label>Difficulty</label>
                    </div>
                    <div className='mt-3'>
                        <Select
                            // value={selectedOption}
                            // onChange={this.handleChange}
                            options={options}
                            placeholder={"Quiz type..."}
                        />
                    </div>
                    <div class="more-actions mt-3">
                        <label>Upload Image</label>
                        <input 
                            type="file" 
                            class="form-control mt-2"
                            value={image}
                            onChange={(event) => handleUploadFile(event.target.value)}
                         />
                    </div>
                </fieldset>
            </div>
            <div className="list-detail">
                Table
            </div>
        </div>
    )
}

export default ManageQuiz;