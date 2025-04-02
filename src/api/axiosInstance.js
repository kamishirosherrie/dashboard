import axios from 'axios'
import { env } from '../config/environment'

const axiosInstance = axios.create({
    baseURL: env.backEndUrl,
    withCredentials: true,
})

export default axiosInstance
