import classNames from 'classnames/bind'
import styles from './MainAccount.module.scss'
import Sidebar from '../Sidebar/Sidebar'
import Dashboard from '../../components/Dashboard/Dashboard'

const cx = classNames.bind(styles)

function MainAccount({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Sidebar />
                <Dashboard>{children}</Dashboard>
            </div>
        </div>
    )
}

export default MainAccount
