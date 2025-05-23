import { updateChapter } from './chapterApi'

const apiUrl = {
    authUrl: {
        login: `/auth/login`,
        register: `/auth/register`,
        logout: `/auth/logout`,
    },
    roleUrl: {
        getRole: `/role`,
    },
    userUrl: {
        getUser: `/user`,
        getUserInfo: (userName) => `/user/getUserInfo/${userName}`,
        addUser: `/user/addUser`,
        updateUser: `/user/updateUserInfo`,
        deleteUser: (userName) => `/user/deleteUser/${userName}`,
    },
    courseUrl: {
        getCourse: `/course`,
        getCourseBySlug: (slug) => `/course/slug/${slug}`,
        addNewCourse: `/course/addCourse`,
        updateCourse: `/course/updateCourse`,
        deleteCourse: (id) => `/course/deleteCourse/${id}`,
    },
    chapterUrl: {
        getChapters: `/chapter`,
        getChapterById: (id) => `/chapter/${id}`,
        addNewChapter: `/chapter/addNewChapter`,
        updateChapter: `/chapter/updateChapter`,
        deleteChapter: (id) => `/chapter/deleteChapter/${id}`,
    },
    lessonUrl: {
        addNewLesson: `/lesson/addNewLesson`,
        getAllLesson: `/lesson/`,
        getLessonBySlug: (slug) => `/lesson/slug/${slug}`,
        getLessonById: (id) => `/lesson/id/${id}`,
        updateLesson: `/lesson/updateLesson`,
        deleteLesson: (id) => `/lesson/deleteLesson/${id}`,
    },
    quizzeUrl: {
        addNewQuizze: `/quizze/addNewQuizze`,
        getAllQuizze: `/quizze/`,
        getQuizzeBySlug: (quizzeSlug) => `/quizze/getQuizzeBySlug/${quizzeSlug}`,
        getQuizzeByLessonSlug: (lessonSlug) => `/quizze/getQuizzeByLessonSlug/${lessonSlug}`,
        deleteQuizze: (id) => `/quizze/deleteQuizze/${id}`,
        updateChapter: (id) => `/quizze/updateQuizze/${id}`,
    },
    questionUrl: {
        getQuestionByQuizzeSlug: (quizzeSlug) => `/question/slug/${quizzeSlug}`,
        addNewQuestion: `/question/addNewQuestion`,
    },
    questionTypeUrl: {
        getQuestionType: `/questionType/`,
    },
    dictionaryUrl: {
        getWord: (word) => `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    },
}

export { apiUrl }
