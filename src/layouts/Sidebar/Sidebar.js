import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faBars, faCircleUser, faListUl, faSquarePlus } from '@fortawesome/free-solid-svg-icons'

import { logoutUser } from '../../api/authApi'
import images from '../../assets/images/image'

const cx = classNames.bind(styles)

function Sidebar() {
    const { user, logout } = useContext(AuthContext)

    const handleLogout = async () => {
        await logoutUser()
        logout()
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <div className={cx('navbar-item')}>
                    <Link to="/admin/user" className={cx('navbar-link', 'logo')}>
                        <img src={images.logo} alt="logo" />
                    </Link>
                    <FontAwesomeIcon icon={faBars} className={cx('bars')} />
                </div>
                <div className={cx('navbar-item')}>
                    <FontAwesomeIcon icon={faCircleUser} className={cx('icon')} />
                    <Link to="/admin/user" className={cx('navbar-link')}>
                        {user?.fullName}
                    </Link>
                </div>
                <div className={cx('navbar-item')}>
                    <div className={cx('item')}>User</div>
                    <ul className={cx('dropdown')}>
                        <li>
                            <FontAwesomeIcon icon={faListUl} className={cx('icon')} />
                            <Link to="/admin/user" className={cx('navbar-link')}>
                                List User
                            </Link>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faSquarePlus} className={cx('icon')} />
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
                            <FontAwesomeIcon icon={faListUl} className={cx('icon')} />
                            <Link to="/admin/course" className={cx('navbar-link')}>
                                List Course
                            </Link>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faSquarePlus} className={cx('icon')} />
                            <Link to="/admin/course/add-course" className={cx('navbar-link')}>
                                Add Course
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('navbar-item')}>
                    <div className={cx('item')}>Chapter</div>
                    <ul className={cx('dropdown')}>
                        <li>
                            <FontAwesomeIcon icon={faListUl} className={cx('icon')} />
                            <Link to="/admin/quizze" className={cx('navbar-link')}>
                                List Chapter
                            </Link>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faSquarePlus} className={cx('icon')} />
                            <Link to="/admin/quizze/add-quizze" className={cx('navbar-link')}>
                                Add Chapter
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('navbar-item')}>
                    <div className={cx('item')}>Lesson</div>
                    <ul className={cx('dropdown')}>
                        <li>
                            <FontAwesomeIcon icon={faListUl} className={cx('icon')} />
                            <Link to="/admin/lesson" className={cx('navbar-link')}>
                                List Lesson
                            </Link>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faSquarePlus} className={cx('icon')} />
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
                            <FontAwesomeIcon icon={faListUl} className={cx('icon')} />
                            <Link to="/admin/quizze" className={cx('navbar-link')}>
                                List Quizze
                            </Link>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faSquarePlus} className={cx('icon')} />
                            <Link to="/admin/quizze/add-quizze" className={cx('navbar-link')}>
                                Add Quizze
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('navbar-item')}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className={cx('icon')} />
                    <Link to="/login" className={cx('navbar-link')} onClick={handleLogout}>
                        Đăng xuất
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
