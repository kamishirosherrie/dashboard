import axiosInstance from './axiosInstance'
import { apiUrl } from './apiConfig'

export const getWord = async (word) => {
    try {
        const response = await axiosInstance.get(apiUrl.dictionaryUrl.getWord(word))
        return response
    } catch (error) {
        console.log('Get word failed')
        throw error
    }
}
