import classNames from 'classnames/bind'
import styles from './UpdateLesson.module.scss'
import JoditEditor from 'jodit-react'

import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { getLessonBySlug, updateLesson } from '../../api/lessonApi'
import { getCourse } from '../../api/courseApi'
import { getChapters } from '../../api/chapterApi'
import { routes } from '../../routes/route'
import Button from '../../components/Button/Button'
import ImageUploader from '../../components/ImageUploader/ImageUploader'

const cx = classNames.bind(styles)

function UpdateLesson() {
    const navigate = useNavigate()
    const { slug } = useParams()
    const editor = useRef(null)

    const [courses, setCourses] = useState([])
    const [allChapters, setAllChapters] = useState([])

    const [chapters, setChapters] = useState([])
    const [lesson, setLesson] = useState({
        title: '',
        order: '',
        chapterId: '',
        content: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setLesson((prev) => ({ ...prev, [name]: value }))
    }

    const handleChangeCourse = (e) => {
        const { value } = e.target
        const filteredChapters = allChapters.filter((chapter) => chapter.courseId._id === value)
        setChapters(filteredChapters)
        setLesson((prev) => ({
            ...prev,
            chapterId: filteredChapters.length > 0 ? filteredChapters[0]._id : '',
        }))
    }
    const handleChangeChapter = (e) => {
        const { name, value } = e.target
        setLesson({ ...lesson, [name]: value })
    }

    const handleChangeContent = (content) => {
        setLesson((prev) => ({ ...prev, content: content }))
    }

    const handleSubmit = async (e) => {
        try {
            await updateLesson(lesson)
            navigate(routes.listLesson)
            console.log(lesson)
        } catch (error) {
            console.log(error.response.data.message)
            alert('Order already exists')
        }
    }

    useEffect(() => {
        const getLesson = async () => {
            const response = await getLessonBySlug(slug)
            setLesson({ ...response.lesson, content: response.lesson.content || '' })
        }

        const getAllCourses = async () => {
            const response = await getCourse()
            setCourses(response.courses)
        }

        const getAllChapters = async () => {
            const response = await getChapters()
            setAllChapters(response.chapters)
            setChapters(response.chapters)
        }

        getAllCourses()
        getAllChapters()
        getLesson()
    }, [slug])

    return (
        <div className={cx('wrapper')}>
            <MainAccount>
                <h1>Lessons</h1>
                <div className={cx('container')}>
                    <div className={cx('form-group')}>
                        <label htmlFor="courseId">Khóa học</label>
                        <select name="courseId" value={lesson.chapterId.courseId?._id} onChange={handleChangeCourse} required>
                            {courses.map((course) => (
                                <option key={course._id} value={course._id}>
                                    {course.title}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="chapterId">Chương</label>
                        <select name="chapterId" value={lesson.chapterId?._id} onChange={handleChangeChapter} required>
                            {chapters.map((chapter) => (
                                <option key={chapter._id} value={chapter?._id}>
                                    Chương {chapter.order}: {chapter.title}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="order">Bài số</label>
                        <input type="text" name="order" placeholder="Bài số" value={lesson.order} onChange={handleChange} required />

                        <label htmlFor="title">Tiêu đề</label>
                        <input type="text" name="title" placeholder="Tiêu đề" value={lesson.title} onChange={handleChange} />
                    </div>

                    <ImageUploader />

                    <h3>Nội dung bài học</h3>
                    <JoditEditor ref={editor} value={lesson.content} onChange={(content) => handleChangeContent(content)} />

                    <br />
                    <Button type="submit" submit onClick={handleSubmit}>
                        Lưu bài học
                    </Button>
                </div>
            </MainAccount>
        </div>
    )
}

export default UpdateLesson
