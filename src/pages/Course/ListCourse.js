import classNames from 'classnames/bind'
import styles from './ListCourse.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import Table from '../../components/Table/Table'
import { useEffect, useState } from 'react'
import { getCourse } from '../../api/courseApi'

const cx = classNames.bind(styles)

function ListCourse() {
    const [courses, setCourses] = useState([])

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
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </Table>
            </div>
        </MainAccount>
    )
}

export default ListCourse
