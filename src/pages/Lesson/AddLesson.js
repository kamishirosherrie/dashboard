import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './AddLesson.module.scss'
import JoditEditor from 'jodit-react'

import { addNewLesson } from '../../api/lessonApi'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useNavigate } from 'react-router-dom'
import { getCourse } from '../../api/courseApi'
import { getChapters } from '../../api/chapterApi'
import { routes } from '../../routes/route'
import Button from '../../components/Button/Button'
import ImageUploader from '../../components/ImageUploader/ImageUploader'

const cx = classNames.bind(styles)

function AddLesson() {
    const navigate = useNavigate()
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
        setLesson({ ...lesson, [name]: value })
    }

    const handleChangeCourse = (e) => {
        const { value } = e.target
        console.log('course: ', value)
        console.log(
            'chapters: ',
            allChapters.filter((chapter) => chapter.courseId._id === value),
        )

        const filteredChapters = allChapters.filter((chapter) => chapter.courseId._id === value)
        setChapters(filteredChapters)
    }

    const handleChangeChapter = (e) => {
        const { name, value } = e.target
        setLesson({ ...lesson, [name]: value })
    }

    const handleChangeContent = (content) => {
        setLesson((prev) => ({ ...prev, content: content }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Lesson data:', lesson)
        try {
            const res = await addNewLesson(lesson)
            console.log('Response:', res)
            alert('Add lesson successfully')
            navigate(routes.listLesson)
        } catch (error) {
            console.log('Error:', error)
        }
    }

    useEffect(() => {
        const getAllCourses = async () => {
            const response = await getCourse()
            setCourses(response.courses)
        }

        const getAllChapters = async () => {
            const response = await getChapters()
            setAllChapters(response.chapters)
        }
        getAllCourses()
        getAllChapters()
    }, [])

    return (
        <div className={cx('wrapper')}>
            <MainAccount>
                <h1>Lessons</h1>
                <div className={cx('form')}>
                    <div className={cx('form-group')}>
                        <label htmlFor="courseId">Khóa học</label>
                        <select name="courseId" onChange={handleChangeCourse} required>
                            <option value="">-- Chọn khóa học --</option>
                            {courses.map((course) => (
                                <option key={course._id} value={course._id}>
                                    {course.title}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="chapterId">Chương</label>
                        <select name="chapterId" value={lesson.chapterId} onChange={handleChangeChapter} required>
                            <option value="">-- Chọn chương --</option>
                            {chapters.map((chapter) => (
                                <option key={chapter._id} value={chapter?._id}>
                                    Chương {chapter?.order}: {chapter?.title}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="title">Tiêu đề</label>
                        <input type="text" name="title" placeholder="Tiêu đề" value={lesson.title} onChange={handleChange} required />
                    </div>
                    <ImageUploader />
                    <h3>Nội dung bài học</h3>
                    <JoditEditor ref={editor} value={lesson.content} onChange={(content) => handleChangeContent(content)} />

                    <br />
                    <Button type="submit" onClick={handleSubmit} className={cx('submit')} submit>
                        Lưu bài học
                    </Button>
                </div>
            </MainAccount>
        </div>
    )
}

export default AddLesson
