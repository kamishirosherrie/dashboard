import classNames from 'classnames/bind'
import styles from './AddCourse.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useRef, useState } from 'react'
import { addNewCourse } from '../../api/courseApi'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routes/route'
import Button from '../../components/Button/Button'
import JoditEditor from 'jodit-react'

const cx = classNames.bind(styles)

function AddCourse() {
    const navigate = useNavigate()
    const editor = useRef(null)
    const [course, setCourse] = useState({
        title: '',
        description: '',
        fullDescription: '',
        shortDescription: '',
        price: 0,
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setCourse({ ...course, [name]: value })
    }

    const handleChangeDescription = (content) => {
        setCourse((prev) => ({ ...prev, description: content }))
    }
    const handleChangeFullDescription = (content) => {
        setCourse((prev) => ({ ...prev, fullDescription: content }))
    }

    const handleSubmit = async () => {
        try {
            const response = await addNewCourse(course)
            alert('Add course successfully')
            console.log('Course submitted: ', response)
            navigate(routes.listCourse)
        } catch (error) {
            console.log('Add course failed: ', error)
        }
    }

    return (
        <MainAccount>
            <div className={cx('wrapper')}>
                <h1>Courses</h1>
                <div className={cx('container')}>
                    <div className={cx('content')}>
                        <div className={cx('info-group')}>
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" onChange={handleChange} className={cx('input')} required />
                        </div>
                        <div className={cx('info-group')}>
                            <label htmlFor="shortDescription">Short description</label>
                            <input type="text" name="shortDescription" onChange={handleChange} className={cx('input')} required />
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

export default AddCourse
