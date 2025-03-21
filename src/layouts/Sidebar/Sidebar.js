import { UserSecurityIcon } from '../../components/Icons/Icon'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'

import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'

const cx = classNames.bind(styles)

function Sidebar() {
    const { logout } = useContext(AuthContext)
    const handleLogout = () => {
        logout()
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <div className={cx('navbar-item')}>
                    <Link to="#" className={cx('navbar-link')}>
                        Hello Sherrie!
                    </Link>
                </div>
                <div className={cx('navbar-item')}>
                    <div className={cx('item')}>User</div>
                    <ul className={cx('dropdown')}>
                        <li>
                            <UserSecurityIcon className={cx('icon')} width={24} height={24} />
                            <Link to="/admin/user" className={cx('navbar-link')}>
                                List User
                            </Link>
                        </li>
                        <li>
                            <UserSecurityIcon className={cx('icon')} width={24} height={24} />
                            <Link to="/admin/user/add-user" className={cx('navbar-link')}>
                                Add User
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('navbar-item')}>
                    <div className={cx('item')}>Course</div>
                    <ul className={cx('dropdown')}>
                        <li>
                            <UserSecurityIcon className={cx('icon')} width={24} height={24} />
                            <Link to="/admin/course" className={cx('navbar-link')}>
                                List Course
                            </Link>
                        </li>
                        <li>
                            <UserSecurityIcon className={cx('icon')} width={24} height={24} />
                            <Link to="/admin/course/add-course" className={cx('navbar-link')}>
                                Add Course
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('navbar-item')}>
                    <div className={cx('item')}>Lesson</div>
                    <ul className={cx('dropdown')}>
                        <li>
                            <UserSecurityIcon className={cx('icon')} width={24} height={24} />
                            <Link to="/admin/lesson" className={cx('navbar-link')}>
                                List Lesson
                            </Link>
                        </li>
                        <li>
                            <UserSecurityIcon className={cx('icon')} width={24} height={24} />
                            <Link to="/admin/lesson/add-lesson" className={cx('navbar-link')}>
                                Add Lesson
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('navbar-item')}>
                    <div className={cx('item')}>Quizze</div>
                    <ul className={cx('dropdown')}>
                        <li>
                            <UserSecurityIcon className={cx('icon')} width={24} height={24} />
                            <Link to="/admin/quizze" className={cx('navbar-link')}>
                                List Quizze
                            </Link>
                        </li>
                        <li>
                            <UserSecurityIcon className={cx('icon')} width={24} height={24} />
                            <Link to="/admin/quizze/add-quizze" className={cx('navbar-link')}>
                                Add Quizze
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('navbar-item')}>
                    <UserSecurityIcon className={cx('icon')} width={24} height={24} />
                    <Link to="/" className={cx('navbar-link')} onClick={handleLogout}>
                        Đăng xuất
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
