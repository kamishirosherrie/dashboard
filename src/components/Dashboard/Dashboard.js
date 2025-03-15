import classNames from 'classnames/bind'
import styles from './Dashboard.module.scss'

const cx = classNames.bind(styles)

function Dashboard({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>{children}</div>
        </div>
    )
}

export default Dashboard
