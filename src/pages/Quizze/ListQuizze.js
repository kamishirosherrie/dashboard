import classNames from 'classnames/bind'
import styles from './ListQuizze.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useEffect, useState } from 'react'
import { deleteQuizze, getQuizzesWithQuestions } from '../../api/quizzeApi'
import Table from '../../components/Table/Table'
import ModalDelete from '../../components/ModalDelete/ModalDelete'
import Button from '../../components/Button/Button'

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
                const response = await getQuizzesWithQuestions()
                setQuizzes(response.quizzesWithQuestons)
            } catch (error) {
                console.log('Get all quizzes failed: ', error)
            }
        }
        getQuizzes()
    }, [])
    return (
        <MainAccount>
            <div className={cx('wrapper')}>
                <h1>List Quizze</h1>
                {quizzes.length === 0 ? (
                    <div className={cx('no-data')}>You haven't added any quizzes yet.</div>
                ) : (
                    <Table headings={['Index', 'Quizze', 'Lesson']}>
                        {quizzes.map((quizze, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{quizze.title}</td>
                                <td>{quizze.lesson.title}</td>
                                <td>
                                    <Button href={`/admin/quizze/update-quizze/${quizze.slug}`}>Edit</Button>
                                    <Button onClick={() => handleDelete(quizze._id)}>Delete</Button>
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
