import React, { useContext, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Login.module.scss'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../api/authApi'
import AuthContext from '../../context/AuthContext'

const cx = classNames.bind(styles)

function Login() {
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const [user, setUser] = useState({})

    const handleChange = (event) => {
        const { name, value } = event.target
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault()
            if (user.identifier && user.passWord) {
                const response = await loginUser(user)
                login({ ...response.user })
                navigate('/admin/user')
            } else {
                alert('Please enter username and password')
            }
        } catch (error) {
            console.log('Login failed: ', error)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label htmlFor="identifier">Username</label>
                    <input type="text" id="identifier" name="identifier" onChange={handleChange} required />
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
