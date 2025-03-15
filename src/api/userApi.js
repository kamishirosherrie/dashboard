import axios from 'axios'
import { apiUrl } from './apiConfig'

export const getAllUsers = async () => {
    try {
        const response = await axios.get(apiUrl.userUrl.getUser)
        return response.data
    } catch (error) {
        console.log('Get all users failed: ', error)
        throw error
    }
}
