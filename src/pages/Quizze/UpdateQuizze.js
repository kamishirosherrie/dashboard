import classNames from 'classnames/bind'
import styles from './UpdateQuizze.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'

const cx = classNames.bind(styles)

function UpdateQuizze() {
    return (
        <MainAccount>
            <div className={cx('wrapper')}>
                <h1>Update Quizze</h1>
            </div>
        </MainAccount>
    )
}

export default UpdateQuizze
