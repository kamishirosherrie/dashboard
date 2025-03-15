import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import classNames from 'classnames/bind'
import styles from './AddLesson.module.scss'

import { addNewLesson } from '../../api/lessonApi'
import MainAccount from '../../layouts/MainAccount/MainAccount'

const cx = classNames.bind(styles)

function AddLesson() {
    const [lesson, setLesson] = useState({
        title: '',
        videoUrl: '',
        content: '',
        courseName: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setLesson({ ...lesson, [name]: value })
    }

    const handleChangeContent = (content) => {
        setLesson({ ...lesson, content })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Lesson data:', lesson)
        try {
            const res = await addNewLesson(lesson)
            console.log('Response:', res)
        } catch (error) {
            console.log('Error:', error)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <MainAccount>
                <h1>Thêm bài học</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" placeholder="Tiêu đề" value={lesson.title} onChange={handleChange} required />
                    <input type="text" name="videoUrl" placeholder="URL Video" value={lesson.videoUrl} onChange={handleChange} />
                    <input type="text" name="courseName" placeholder="Tên Khóa học" value={lesson.courseName} onChange={handleChange} required />

                    <h3>Nội dung bài học</h3>
                    <ReactQuill theme="snow" value={lesson.content} onChange={handleChangeContent} />
                    <h3>Preview</h3>
                    <div dangerouslySetInnerHTML={{ __html: lesson.content }} style={{ border: '1px solid #ccc', padding: '10px' }} />
                    <br />
                    <button type="submit">Lưu bài học</button>
                </form>
            </MainAccount>
        </div>
    )
}

export default AddLesson
