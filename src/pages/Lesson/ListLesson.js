import className from 'classnames/bind'
import styles from './ListLesson.module.scss'
import { useEffect, useState } from 'react'
import { deleteLesson, getAllLesson } from '../../api/lessonApi'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import Table from '../../components/Table/Table'
import ModalDelete from '../../components/ModalDelete/ModalDelete'
import Button from '../../components/Button/Button'
import { routes } from '../../routes/route'

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
        try {
            const response = await deleteLesson(lessonId)
            console.log('Delete lesson: ', response)
            setLessons(lessons.filter((lesson) => lesson._id !== lessonId))
            setIsOpen(false)
        } catch (error) {
            console.log('Delete lesson failed: ', error)
        }
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
                <h1>Lessons</h1>
                {lessons.length === 0 ? (
                    <div className={cx('no-data')}>You haven't added any lessons yet.</div>
                ) : (
                    <Table headings={['Order', 'Lesson', 'Chapter', 'Course']}>
                        {lessons.map((lesson, index) => (
                            <tr key={index}>
                                <td>{lesson.order}</td>
                                <td>{lesson.title}</td>
                                <td>
                                    {lesson.chapterId?.order} - {lesson.chapterId?.title}
                                </td>
                                <td>{lesson.chapterId?.courseId.title}</td>
                                <td>
                                    <Button href={`${routes.updateLesson}/${lesson.slug}`} editBtn>
                                        Edit
                                    </Button>
                                    <Button onClick={() => handleDelete(lesson._id)} deleteBtn>
                                        Delete
                                    </Button>
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
