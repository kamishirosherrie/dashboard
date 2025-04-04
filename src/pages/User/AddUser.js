import classNames from 'classnames/bind'
import styles from './AddUser.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useEffect, useState } from 'react'
import { getRoles } from '../../api/roleApi'
import { addNewUser, getAllUsers } from '../../api/userApi'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routes/route'
import Button from '../../components/Button/Button'

const cx = classNames.bind(styles)

function AddUser() {
    const navigate = useNavigate()

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
        try {
            const response = await getAllUsers()
            const users = response.users
            const isUserNameExist = users.some((user) => user.userName === formData.userName)
            const isEmailExist = users.some((user) => user.email === formData.email)
            const isPhoneNumberExist = users.some((user) => user.phoneNumber === formData.phoneNumber)

            if (isUserNameExist) {
                alert('Username already exists')
                return
            }
            if (isEmailExist) {
                alert('Email already exists')
                return
            }
            if (isPhoneNumberExist) {
                alert('Phone number already exists')
                return
            }
            if (formData.roleId === '') {
                alert('Please select a role')
                return
            }

            const newUser = await addNewUser(formData)
            alert('Add user successfully')
            navigate(routes.listUser)
            console.log('New user: ', newUser)
        } catch (error) {
            console.log('Add user failed: ', error)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
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
                <h1>Users</h1>
                <div className={cx('container')}>
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
                                <option value="">--- Chọn vai trò ---</option>
                                {roles.map((role, index) => (
                                    <option value={role._id} key={index}>
                                        {role.roleName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <Button type="submit" submit className={cx('submit')} onClick={handleSubmit}>
                        Save
                    </Button>
                </div>
            </div>
        </MainAccount>
    )
}

export default AddUser
