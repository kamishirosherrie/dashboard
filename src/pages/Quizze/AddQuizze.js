import classNames from 'classnames/bind'
import styles from './AddQuizze.module.scss'
import MainAccount from '../../layouts/MainAccount/MainAccount'
import { useEffect, useState } from 'react'
import { addNewQuizze } from '../../api/quizzeApi'
import { addNewQuestion } from '../../api/questionApi'
import { getQuestionType } from '../../api/questionTypeApi'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

function AddQuizze() {
    const navigate = useNavigate()
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
        const getQuestionTypes = async () => {
            try {
                const response = await getQuestionType()
                setQuestionTypes(response.questionTypes)
            } catch (error) {
                console.log('Get question types failed')
            }
        }

        getQuestionTypes()
    }, [])

    return (
        <div className={cx('wrapper')}>
            <MainAccount>
                <h2>Thêm bài kiểm tra</h2>
                <div className={cx('container')}>
                    <div className={cx('quizze')}>
                        <div className={cx('quizze-group')}>
                            <label htmlFor="lessonName">Tên bài học</label>
                            <input type="text" id="lessonName" name="lessonName" value={quizze.lessonName} onChange={handleChangeQuizzeInput} />
                        </div>
                        <div className={cx('quizze-group')}>
                            <label htmlFor="title">Tiêu đề (Tên bài kiểm tra)</label>
                            <input type="text" id="title" name="title" value={quizze.title} onChange={handleChangeQuizzeInput} />
                        </div>
                        <div className={cx('quizze-group')}>
                            <label htmlFor="description">Mô tả</label>
                            <input type="text" id="description" name="description" value={quizze.description} onChange={handleChangeQuizzeInput} />
                        </div>
                        <div className={cx('quizze-group')}>
                            <label htmlFor="time">Thời gian</label>
                            <input type="text" id="time" name="time" value={quizze.time} onChange={handleChangeQuizzeInput} />
                        </div>
                    </div>
                    <div className={cx('question')}>
                        {question?.map((itemQ, indexQ) => (
                            <div key={indexQ} className={cx('question-group')}>
                                <label htmlFor="question">Câu hỏi</label>
                                <input
                                    type="text"
                                    id="question"
                                    name="question"
                                    value={itemQ.question}
                                    onChange={(e) => handleChangeQuestionInput(e, indexQ)}
                                />
                                <label htmlFor="questionTypeId">Loại câu hỏi</label>
                                <select name="questionTypeId" id="questionTypeId" onChange={(e) => handleChangeQuestionOption(e, indexQ)}>
                                    <option value="">--Loại câu hỏi--</option>
                                    {questionTypes?.map((questionType, indexQuestionType) => (
                                        <option key={indexQuestionType} value={questionType._id}>
                                            {questionType.type}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={() => handleDeleteQuestion(indexQ)}>Xoá</button>
                                <div className={cx('answer-group')}>
                                    {itemQ?.answer.map((itemA, indexA) => (
                                        <div key={indexA} className={cx('answer')}>
                                            <label htmlFor="text">Đáp án</label>
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
                                            <button onClick={() => handleDeleteAnswer(indexQ, indexA)}>Xoá</button>
                                        </div>
                                    ))}
                                    <button onClick={() => handleAddAnswer(indexQ)}>Thêm đáp án</button>
                                </div>
                            </div>
                        ))}
                        <button onClick={handleAddQuestion}>Thêm câu hỏi</button>
                    </div>
                    <button type="submit" onClick={handleSubmit}>
                        Lưu
                    </button>
                </div>
            </MainAccount>
        </div>
    )
}

export default AddQuizze
