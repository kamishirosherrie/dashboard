import classNames from 'classnames/bind'
import styles from './AddQuizze.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useEffect, useState } from 'react'
import { addNewQuizze } from '../../api/quizzeApi'
import { addNewQuestion } from '../../api/questionApi'
import { getQuestionType } from '../../api/questionTypeApi'
import { getAllLesson } from '../../api/lessonApi'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

function AddQuizze() {
    const navigate = useNavigate()
    const [lessons, setLessons] = useState([])
    const [quizze, setQuizze] = useState({
        lessonName: '',
        title: '',
        description: '',
        time: '',
    })

    const [question, setQuestion] = useState([])

    const [questionTypes, setQuestionTypes] = useState([])

    const handleAddQuestion = () => {
        setQuestion([...question, { question: '', questionTypeId: '', answer: [{ isCorrect: false, text: '' }] }])
    }

    const handleDeleteQuestion = (questionIndex) => {
        setQuestion(question.filter((_, index) => index !== questionIndex))
    }

    const handleAddAnswer = (questionIndex) => {
        const updatedQuestions = [...question]
        updatedQuestions[questionIndex].answer.push({ isCorrect: false, text: '' })
        setQuestion(updatedQuestions)
    }

    const handleDeleteAnswer = (questionIndex, answerIndex) => {
        const updatedQuestions = [...question]
        updatedQuestions[questionIndex].answer = updatedQuestions[questionIndex].answer.filter((_, index) => index !== answerIndex)
        setQuestion(updatedQuestions)
    }

    const handleChangeQuizzeInput = (e) => {
        const { name, value } = e.target
        setQuizze({ ...quizze, [name]: value })
    }

    const handleChangeQuestionInput = (e, questionIndex) => {
        const { value } = e.target
        const updatedQuestions = [...question]
        updatedQuestions[questionIndex].question = value
        setQuestion(updatedQuestions)
    }

    const handleChangeQuestionOption = (e, questionIndex) => {
        const { value } = e.target
        const updatedQuestions = [...question]
        updatedQuestions[questionIndex].questionTypeId = value
        setQuestion(updatedQuestions)
    }

    const handleChangeAnswerInput = (e, questionIndex, answerIndex) => {
        const { value } = e.target
        const updatedQuestions = [...question]
        updatedQuestions[questionIndex].answer[answerIndex].text = value
        setQuestion(updatedQuestions)
    }

    const handleChangeAnswerOption = (e, questionIndex, answerIndex) => {
        const { checked } = e.target
        const updatedQuestions = [...question]
        updatedQuestions[questionIndex].answer[answerIndex].isCorrect = checked
        setQuestion(updatedQuestions)
    }

    const handleSubmit = async () => {
        console.log('quizze: ', quizze)
        console.log('question: ', { question, quizzeName: quizze.title })
        try {
            const quizzeResponse = await addNewQuizze(quizze)
            console.log('Quizze submitted: ', quizzeResponse)
            const questionResponse = await addNewQuestion({ questions: question, quizzeName: quizze.title })
            console.log('Question submitted: ', questionResponse)
            navigate('/admin/quizze')
        } catch (error) {
            console.log('Submitfailed: ', error)
        }
    }

    useEffect(() => {
        const getLessonInfo = async () => {
            const response = await getAllLesson()
            setLessons(response.lessons)
        }
        const getQuestionTypes = async () => {
            try {
                const response = await getQuestionType()
                setQuestionTypes(response.questionTypes)
            } catch (error) {
                console.log('Get question types failed')
            }
        }

        getLessonInfo()
        getQuestionTypes()
    }, [])

    return (
        <div className={cx('wrapper')}>
            <MainAccount>
                <h2>Thêm bài kiểm tra</h2>
                <div className={cx('container')}>
                    <div className={cx('quizze')}>
                        <div className={cx('quizze-group')}>
                            <label htmlFor="lessonName">Lesson name</label>
                            <select name="lessonName" id="lessonName" onChange={handleChangeQuizzeInput}>
                                <option value="">--Choose a lesson--</option>
                                {lessons.map((lesson, index) => (
                                    <option key={index} value={lesson.title}>
                                        {lesson.title}
                                    </option>
                                ))}
                            </select>
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
                    <div className={cx('question')}>
                        {question?.map((itemQ, indexQ) => (
                            <div key={indexQ} className={cx('question-group')}>
                                <label htmlFor="question">Question</label>
                                <input
                                    type="text"
                                    id="question"
                                    name="question"
                                    value={itemQ.question}
                                    onChange={(e) => handleChangeQuestionInput(e, indexQ)}
                                />
                                <label htmlFor="questionTypeId">Question type</label>
                                <select name="questionTypeId" id="questionTypeId" onChange={(e) => handleChangeQuestionOption(e, indexQ)}>
                                    <option value="">--Choose a type--</option>
                                    {questionTypes?.map((questionType, indexQuestionType) => (
                                        <option key={indexQuestionType} value={questionType._id}>
                                            {questionType.type}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={() => handleDeleteQuestion(indexQ)}>Delete</button>
                                <div className={cx('answer-group')}>
                                    {itemQ?.answer.map((itemA, indexA) => (
                                        <div key={indexA} className={cx('answer')}>
                                            <label htmlFor="text">Answer</label>
                                            <input
                                                type="text"
                                                id="text"
                                                name="text"
                                                value={itemA.text}
                                                onChange={(e) => handleChangeAnswerInput(e, indexQ, indexA)}
                                            />
                                            <label htmlFor="isCorrect">Đúng/Sai</label>
                                            <input
                                                type="checkbox"
                                                id="isCorrect"
                                                name="isCorrect"
                                                checked={itemA.isCorrect}
                                                onChange={(e) => handleChangeAnswerOption(e, indexQ, indexA)}
                                            />
                                            <button onClick={() => handleDeleteAnswer(indexQ, indexA)}>Delete</button>
                                        </div>
                                    ))}
                                    <button onClick={() => handleAddAnswer(indexQ)}>Add an answer</button>
                                </div>
                            </div>
                        ))}
                        <button onClick={handleAddQuestion}>Add a question</button>
                    </div>
                    <button type="submit" onClick={handleSubmit}>
                        Save
                    </button>
                </div>
            </MainAccount>
        </div>
    )
}

export default AddQuizze
