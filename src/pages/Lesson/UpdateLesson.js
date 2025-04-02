import classNames from 'classnames/bind'
import styles from './UpdateLesson.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import ReactQuill from 'react-quill'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getLessonBySlug, updateLesson } from '../../api/lessonApi'
import { getCourse } from '../../api/courseApi'
import { getChapters } from '../../api/chapterApi'

const cx = classNames.bind(styles)

function UpdateLesson() {
    const navigate = useNavigate()
    const { slug } = useParams()

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
        setChapters(allChapters.filter((chapter) => chapter.courseId._id === value))
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
            alert('Update lesson successfully')
            navigate('/admin/lesson')
        } catch (error) {
            console.log(error.response.data.message)
            alert('Order already exists')
        }
    }

    useEffect(() => {
        const getLesson = async () => {
            const response = await getLessonBySlug(slug)
            setLesson(response.lesson)
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
                <h1>Update Lesson</h1>
                <div className={cx('container')}>
                    <label htmlFor="courseId">Khóa học</label>
                    <select name="courseId" onChange={handleChangeCourse} required>
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.title}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="chapterId">Chương</label>
                    <select name="chapterId" value={lesson.chapterId} onChange={handleChangeChapter} required>
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

                    <h3>Nội dung bài học</h3>
                    <ReactQuill theme="snow" value={lesson.content} onChange={handleChangeContent} />
                    <h3>Preview</h3>
                    <div dangerouslySetInnerHTML={{ __html: lesson.content }} style={{ border: '1px solid #ccc', padding: '10px' }} />
                    <br />
                    <button type="submit" onClick={handleSubmit}>
                        Lưu bài học
                    </button>
                </div>
            </MainAccount>
        </div>
    )
}

export default UpdateLesson
