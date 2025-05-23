import classNames from 'classnames/bind'
import styles from './UpdateCourse.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCourseBySlug, updateCourse } from '../../api/courseApi'
import { routes } from '../../routes/route'
import Button from '../../components/Button/Button'
import JoditEditor from 'jodit-react'

const cx = classNames.bind(styles)

function UpdateCourse() {
    const { slug } = useParams()
    const navigate = useNavigate()

    const editor = useRef(null)
    const [course, setCourse] = useState({
        _id: '',
        title: '',
        description: '',
        fullDescription: '',
        shortDescription: '',
        price: 0,
    })
    const handleChange = (event) => {
        const { name, value } = event.target
        setCourse((prev) => ({ ...prev, [name]: value }))
    }

    const handleChangeDescription = (content) => {
        setCourse((prev) => ({ ...prev, description: content }))
    }
    const handleChangeFullDescription = (content) => {
        setCourse((prev) => ({ ...prev, fullDescription: content }))
    }

    const handleSubmit = async () => {
        console.log('Course info: ', course)
        await updateCourse(course)
        alert('Update course successfully!')
        navigate(routes.listCourse)
    }

    useEffect(() => {
        const getCourse = async () => {
            const response = await getCourseBySlug(slug)
            console.log('Course info: ', response)

            setCourse(response)
        }

        getCourse()
    }, [slug])
    return (
        <MainAccount>
            <div className={cx('wrapper')}>
                <h1>Courses</h1>
                <div className={cx('container')}>
                    <div className={cx('content')}>
                        <div className={cx('info-group')}>
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" value={course.title} onChange={handleChange} className={cx('input')} required />
                        </div>
                        <div className={cx('info-group')}>
                            <label htmlFor="shortDescription">Short description</label>
                            <input
                                type="text"
                                name="shortDescription"
                                value={course.shortDescription}
                                onChange={handleChange}
                                className={cx('input')}
                                required
                            />
                        </div>
                        <div className={cx('info-group')}>
                            <label htmlFor="price">Price</label>
                            <input type="number" name="price" value={course.price} onChange={handleChange} className={cx('input')} required />
                        </div>
                        <div className={cx('info-group')}>
                            <label htmlFor="description">Description</label>
                            <JoditEditor ref={editor} value={course.description} onChange={(content) => handleChangeDescription(content)} />
                        </div>
                        <div className={cx('info-group')}>
                            <label htmlFor="fullDescription">Full Description</label>
                            <JoditEditor ref={editor} value={course.fullDescription} onChange={(content) => handleChangeFullDescription(content)} />
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

export default UpdateCourse
