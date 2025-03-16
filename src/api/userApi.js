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

export const addNewUser = async (user) => {
    try {
        const response = await axios.post(apiUrl.userUrl.addUser, user)
        return response.data
    } catch (error) {
        console.log('Add new user failed')
        throw error
    }
}
