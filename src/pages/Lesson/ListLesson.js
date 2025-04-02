import className from 'classnames/bind'
import styles from './ListLesson.module.scss'
import { useEffect, useState } from 'react'
import { getAllLesson } from '../../api/lessonApi'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import Table from '../../components/Table/Table'
import ModalDelete from '../../components/ModalDelete/ModalDelete'
import { Link } from 'react-router-dom'

const cx = className.bind(styles)

function ListLesson() {
    const [lessons, setLessons] = useState([])
    const [lessonId, setLessonId] = useState({})
    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = (lessonId) => {
        setIsOpen(true)
        setLessonId(lessonId)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    const handleDeleteLesson = async (lessonId) => {
        console.log(
            'Delete lesson: ',
            lessons.filter((lesson) => lesson._id !== lessonId),
        )
    }

    useEffect(() => {
        const getLesson = async () => {
            try {
                const response = await getAllLesson()
                setLessons(response.lessons)
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
                {lessons.length === 0 ? (
                    <div className={cx('no-data')}>You haven't added any lessons yet.</div>
                ) : (
                    <Table headings={['Order', 'Lesson', 'Chapter', 'Course', '']}>
                        {lessons.map((lesson, index) => (
                            <tr key={index}>
                                <td>{lesson.order}</td>
                                <td>{lesson.title}</td>
                                <td>
                                    {lesson.chapterId?.order} - {lesson.chapterId?.title}
                                </td>
                                <td>{lesson.chapterId?.courseId.title}</td>
                                <td>
                                    <button>
                                        <Link to={`/admin/lesson/update-lesson/${lesson.slug}`}>Edit</Link>
                                    </button>
                                    <button onClick={() => handleDelete(lesson._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                )}
            </MainAccount>
            <ModalDelete isOpen={isOpen} handleCancel={handleCancel} handleDelete={() => handleDeleteLesson(lessonId)} />
        </div>
    )
}

export default ListLesson
