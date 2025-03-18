import classNames from 'classnames/bind'
import styles from './UpdateUser.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const cx = classNames.bind(styles)

function UpdateUser() {
    const { userName } = useParams()

    useEffect(() => {
        const getUserInfo = async () => {{}
    },)
    
    return (
        <div className={cx('wrapper')}>
            <MainAccount>
                <h2>Update User</h2>
            </MainAccount>
        </div>
    )
}

export default UpdateUser
