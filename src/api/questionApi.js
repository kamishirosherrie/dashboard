import axios from 'axios'
import { apiUrl } from './apiConfig'

export const getQuestionByQuizzeSlug = async (slug) => {
    try {
        const response = await axios.get(apiUrl.questionUrl.getQuestionByQuizzeSlug(slug))
        return response.data.questions
    } catch (error) {
        console.log('Get question by quizze slug failed')
        throw error
    }
}

export const addNewQuestion = async (question) => {
    try {
        const response = await axios.post(apiUrl.questionUrl.addNewQuestion, question)
        return response.data
    } catch (error) {
        console.log('Add new question failed')
        throw error
    }
}
