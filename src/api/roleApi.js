import axios from 'axios'
import { apiUrl } from './apiConfig'

export const getRoles = async () => {
    try {
        const response = await axios.get(apiUrl.roleUrl.getRole)
        return response.data
    } catch (error) {
        console.log('Get all roles failed: ', error)
        throw error
    }
}
