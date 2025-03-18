const API_BASE_URL = 'http://localhost:8017'

const apiUrl = {
    roleUrl: {
        getRole: `${API_BASE_URL}/role`,
    },
    userUrl: {
        getUser: `${API_BASE_URL}/user`,
        addUser: `${API_BASE_URL}/user/addUser`,
        getUserInfo: (userName) => `${API_BASE_URL}/user/getUserInfo/${userName}`,
    },
    courseUrl: {
        getCourse: `${API_BASE_URL}/course`,
        getCourseBySlug: (slug) => `${API_BASE_URL}/course/slug/${slug}`,
        addNewCourse: `${API_BASE_URL}/course/addCourse`,
    },
    lessonUrl: {
        addNewLesson: `${API_BASE_URL}/lesson/addNewLesson`,
        getAllLesson: `${API_BASE_URL}/lesson/`,
    },
    quizzeUrl: {
        addNewQuizze: `${API_BASE_URL}/quizze/addNewQuizze`,
        getQuizzesWithQuestions: `${API_BASE_URL}/quizze/getQuizzesWithQuestions`,
        getQuizzeBySlug: (quizzeSlug) => `${API_BASE_URL}/quizze/getQuizzeBySlug/${quizzeSlug}`,
        getQuizzeByLessonSlug: (lessonSlug) => `${API_BASE_URL}/quizze/getQuizzeByLessonSlug/${lessonSlug}`,
    },
    questionUrl: {
        getQuestionByQuizzeSlug: (quizzeSlug) => `${API_BASE_URL}/question/getQuestionByQuizzeSlug/${quizzeSlug}`,
        addNewQuestion: `${API_BASE_URL}/question/addNewQuestion`,
    },
    questionTypeUrl: {
        getQuestionType: `${API_BASE_URL}/questionType/`,
    },
    dictionaryUrl: {
        getWord: (word) => `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    },
}

export { API_BASE_URL, apiUrl }
