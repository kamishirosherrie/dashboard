import classNames from 'classnames/bind'
import styles from './AddCourse.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useState } from 'react'

const cx = classNames.bind(styles)

function AddCourse() {
    const [course, setCourse] = useState({
        title: '',
        description: '',
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setCourse({ ...course, [name]: value })
    }
    const handleSubmit = () => {
        console.log('Course: ', course)
    }

    return (
        <MainAccount>
            <div className={cx('wrapper')}>
                <h1>Add Course</h1>
                <div className={cx('container')}>
                    <div className={cx('create-user')}>
                        <div className={cx('content')}>
                            <div className={cx('course-group')}>
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" onChange={handleChange} className={cx('input')} required />
                            </div>
                            <div className={cx('course-group')}>
                                <label htmlFor="description">Description</label>
                                <input type="text" name="description" onChange={handleChange} className={cx('input')} required />
                            </div>
                        </div>

                        <button type="submit" className={cx('submit')} onClick={handleSubmit}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </MainAccount>
    )
}

export default AddCourse
