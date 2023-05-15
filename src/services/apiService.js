import axios from '../utils/axiosCustomize';

const postCreateNewUser = (email, password, username, role, image) => {
    //Submit data
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.post('api/v1/participant', data);
}

const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}

const putUpdateUser = (id, username, role, image) => {
    //Submit data
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.put('api/v1/participant', data);
}

const deleteUser = (id) => {
    return axios.delete('api/v1/participant', {data: {id}});
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = (email, password) => {
    return axios.post('api/v1/login', {email, password});
}

const postSignUp = (email, password, username) => {
    return axios.post('api/v1/register', {email, password, username});
}

const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant');
}

const getDataQuiz = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
}

const postSubmitQuiz = (data) => {
    return axios.post(`api/v1/quiz-submit`, {...data});
}

const postCreateNewQuiz = (description, name, difficulty, image) => {
    //Submit data
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);

    return axios.post(`api/v1/quiz`, data);
}

const getAllQuizForAdmin = () => {
    return axios.get(`api/v1/quiz/all`);
}

const deleteQuiz = (id) => {
    return axios.delete(`api/v1/quiz/${id}`);
}

const putUpdateQuizForAdmin = (id, description, name, difficulty, image) => {
    //Submit data
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);

    return axios.put(`api/v1/quiz`, data);
}

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
    //Submit data
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', questionImage);

    return axios.post(`api/v1/question`, data);
}

const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    //Submit data
    return axios.post(`api/v1/answer`, {
        description, correct_answer, question_id
    });
}

export {
    postCreateNewUser, 
    getAllUsers, 
    putUpdateUser, 
    deleteUser, 
    getUserWithPaginate, 
    postLogin, 
    postSignUp, 
    getQuizByUser, 
    getDataQuiz, 
    postSubmitQuiz,
    postCreateNewQuiz,
    getAllQuizForAdmin,
    deleteQuiz,
    putUpdateQuizForAdmin,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion
}