import Modal from 'react-modal'
import classNames from 'classnames/bind'
import styles from './ModalDelete.module.scss'
import Button from '../Button/Button'

const cx = classNames.bind(styles)
Modal.setAppElement('#root')

function ModalDelete({ isOpen, handleCancel, handleDelete }) {
    return (
        <Modal isOpen={isOpen} onRequestClose={handleCancel}>
            <p>Are you sure you want to delete?</p>
            <div className={cx('footer')}>
                <Button cancel className={cx('cancel')} onClick={handleCancel}>
                    Cancel
                </Button>
                <Button deleteBtn className={cx('delete')} onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </Modal>
    )
}

export default ModalDelete
