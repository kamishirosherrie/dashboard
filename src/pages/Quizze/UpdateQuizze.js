import classNames from 'classnames/bind'
import styles from './UpdateQuizze.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getQuizzeBySlug } from '../../api/quizzeApi'
import { getQuestionByQuizzeSlug } from '../../api/questionApi'
import { getQuestionType } from '../../api/questionTypeApi'
import Button from '../../components/Button/Button'

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

    const handleSubmit = () => {
        console.log('Quizze: ', quizze)
        console.log('Questions: ', questions)
    }

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
                <h1>Quizzes</h1>
                <div className={cx('container')}>
                    <div className={cx('quizze')}>
                        <div className={cx('info-group')}>
                            <label htmlFor="lessonName">Lesson name</label>
                            <input type="text" id="lessonName" name="lessonName" value={quizze.lessonId?.title} readOnly />
                        </div>
                        <div className={cx('info-group')}>
                            <label htmlFor="title">Quizze title</label>
                            <input type="text" id="title" name="title" value={quizze.title} onChange={handleChangeQuizzeInput} />
                        </div>
                        <div className={cx('info-group')}>
                            <label htmlFor="description">Description</label>
                            <input type="text" id="description" name="description" value={quizze.description} onChange={handleChangeQuizzeInput} />
                        </div>
                        <div className={cx('info-group')}>
                            <label htmlFor="time">Time for test</label>
                            <input type="text" id="time" name="time" value={quizze.time} onChange={handleChangeQuizzeInput} />
                        </div>
                    </div>

                    <div className={cx('info-group')}>
                        {questions.map((question, questionIndex) => (
                            <div key={questionIndex} className={cx('info-group')}>
                                <label htmlFor="question">
                                    <strong>
                                        {questionIndex + 1} - Question {questionIndex + 1}
                                    </strong>
                                </label>
                                <input
                                    type="text"
                                    id={questionIndex}
                                    name="question"
                                    value={question.question}
                                    onChange={(e) => handleChangeQuestionInput(e, questionIndex)}
                                />
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
                                <Button onClick={() => handleDeleteQuestion(questionIndex)} deleteBtn>
                                    Delete
                                </Button>
                                <div className={cx('info-group')}>
                                    {question?.answer.map((itemA, answerIndex) => (
                                        <div key={answerIndex} className={cx('answer')}>
                                            <div className={cx('answer-group')}>
                                                <label htmlFor="text">Answer</label>
                                                <input
                                                    type="text"
                                                    id="text"
                                                    name="text"
                                                    value={itemA.text}
                                                    onChange={(e) => handleChangeAnswerInput(e, questionIndex, answerIndex)}
                                                />
                                            </div>
                                            <div className={cx('true-false')}>
                                                <label htmlFor="isCorrect">Đúng/Sai</label>
                                                <input
                                                    type="checkbox"
                                                    id="isCorrect"
                                                    name="isCorrect"
                                                    checked={itemA.isCorrect}
                                                    onChange={(e) => handleChangeAnswerOption(e, questionIndex, answerIndex)}
                                                />
                                                <Button onClick={() => handleDeleteAnswer(questionIndex, answerIndex)} deleteBtn>
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <Button onClick={() => handleAddAnswer(questionIndex)} add>
                                        Add an answer
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <Button onClick={handleAddQuestion} add>
                            Add a question
                        </Button>
                    </div>
                    <Button type="submit" onClick={handleSubmit} submit>
                        Save
                    </Button>
                </div>
            </div>
        </MainAccount>
    )
}

export default UpdateQuizze
