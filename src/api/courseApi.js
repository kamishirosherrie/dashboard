import axios from 'axios'
import { apiUrl } from './apiConfig'

export const getCourse = async () => {
    try {
        const response = await axios.get(apiUrl.courseUrl.getCourse)
        return response.data
    } catch (error) {
        console.log('Get course failed: ', error)
        throw error
    }
}

export const getCourseBySlug = async (slug) => {
    try {
        const response = await axios.get(apiUrl.courseUrl.getCourseBySlug(slug))
        return response.data.course
    } catch (error) {
        console.log('Get course by slug failed: ', error)
        throw error
    }
}

export const addNewCourse = async (course) => {
    try {
        const response = await axios.post(apiUrl.courseUrl.addNewCourse, course)
        return response.data
    } catch (error) {
        console.log('Add new course failed: ', error)
        throw error
    }
}

export const updateCourse = async (course) => {
    try {
        const response = await axios.put(apiUrl.courseUrl.updateCourse, course)
        return response.data
    } catch (error) {
        console.log('Update course failed: ', error)
        throw error
    }
}

export const deleteCourse = async (id) => {
    try {
        const response = await axios.delete(apiUrl.courseUrl.deleteCourse(id))
        return response.data
    } catch (error) {
        console.log('Delete course failed: ', error)
        throw error
    }
}
