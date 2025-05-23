import classNames from 'classnames/bind'
import styles from './ListQuizze.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useEffect, useState } from 'react'
import { deleteQuizze, getAllQuizze } from '../../api/quizzeApi'
import Table from '../../components/Table/Table'
import ModalDelete from '../../components/ModalDelete/ModalDelete'
import Button from '../../components/Button/Button'
import { routes } from '../../routes/route'

const cx = classNames.bind(styles)

function ListQuizze() {
    const [quizzes, setQuizzes] = useState([])
    const [quizzeId, setQuizzeId] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const handleCancel = () => {
        setIsOpen(false)
    }

    const handleDelete = (quizzeId) => {
        setIsOpen(true)
        setQuizzeId(quizzeId)
    }

    const handleDeleteQuizze = (quizzeId) => async () => {
        try {
            const response = await deleteQuizze(quizzeId)
            console.log('Delete quizze: ', response)
            setQuizzes(quizzes.filter((quizze) => quizze._id !== quizzeId))
            setIsOpen(false)
        } catch (error) {
            console.log('Delete quizze failed: ', error)
        }
    }

    useEffect(() => {
        const getQuizzes = async () => {
            try {
                const response = await getAllQuizze()
                setQuizzes(response.quizzes)
            } catch (error) {
                console.log('Get all quizzes failed: ', error)
            }
        }
        getQuizzes()
    }, [])
    return (
        <MainAccount>
            <div className={cx('wrapper')}>
                <h1>Quizzes</h1>
                {quizzes.length === 0 ? (
                    <div className={cx('no-data')}>You haven't added any quizzes yet.</div>
                ) : (
                    <Table headings={['Index', 'Quizze', 'Lesson', 'Type']}>
                        {quizzes.map((quizze, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{quizze.title}</td>
                                <td>{quizze.lessonId?.title}</td>
                                <td>{quizze.type && quizze.type === 'entrytest' ? 'Entry test' : 'Lesson'}</td>
                                <td>
                                    <Button href={`${routes.updateQuizze}/${quizze.slug}`} editBtn>
                                        Edit
                                    </Button>
                                    <Button onClick={() => handleDelete(quizze._id)} deleteBtn>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                )}
            </div>
            <ModalDelete isOpen={isOpen} handleCancel={handleCancel} handleDelete={handleDeleteQuizze(quizzeId)} />
        </MainAccount>
    )
}

export default ListQuizze
