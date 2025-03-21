import classNames from 'classnames/bind'
import styles from './ListCourse.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import Table from '../../components/Table/Table'
import { useEffect, useState } from 'react'
import { deleteCourse, getCourse } from '../../api/courseApi'
import ModalDelete from '../../components/ModalDelete/ModalDelete'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function ListCourse() {
    const [courses, setCourses] = useState([])
    const [courseId, setCourseId] = useState({})
    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = (courseId) => {
        setIsOpen(true)
        setCourseId(courseId)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    const handleDeleteCourse = async (courseId) => {
        await deleteCourse(courseId)
        setIsOpen(false)
        setCourses(courses.filter((course) => course._id !== courseId))
    }

    useEffect(() => {
        const getAllCourse = async () => {
            try {
                const response = await getCourse()
                setCourses(response.courses)
            } catch (error) {
                console.log('Get course failed: ', error)
            }
        }

        getAllCourse()
    }, [])
    return (
        <MainAccount>
            <div className={cx('wrapper')}>
                <h1>List Course</h1>
                <Table headings={['Index', 'Course', 'Description', '']}>
                    {courses.map((course, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{course.title}</td>
                            <td>{course.description}</td>
                            <td>
                                <button>
                                    <Link to={`/admin/course/update-course/${course.slug}`}>Edit</Link>
                                </button>
                                <button onClick={() => handleDelete(course._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </Table>
            </div>
            <ModalDelete isOpen={isOpen} handleCancel={handleCancel} handleDelete={() => handleDeleteCourse(courseId)} />
        </MainAccount>
    )
}

export default ListCourse
