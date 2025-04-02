import { apiUrl } from './apiConfig'
import axiosInstance from './axiosInstance'

export const loginUser = async (user) => {
    try {
        const response = await axiosInstance.post(apiUrl.authUrl.login, user)
        return response.data
    } catch (error) {
        console.log('Login failed: ', error.response.data.message)
        throw error
    }
}

export const logoutUser = async () => {
    try {
        const response = await axiosInstance.post(apiUrl.authUrl.logout)
        return response.data
    } catch (error) {
        console.log('Logout failed: ', error.response.data.message)
        throw error
    }
}
