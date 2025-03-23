import classNames from 'classnames/bind'
import styles from './UpdateLesson.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import ReactQuill from 'react-quill'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getLessonBySlug, updateLesson } from '../../api/lessonApi'

const cx = classNames.bind(styles)

function UpdateLesson() {
    const navigate = useNavigate()
    const { slug } = useParams()
    const [lesson, setLesson] = useState({
        title: '',
        videoUrl: '',
        content: '',
        courseId: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setLesson((prev) => ({ ...prev, [name]: value }))
    }

    const handleChangeContent = (content) => {
        setLesson((prev) => ({ ...prev, content: content }))
    }

    const handleSubmit = async (e) => {
        await updateLesson(lesson)
        alert('Update lesson successfully')
        navigate('/admin/lesson')
    }

    useEffect(() => {
        const getLesson = async () => {
            const response = await getLessonBySlug(slug)
            setLesson(response.lesson)
        }

        getLesson()
    }, [])

    return (
        <div className={cx('wrapper')}>
            <MainAccount>
                <h1>Thêm bài học</h1>
                <div className={cx('container')}>
                    <input type="text" name="title" placeholder="Tiêu đề" value={lesson.title} onChange={handleChange} />
                    <input type="text" name="videoUrl" placeholder="URL Video" value={lesson.videoUrl} onChange={handleChange} />
                    <input type="text" name="courseName" placeholder="Tên khóa học" value={lesson.courseId.title} readOnly />

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
