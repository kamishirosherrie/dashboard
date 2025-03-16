import axios from 'axios'
import { apiUrl } from './apiConfig'

export const addNewLesson = async (lesson) => {
    try {
        const response = await axios.post(apiUrl.lessonUrl.addNewLesson, lesson)
        return response.data
    } catch (error) {
        console.log('Add new lesson failed')
        throw error
    }
}

export const getAllLesson = async () => {
    try {
        const response = await axios.get(apiUrl.lessonUrl.getAllLesson)
        return response
    } catch (error) {
        console.log('Get all lesson failed')
        throw error
    }
}
