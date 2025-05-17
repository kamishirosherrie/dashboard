import axiosInstance from './axiosInstance'
import { apiUrl } from './apiConfig'

export const getAllQuizze = async () => {
    try {
        const response = await axiosInstance.get(apiUrl.quizzeUrl.getAllQuizze)
        return response.data
    } catch (error) {
        console.log('Get all quizze failed')
        throw error
    }
}

export const getQuizzeBySlug = async (slug) => {
    try {
        const response = await axiosInstance.get(apiUrl.quizzeUrl.getQuizzeBySlug(slug))
        return response.data.quizze
    } catch (error) {
        console.log('Get quizze by slug failed')
        throw error
    }
}

export const getQuizzeByLessonSlug = async (lessonSlug) => {
    try {
        const response = await axiosInstance.get(apiUrl.quizzeUrl.getQuizzeByLessonSlug(lessonSlug))
        return response.data.quizze
    } catch (error) {
        console.log('Get quizze by lesson slug failed')
        throw error
    }
}

export const addNewQuizze = async (quizze) => {
    try {
        const response = await axiosInstance.post(apiUrl.quizzeUrl.addNewQuizze, quizze)
        return response.data
    } catch (error) {
        console.log('Add new quizze failed')
        throw error
    }
}

export const deleteQuizze = async (id) => {
    try {
        const response = await axiosInstance.delete(apiUrl.quizzeUrl.deleteQuizze(id))
        return response.data
    } catch (error) {
        console.log('Delete quizze failed')
        throw error
    }
}

export const updateQuizze = async (id, quizze) => {
    try {
        const response = await axiosInstance.put(apiUrl.quizzeUrl.updateChapter(id), quizze)
        return response.data
    } catch (error) {
        console.log('Update quizze failed')
        throw error
    }
}
