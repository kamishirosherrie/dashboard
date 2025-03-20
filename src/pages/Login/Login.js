import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Login.module.scss'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/authApi'

const cx = classNames.bind(styles)

function Login() {
    const navigate = useNavigate()
    const [user, setUser] = useState({})

    const handleChange = (event) => {
        const { name, value } = event.target
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault()
            console.log('Username: ', user.userName)
            console.log('Password: ', user.passWord)

            await login(user)
            navigate('/admin/user')
        } catch (error) {
            console.log('Login failed: ', error.message)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label htmlFor="userName">Username</label>
                    <input type="text" id="userName" name="userName" onChange={handleChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="passWord">Password</label>
                    <input type="password" id="passWord" name="passWord" onChange={handleChange} required />
                </div>
                <button type="submit" className={cx('btn')}>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
