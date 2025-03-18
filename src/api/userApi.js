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

export const getUserByUserName = async (userName) => {
    try {
        const response = await axios.get(apiUrl.userUrl.getUserInfo(userName))
        return response.data
    } catch (error) {
        console.log('Get user info failed: ', error)
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

export const updateUser = async (user) => {
    try {
        const response = await axios.put(apiUrl.userUrl.updateUser, user)
        return response.data
    } catch (error) {
        console.log('Update user failed: ', error)
        throw error
    }
}

export const deleteUser = async (userName) => {
    try {
        const response = await axios.put(apiUrl.userUrl.deleteUser(userName))
        return response.data
    } catch (error) {
        console.log('Delete user failed: ', error)
        throw error
    }
}
