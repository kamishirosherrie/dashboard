import classNames from 'classnames/bind'
import styles from './ListQuizze.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useEffect, useState } from 'react'
import { getQuizzesWithQuestions } from '../../api/quizzeApi'
import Table from '../../components/Table/Table'
import { Link } from 'react-router-dom'
import ModalDelete from '../../components/ModalDelete/ModalDelete'

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
        console.log(
            'Delete quizze: ',
            quizzes.filter((quizze) => quizze._id !== quizzeId),
        )
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
                    <Table headings={['Index', 'Quizze', 'Lesson', '']}>
                        {quizzes.map((quizze, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{quizze.title}</td>
                                <td>{quizze.lesson.title}</td>
                                <td>
                                    <button>
                                        <Link to={`/admin/quizze/update-quizze/${quizze.slug}`}>Edit</Link>
                                    </button>
                                    <button onClick={() => handleDelete(quizze._id)}>Delete</button>
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
