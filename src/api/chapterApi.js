import { apiUrl } from './apiConfig'
import axiosInstance from './axiosInstance'

export const getChapters = async () => {
    try {
        const response = await axiosInstance.get(apiUrl.chapterUrl.getChapters)
        return response.data
    } catch (error) {
        console.log('Get all chapters failed: ', error)
        throw error
    }
}

export const getChapterById = async (id) => {
    try {
        const response = await axiosInstance.get(apiUrl.chapterUrl.getChapterById(id))
        return response.data
    } catch (error) {
        console.log('Get chapter by id failed: ', error)
        throw error
    }
}

export const addNewChapter = async (chapter) => {
    try {
        const response = await axiosInstance.post(apiUrl.chapterUrl.addNewChapter, chapter)
        return response.data
    } catch (error) {
        console.log('Add new chapter failed: ', error)
        throw error
    }
}

export const updateChapter = async (chapter) => {
    try {
        const response = await axiosInstance.put(apiUrl.chapterUrl.updateChapter, chapter)
        return response.data
    } catch (error) {
        console.log('Update chapter failed: ', error)
        throw error
    }
}

export const deleteChapter = async (id) => {
    try {
        const response = await axiosInstance.delete(apiUrl.chapterUrl.deleteChapter(id))
        return response.data
    } catch (error) {
        console.log('Delete chapter failed: ', error)
        throw error
    }
}
