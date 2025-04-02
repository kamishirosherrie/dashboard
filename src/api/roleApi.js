import axiosInstance from './axiosInstance'
import { apiUrl } from './apiConfig'

export const getRoles = async () => {
    try {
        const response = await axiosInstance.get(apiUrl.roleUrl.getRole)
        return response.data
    } catch (error) {
        console.log('Get all roles failed: ', error)
        throw error
    }
}
