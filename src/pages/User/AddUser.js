import classNames from 'classnames/bind'
import styles from './AddUser.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useEffect, useState } from 'react'
import { getRoles } from '../../api/roleApi'
import { addNewUser } from '../../api/userApi'

const cx = classNames.bind(styles)

function AddUser() {
    const [formData, setFormData] = useState({
        fullName: '',
        userName: '',
        email: '',
        phoneNumber: '',
        passWord: '',
        roleId: '',
        isDisabled: false,
    })
    const [roles, setRoles] = useState([])

    const handleSubmit = async () => {
        console.log(formData)
        const response = await addNewUser(formData)
        console.log('User submitted: ', response.user)
        console.log('Message: ', response.message)
    }

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    useEffect(() => {
        const getAllRoles = async () => {
            try {
                const response = await getRoles()
                setRoles(response.roles)
            } catch (error) {
                console.log('Get roles failed: ', error)
            }
        }

        getAllRoles()
    }, [])

    return (
        <MainAccount>
            <div className={cx('wrapper')}>
                <h1>Add User</h1>
                <div className={cx('container')}>
                    <div className={cx('create-user')}>
                        <div className={cx('content')}>
                            <div className={cx('info-group')}>
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text" name="fullName" onChange={handleChange} className={cx('input')} required />
                            </div>
                            <div className={cx('info-group')}>
                                <label htmlFor="userName">Username</label>
                                <input type="text" name="userName" onChange={handleChange} className={cx('input')} required />
                            </div>
                            <div className={cx('info-group')}>
                                <label htmlFor="passWord">Password</label>
                                <input type="password" name="passWord" onChange={handleChange} className={cx('input')} required />
                            </div>
                            <div className={cx('info-group')}>
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" onChange={handleChange} className={cx('input')} required />
                            </div>
                            <div className={cx('info-group')}>
                                <label htmlFor="phoneNumer">Phone number</label>
                                <input type="text" name="phoneNumber" onChange={handleChange} className={cx('input')} required />
                            </div>
                            <div className={cx('info-group')}>
                                <label htmlFor="roleId">Role</label>
                                <select name="roleId" id="roleId" onChange={handleChange}>
                                    <option value="">--Chọn vai trò--</option>
                                    {roles.map((role, index) => (
                                        <option value={role._id} key={index}>
                                            {role.roleName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button type="submit" className={cx('submit')} onClick={handleSubmit}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </MainAccount>
    )
}

export default AddUser
