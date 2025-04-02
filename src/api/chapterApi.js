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
