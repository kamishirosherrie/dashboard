import classNames from 'classnames/bind'
import styles from './ListQuizze.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useEffect, useState } from 'react'
import { getQuizzesWithQuestions } from '../../api/quizzeApi'
import Table from '../../components/Table/Table'

const cx = classNames.bind(styles)

function ListQuizze() {
    const [quizzes, setQuizzes] = useState([])

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
                <Table headings={['Index', 'Quizze', 'Lesson', '']}>
                    {quizzes.map((quizze, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{quizze.title}</td>
                            <td>{quizze.lesson.title}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </Table>
            </div>
        </MainAccount>
    )
}

export default ListQuizze
