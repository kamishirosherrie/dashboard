import classNames from 'classnames/bind'
import styles from './AddChapter.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routes/route'
import { addNewChapter } from '../../api/chapterApi'
import { getCourse } from '../../api/courseApi'
import Button from '../../components/Button/Button'

const cx = classNames.bind(styles)

function AddChapter() {
    const navigate = useNavigate()

    const [courses, setCourses] = useState([])
    const [chapter, setChapter] = useState({
        title: '',
        order: '',
        courseId: '',
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setChapter({ ...chapter, [name]: value })
    }

    const handleChangeCourse = (event) => {
        const { name, value } = event.target
        setChapter((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        try {
            const response = await addNewChapter(chapter)
            alert('Add chapter successfully')
            console.log('chapter submitted: ', response)
            navigate(routes.listChapter)
        } catch (error) {
            console.log('Add chapter failed: ', error)
        }
    }

    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await getCourse()
                setCourses(response.courses)
            } catch (error) {
                console.log('Get courses failed: ', error)
            }
        }

        getCourses()
    }, [])

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
                            <input type="text" name="title" onChange={handleChange} className={cx('input')} required />
                        </div>
                        <div className={cx('info-group')}>
                            <label htmlFor="order">Order</label>
                            <input type="text" name="order" onChange={handleChange} className={cx('input')} required />
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

export default AddChapter
