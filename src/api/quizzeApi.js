import axios from 'axios'
import { apiUrl } from './apiConfig'

export const getQuizzesWithQuestions = async () => {
    try {
        const response = await axios.get(apiUrl.quizzeUrl.getQuizzesWithQuestions)
        return response.data
    } catch (error) {
        console.log('Get all quizze failed')
        throw error
    }
}

export const getQuizzeBySlug = async (slug) => {
    try {
        const response = await axios.get(apiUrl.quizzeUrl.getQuizzeBySlug(slug))
        return response.data.quizze
    } catch (error) {
        console.log('Get quizze by slug failed')
        throw error
    }
}

export const getQuizzeByLessonSlug = async (lessonSlug) => {
    try {
        const response = await axios.get(apiUrl.quizzeUrl.getQuizzeByLessonSlug(lessonSlug))
        return response.data.quizze
    } catch (error) {
        console.log('Get quizze by lesson slug failed')
        throw error
    }
}

export const addNewQuizze = async (quizze) => {
    try {
        const response = await axios.post(apiUrl.quizzeUrl.addNewQuizze, quizze)
        return response.data
    } catch (error) {
        console.log('Add new quizze failed')
        throw error
    }
}
