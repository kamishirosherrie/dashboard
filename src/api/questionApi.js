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
