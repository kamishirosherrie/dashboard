import classNames from 'classnames/bind'
import styles from './AddCourse.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useState } from 'react'
import { addNewCourse } from '../../api/courseApi'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routes/route'
import Button from '../../components/Button/Button'

const cx = classNames.bind(styles)

function AddCourse() {
    const navigate = useNavigate()
    const [course, setCourse] = useState({
        title: '',
        description: '',
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setCourse({ ...course, [name]: value })
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
                            <label htmlFor="description">Description</label>
                            <textarea type="text" name="description" onChange={handleChange} className={cx('textarea')} required />
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
