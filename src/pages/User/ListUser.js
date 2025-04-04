import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './ListUser.module.scss'

import MainAccount from '../../layouts/MainAccount/MainAccount'
import Table from '../../components/Table/Table'
import { deleteUser, getAllUsers } from '../../api/userApi'
import ModalDelete from '../../components/ModalDelete/ModalDelete'
import Button from '../../components/Button/Button'
import { routes } from '../../routes/route'

const cx = classNames.bind(styles)

function ListUser() {
    const [users, setUsers] = useState([])
    const [userName, setUserName] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = (userName) => {
        setIsOpen(true)
        setUserName(userName)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    const handleDeleteUser = async (userName) => {
        try {
            const response = await deleteUser(userName)
            console.log('Delete user: ', response)
            setUsers(users.map((user) => (user.userName === userName ? { ...user, isDisabled: true } : user)))
            setIsOpen(false)
        } catch (error) {
            console.log('Delete user failed: ', error)
        }
    }

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await getAllUsers()
                setUsers(response.users)
            } catch (error) {
                console.log('Get users failed: ', error)
            }
        }

        getUsers()
    }, [])
    return (
        <MainAccount>
            <div className={cx('wrapper')}>
                <h1>Users</h1>
                <Table headings={['Index', 'User', 'Email', 'Role', 'Active']}>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.roleId.roleName}</td>
                            {user.isDisabled ? <td className={cx('disable')}>No</td> : <td className={cx('enable')}>Yes</td>}
                            <td>
                                <Button href={`${routes.updateUser}/${user.userName}`} editBtn>
                                    Edit
                                </Button>
                                <Button onClick={() => handleDelete(user.userName)} deleteBtn>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </Table>
            </div>
            <ModalDelete isOpen={isOpen} handleCancel={handleCancel} handleDelete={() => handleDeleteUser(userName)} />
        </MainAccount>
    )
}

export default ListUser
