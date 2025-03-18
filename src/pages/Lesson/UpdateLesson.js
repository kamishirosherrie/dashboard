import classNames from 'classnames/bind'
import styles from './UpdateLesson.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'

const cx = classNames.bind(styles)

function UpdateLesson() {
    return (
        <MainAccount>
            <div className={cx('wrapper')}>
                <h1>Update Lesson</h1>
            </div>
        </MainAccount>
    )
}

export default UpdateLesson
