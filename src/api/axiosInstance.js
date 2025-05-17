import axios from 'axios'
import { env } from '../config/environment'
import { routes } from '../routes/route'
import { apiUrl } from './apiConfig'

const axiosInstance = axios.create({
    baseURL: env.backEndUrl,
    withCredentials: true,
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (err) => Promise.reject(err),
)

axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config

        if (err.response?.status === 403 && err.response?.data?.message === 'jwt expired' && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const res = await axiosInstance.post(apiUrl.authUrl.refreshToken)
                const newToken = res.data.accessToken
                localStorage.setItem('accessToken', newToken)

                originalRequest.headers['Authorization'] = `Bearer ${newToken}`
                return axiosInstance(originalRequest)
            } catch (refreshErr) {
                localStorage.clear()
                window.location.href = routes.home
                return Promise.resolve()
            }
        }
        return Promise.reject(err)
    },
)

export default axiosInstance
