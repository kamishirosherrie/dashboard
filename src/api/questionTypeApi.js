import axios from 'axios'
import { apiUrl } from './apiConfig'

export const getQuestionType = async () => {
    try {
        const response = await axios.get(apiUrl.questionTypeUrl.getQuestionType)
        return response.data
    } catch (error) {
        console.log('Get question type failed')
        throw error
    }
}
