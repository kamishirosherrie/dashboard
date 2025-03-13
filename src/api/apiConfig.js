const API_BASE_URL = "http://localhost:8017";

const apiUrl = {
  courseUrl: {
    getCourseBySlug: (slug) => `${API_BASE_URL}/course/slug/${slug}`,
  },
  lessonUrl: {
    addNewLesson: `${API_BASE_URL}/lesson/addNewLesson`,
    getAllLesson: `${API_BASE_URL}/lesson/`,
  },
  quizzeUrl: {
    getQuizzeBySlug: (quizzeSlug) =>
      `${API_BASE_URL}/quizze/getQuizzeBySlug/${quizzeSlug}`,
    getQuizzeByLessonSlug: (lessonSlug) =>
      `${API_BASE_URL}/quizze/getQuizzeByLessonSlug/${lessonSlug}`,
  },
  questionUrl: {
    getQuestionByQuizzeSlug: (quizzeSlug) =>
      `${API_BASE_URL}/question/getQuestionByQuizzeSlug/${quizzeSlug}`,
  },
  dictionaryUrl: {
    getWord: (word) =>
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
  },
};

export { API_BASE_URL, apiUrl };
