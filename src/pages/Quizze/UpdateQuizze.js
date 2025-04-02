import classNames from 'classnames/bind'
import styles from './UpdateQuizze.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getQuizzeBySlug } from '../../api/quizzeApi'
import { getQuestionByQuizzeSlug } from '../../api/questionApi'
import { getQuestionType } from '../../api/questionTypeApi'

const cx = classNames.bind(styles)

function UpdateQuizze() {
    const { slug } = useParams()

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
        const getQuizze = async () => {
            try {
                const response = await getQuizzeBySlug(slug)
                if (response) {
                    const questions = await getQuestionByQuizzeSlug(slug)
                    const questionTypes = await getQuestionType()

                    setQuizze(response)
                    setQuestions(questions)
                    setQuestionTypes(questionTypes)

                    console.log(response)
                    console.log(questions)
                    console.log(questionTypes)
                }
            } catch (error) {
                console.log(error)
            }
        }

        getQuizze()
    }, [slug])

    return (
        <MainAccount>
            <div className={cx('wrapper')}>
                <h1>Update Quizze</h1>
                <div className={cx('container')}>
                    <div className={cx('quizze')}>
                        <div className={cx('quizze-group')}>
                            <label htmlFor="lessonName">Lesson name</label>
                            <input type="text" id="lessonName" name="lessonName" value={quizze.lessonId?.title} readOnly />
                        </div>
                        <div className={cx('quizze-group')}>
                            <label htmlFor="title">Quizze title</label>
                            <input type="text" id="title" name="title" value={quizze.title} onChange={handleChangeQuizzeInput} />
                        </div>
                        <div className={cx('quizze-group')}>
                            <label htmlFor="description">Description</label>
                            <input type="text" id="description" name="description" value={quizze.description} onChange={handleChangeQuizzeInput} />
                        </div>
                        <div className={cx('quizze-group')}>
                            <label htmlFor="time">Time for test</label>
                            <input type="text" id="time" name="time" value={quizze.time} onChange={handleChangeQuizzeInput} />
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
                                <label htmlFor="questionTypeId">Question type</label>
                                <select
                                    name="questionTypeId"
                                    id="questionTypeId"
                                    value={question.questionTypeId._id}
                                    onChange={(e) => handleChangeQuestionOption(e, questionIndex)}
                                >
                                    {questionTypes.map((questionType, indexQuestionType) => (
                                        <option key={indexQuestionType} value={questionType._id}>
                                            {questionType.type}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={() => handleDeleteQuestion(questionIndex)}>Delete</button>
                                <div className={cx('answer-group')}>
                                    {question?.answer.map((itemA, answerIndex) => (
                                        <div key={answerIndex} className={cx('answer')}>
                                            <label htmlFor="text">Answer</label>
                                            <input
                                                type="text"
                                                id="text"
                                                name="text"
                                                value={itemA.text}
                                                onChange={(e) => handleChangeAnswerInput(e, questionIndex, answerIndex)}
                                            />
                                            <label htmlFor="isCorrect">Đúng/Sai</label>
                                            <input
                                                type="checkbox"
                                                id="isCorrect"
                                                name="isCorrect"
                                                checked={itemA.isCorrect}
                                                onChange={(e) => handleChangeAnswerOption(e, questionIndex, answerIndex)}
                                            />
                                            <button onClick={() => handleDeleteAnswer(questionIndex, answerIndex)}>Delete</button>
                                        </div>
                                    ))}
                                    <button onClick={() => handleAddAnswer(questionIndex)}>Add an answer</button>
                                </div>
                            </div>
                        ))}
                        <button onClick={handleAddQuestion}>Add a question</button>
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
