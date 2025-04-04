import classNames from 'classnames/bind'
import styles from './ListCourse.module.scss'
import { useEffect, useState } from 'react'

import MainAccount from '../../layouts/MainAccount/MainAccount'
import Table from '../../components/Table/Table'
import { deleteCourse, getCourse } from '../../api/courseApi'
import ModalDelete from '../../components/ModalDelete/ModalDelete'
import Button from '../../components/Button/Button'
import { routes } from '../../routes/route'

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
                <h1>Courses</h1>
                {courses.length === 0 ? (
                    <div className={cx('no-data')}>You haven't added any courses yet.</div>
                ) : (
                    <Table headings={['Index', 'Course', 'Description']}>
                        {courses.map((course, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{course.title}</td>
                                <td>{course.description}</td>
                                <td>
                                    <Button editBtn href={`${routes.updateCourse}/${course.slug}`}>
                                        Edit
                                    </Button>

                                    <Button deleteBtn onClick={() => handleDelete(course._id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                )}
            </div>
            <ModalDelete isOpen={isOpen} handleCancel={handleCancel} handleDelete={() => handleDeleteCourse(courseId)} />
        </MainAccount>
    )
}

export default ListCourse
