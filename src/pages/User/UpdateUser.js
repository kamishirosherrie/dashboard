import classNames from 'classnames/bind'
import styles from './UpdateUser.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllUsers, getUserByUserName, updateUser } from '../../api/userApi'

const cx = classNames.bind(styles)

function UpdateUser() {
    const navigate = useNavigate()
    const { userName } = useParams()
    const [user, setUser] = useState({})

    const handleChange = (event) => {
        const { name, value } = event.target
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleChangeStatus = (event) => {
        const { name, value } = event.target
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        try {
            const response = await getAllUsers()
            const users = response.users
            const isEmailExist = users.filter((u) => u.userName !== user.userName).some((u) => u.email === user.email)
            const isPhoneNumberExist = users.filter((u) => u.userName !== user.userName).some((u) => u.phoneNumber === user.phoneNumber)

            if (isEmailExist) {
                alert('Email already exists')
                return
            }
            if (isPhoneNumberExist) {
                alert('Phone number already exists')
                return
            }
            await updateUser(user)
            alert('Update user successfully')
            navigate('/admin/user')
        } catch (error) {
            console.log('Update user failed: ', error)
        }
    }

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await getUserByUserName(userName)
                console.log('User info: ', response.user)
                setUser(response.user)
            } catch (error) {
                console.log('Get user info failed: ', error)
            }
        }

        getUserInfo()
    }, [userName])

    return (
        <div className={cx('wrapper')}>
            <MainAccount>
                <h2>Update User</h2>
                <div className={cx('container')}>
                    <div className={cx('create-user')}>
                        <div className={cx('content')}>
                            <div className={cx('info-group')}>
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text" name="fullName" value={user.fullName} onChange={handleChange} className={cx('input')} required />
                            </div>
                            <div className={cx('info-group')}>
                                <label htmlFor="userName">Username</label>
                                <input type="text" name="userName" value={user.userName} className={cx('input')} readOnly />
                            </div>
                            <div className={cx('info-group')}>
                                <label htmlFor="passWord">Password</label>
                                <input
                                    type="password"
                                    name="passWord"
                                    value={user.passWord}
                                    onChange={handleChange}
                                    className={cx('input')}
                                    required
                                />
                            </div>
                            <div className={cx('info-group')}>
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" value={user.email} onChange={handleChange} className={cx('input')} required />
                            </div>
                            <div className={cx('info-group')}>
                                <label htmlFor="phoneNumer">Phone number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={user.phoneNumber}
                                    onChange={handleChange}
                                    className={cx('input')}
                                    required
                                />
                            </div>
                            <div className={cx('info-group')}>
                                <label htmlFor="isDisabled">Active</label>
                                <select name="isDisabled" value={user.isDisabled} onChange={handleChangeStatus} className={cx('input')} required>
                                    <option value="false">Yes</option>
                                    <option value="true">No</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" className={cx('submit')} onClick={handleSubmit}>
                            Save
                        </button>
                    </div>
                </div>
            </MainAccount>
        </div>
    )
}

export default UpdateUser
