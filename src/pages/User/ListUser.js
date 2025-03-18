import { useEffect, useState } from 'react'
import { getAllUsers } from '../../api/userApi'
import classNames from 'classnames/bind'
import styles from './ListUser.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import Table from '../../components/Table/Table'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function ListUser() {
    const [users, setUsers] = useState([])

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
                <h1>List User</h1>
                <Table headings={['Index', 'User', 'Email', 'Role', 'Active', '']}>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.roleId.roleName}</td>
                            <td>{user.isDisabled === true ? 'No' : 'Yes'}</td>
                            <td>
                                <button>
                                    <Link to={`/admin/user/updateUser/${user.userName}`}>Edit</Link>
                                </button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </Table>
            </div>
        </MainAccount>
    )
}

export default ListUser
