import classNames from 'classnames/bind'
import styles from './UpdateQuizze.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getQuizzeBySlug } from '../../api/quizzeApi'
import { getQuestionType } from '../../api/questionTypeApi'
import { getLessonById } from '../../api/lessonApi'
import { getQuestionByQuizzeSlug } from '../../api/questionApi'

const cx = classNames.bind(styles)

function UpdateQuizze() {
    const { slug } = useParams()

    const [lesson, setLesson] = useState({})

    const [quizze, setQuizze] = useState({})

    const [questions, setQuestions] = useState([])

    const [questionTypes, setQuestionTypes] = useState([])

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', questionTypeId: '', answer: [{ isCorrect: false, text: '' }] }])
    }

    const handleDeleteQuestion = (questionIndex) => {
        setQuestions(questions.filter((_, index) => index !== questionIndex))
    }

    const handleAddAnswer = (questionIndex) => {
        const updatedQuestions = [...questions]
        updatedQuestions[questionIndex].answer.push({ isCorrect: false, text: '' })
        setQuestions(updatedQuestions)
    }

    const handleDeleteAnswer = (questionIndex, answerIndex) => {
        const updatedQuestions = [...questions]
        updatedQuestions[questionIndex].answer = updatedQuestions[questionIndex].answer.filter((_, index) => index !== answerIndex)
        setQuestions(updatedQuestions)
    }

    const handleChangeQuizzeInput = (e) => {
        const { name, value } = e.target
        setQuizze({ ...quizze, [name]: value })
    }

    const handleChangeQuestionInput = (e, questionIndex) => {
        const { value } = e.target
        const updatedQuestions = [...questions]
        updatedQuestions[questionIndex].question = value
        setQuestions(updatedQuestions)
    }

    const handleChangeQuestionOption = (e, questionIndex) => {
        const { value } = e.target
        const updatedQuestions = [...questions]
        updatedQuestions[questionIndex].questionTypeId = value
        setQuestions(updatedQuestions)
    }

    const handleChangeAnswerInput = (e, questionIndex, answerIndex) => {
        const { value } = e.target
        const updatedQuestions = [...questions]
        updatedQuestions[questionIndex].answer[answerIndex].text = value
        setQuestions(updatedQuestions)
    }

    const handleChangeAnswerOption = (e, questionIndex, answerIndex) => {
        const { checked } = e.target
        const updatedQuestions = [...questions]
        updatedQuestions[questionIndex].answer[answerIndex].isCorrect = checked
        setQuestions(updatedQuestions)
    }

    const handleSubmit = () => {}

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const response = await getQuestionByQuizzeSlug(slug)
                if (response) {
                    const lesson = await getLessonById(response[0].quizzeId.lessonId)
                    setLesson(lesson.lesson)
                    setQuestions(response)
                }
            } catch (error) {
                console.log(error)
            }
        }

        getQuestions()
    }, [slug])

    return (
        <MainAccount>
            <div className={cx('wrapper')}>
                <h1>Update Quizze</h1>
                <div className={cx('container')}>
                    <div className={cx('quizze')}>
                        <div className={cx('quizze-group')}>
                            <label htmlFor="lessonName">Lesson name</label>
                            <input type="text" id="lessonName" name="lessonName" value={lesson.title} readOnly />
                        </div>
                        <div className={cx('quizze-group')}>
                            <label htmlFor="title">Quizze title</label>
                            <input type="text" id="title" name="title" value={questions[0]?.quizzeId.title} onChange={handleChangeQuizzeInput} />
                        </div>
                        <div className={cx('quizze-group')}>
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={questions[0]?.quizzeId.description}
                                onChange={handleChangeQuizzeInput}
                            />
                        </div>
                        <div className={cx('quizze-group')}>
                            <label htmlFor="time">Time for test</label>
                            <input type="text" id="time" name="time" value={questions[0]?.quizzeId.time} onChange={handleChangeQuizzeInput} />
                        </div>
                    </div>

                    <div className={cx('question-group')}>
                        {questions.map((question, questionIndex) => (
                            <div key={questionIndex} className={cx('question')}>
                                <div className={cx('question-title')}>
                                    <label htmlFor={questionIndex}>Question {questionIndex + 1}</label>
                                    <input
                                        type="text"
                                        id={questionIndex}
                                        name="question"
                                        value={question.question}
                                        onChange={(e) => handleChangeQuestionInput(e, questionIndex)}
                                    />
                                </div>
                                <div className={cx('question-option')}>
                                    <label htmlFor={`questionType-${questionIndex}`}>Question type</label>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button type="submit" onClick={handleSubmit}>
                        Save
                    </button>
                </div>
            </div>
        </MainAccount>
    )
}

export default UpdateQuizze
