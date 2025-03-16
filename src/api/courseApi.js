import axios from 'axios'
import { apiUrl } from './apiConfig'

export const getCourse = async () => {
    try {
        const response = await axios.get(apiUrl.courseUrl.getCourse)
        return response.data
    } catch (error) {
        console.log('Get course failed')
        throw error
    }
}

export const getCourseBySlug = async (slug) => {
    try {
        const response = await axios.get(apiUrl.courseUrl.getCourseBySlug(slug))
        return response.data.course
    } catch (error) {
        console.log('Get course by slug failed')
        throw error
    }
}

export const addNewCourse = async (course) => {
    try {
        const response = await axios.post(apiUrl.courseUrl.addNewCourse, course)
        return response.data
    } catch (error) {
        console.log('Add new course failed')
        throw error
    }
}
