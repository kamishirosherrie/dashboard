import Modal from 'react-modal'
import classNames from 'classnames/bind'
import styles from './ModalDelete.module.scss'

const cx = classNames.bind(styles)
Modal.setAppElement('#root')

function ModalDelete({ isOpen, handleCancel, handleDelete }) {
    return (
        <Modal isOpen={isOpen} onRequestClose={handleCancel}>
            <p>Are you sure you want to delete?</p>
            <div className={cx('footer')}>
                <button className={cx('cancel')} onClick={handleCancel}>
                    Cancel
                </button>
                <button className={cx('delete')} onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </Modal>
    )
}

export default ModalDelete
