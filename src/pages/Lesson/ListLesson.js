import className from 'classnames/bind'
import styles from './ListLesson.module.scss'
import { useEffect, useState } from 'react'
import { getAllLesson } from '../../api/lessonApi'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import Table from '../../components/Table/Table'

const cx = className.bind(styles)

function ListLesson() {
    const [lessons, setLessons] = useState([])

    useEffect(() => {
        const getLesson = async () => {
            try {
                const response = await getAllLesson()
                setLessons(response.data.lessons)
            } catch (error) {
                console.log('Get all lesson failed: ', error)
            }
        }

        getLesson()
    }, [])
    return (
        <div className={cx('wrapper')}>
            <MainAccount>
                <h1>List Lessons</h1>
                <Table headings={['Index', 'Lesson', 'Course', '']}>
                    {lessons.map((lesson, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{lesson.title}</td>
                            <td>{lesson.courseId.title}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </Table>
            </MainAccount>
        </div>
    )
}

export default ListLesson
