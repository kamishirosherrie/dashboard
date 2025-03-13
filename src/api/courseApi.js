import axios from 'axios'
import { apiUrl } from './apiConfig'

export const getCourseBySlug = async (slug) => {
    try {
        const response = await axios.get(apiUrl.courseUrl.getCourseBySlug(slug))
        return response.data.course
    } catch (error) {
        console.log('Get course by slug failed')
        throw error
    }
}
