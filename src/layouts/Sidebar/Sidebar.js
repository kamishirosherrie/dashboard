import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faBars, faCircleUser, faListUl, faSquarePlus } from '@fortawesome/free-solid-svg-icons'

import { logoutUser } from '../../api/authApi'
import images from '../../assets/images/image'
import { routes } from '../../routes/route'

const cx = classNames.bind(styles)

function Sidebar() {
    const { user, logout } = useContext(AuthContext)

    // const [active, setActive] = useState(false)

    // const handleClick = () => {
    //     setActive((prev) => !prev)
    // }

    const handleLogout = async () => {
        await logoutUser()
        logout()
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <div className={cx('navbar-item')}>
                    <Link to={routes.listUser} className={cx('navbar-link', 'logo')}>
                        <img src={images.logo} alt="logo" />
                    </Link>
                    {/* <FontAwesomeIcon icon={faBars} className={cx('bars')} onClick={handleClick} /> */}
                </div>
                <div className={cx('navbar-item')}>
                    <FontAwesomeIcon icon={faCircleUser} className={cx('icon')} />
                    <Link to={routes.listUser} className={cx('navbar-link')}>
                        {user?.fullName}
                    </Link>
                </div>
                <div className={cx('navbar-item')}>
                    <div className={cx('item')}>User</div>
                    <ul className={cx('dropdown')}>
                        <li>
                            <FontAwesomeIcon icon={faListUl} className={cx('icon')} />
                            <Link to={routes.listUser} className={cx('navbar-link')}>
                                List User
                            </Link>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faSquarePlus} className={cx('icon')} />
                            <Link to={routes.addUser} className={cx('navbar-link')}>
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
                            <Link to={routes.listCourse} className={cx('navbar-link')}>
                                List Course
                            </Link>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faSquarePlus} className={cx('icon')} />
                            <Link to={routes.addCourse} className={cx('navbar-link')}>
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
                            <Link to={routes.listChapter} className={cx('navbar-link')}>
                                List Chapter
                            </Link>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faSquarePlus} className={cx('icon')} />
                            <Link to={routes.addChapter} className={cx('navbar-link')}>
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
                            <Link to={routes.listLesson} className={cx('navbar-link')}>
                                List Lesson
                            </Link>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faSquarePlus} className={cx('icon')} />
                            <Link to={routes.addLesson} className={cx('navbar-link')}>
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
                            <Link to={routes.listQuizze} className={cx('navbar-link')}>
                                List Quizze
                            </Link>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faSquarePlus} className={cx('icon')} />
                            <Link to={routes.addQuizze} className={cx('navbar-link')}>
                                Add Quizze
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('navbar-item')}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className={cx('icon')} />
                    <Link to={routes.login} className={cx('navbar-link')} onClick={handleLogout}>
                        Đăng xuất
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
