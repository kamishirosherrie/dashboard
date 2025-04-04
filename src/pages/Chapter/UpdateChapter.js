import classNames from 'classnames/bind'
import styles from './UpdateChapter.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { routes } from '../../routes/route'
import { getChapterById, updateChapter } from '../../api/chapterApi'
import { getCourse } from '../../api/courseApi'
import Button from '../../components/Button/Button'

const cx = classNames.bind(styles)

function UpdateChapter() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [courses, setCourses] = useState([])
    const [chapter, setChapter] = useState({
        _id: '',
        title: '',
        order: '',
        courseId: '',
    })
    const handleChange = (event) => {
        const { name, value } = event.target
        setChapter((prev) => ({ ...prev, [name]: value }))
    }

    const handleChangeCourse = (event) => {
        const { name, value } = event.target
        setChapter((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        try {
            console.log('Chapter info: ', chapter)
            await updateChapter(chapter)
            alert('Update chapter successfully!')
            navigate(routes.listChapter)
        } catch (error) {
            alert('Update chapter failed!')
            console.log('Update chapter failed!', error)
        }
    }

    useEffect(() => {
        const getChapter = async () => {
            const response = await getChapterById(id)
            const courses = await getCourse()
            setCourses(courses.courses)
            setChapter(response.chapter)
        }

        getChapter()
    }, [id])
    return (
        <MainAccount>
            <div className={cx('wrapper')}>
                <h1>Chapters</h1>
                <div className={cx('container')}>
                    <div className={cx('content')}>
                        <div className={cx('info-group')}>
                            <label htmlFor="title">Course</label>
                            <select name="courseId" value={chapter.courseId?.title} onChange={handleChangeCourse} className={cx('input')} required>
                                {courses.map((course) => (
                                    <option key={course._id} value={course._id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={cx('info-group')}>
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" value={chapter.title} onChange={handleChange} className={cx('input')} required />
                        </div>
                        <div className={cx('info-group')}>
                            <label htmlFor="order">Order</label>
                            <input type="text" name="order" value={chapter.order} onChange={handleChange} className={cx('input')} required />
                        </div>
                    </div>

                    <Button type="submit" submit className={cx('submit')} onClick={handleSubmit}>
                        Save
                    </Button>
                </div>
            </div>
        </MainAccount>
    )
}

export default UpdateChapter
