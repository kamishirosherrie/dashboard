import classNames from 'classnames/bind'
import styles from './UpdateCourse.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'

const cx = classNames.bind(styles)

function UpdateCourse() {
    return (
        <MainAccount>
            <div className={cx('wrapper')}>
                <h1>Update Course</h1>
            </div>
        </MainAccount>
    )
}

export default UpdateCourse
