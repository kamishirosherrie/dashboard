import classNames from 'classnames/bind'
import styles from './Quizze.module.scss'

const cx = classNames.bind(styles)

function Quizze({ quizze }) {
    return (
        <div className={cx('wrapper')} key={quizze._id}>
            <div className={cx('list-quizze')}>
                <h2>Danh sách bài kiểm tra</h2>
                <h3>{quizze.title}</h3>
                <p>Mô tả: {quizze.description}</p>
                <p>Slug: {quizze.slug}</p>
                <p>Thời gian làm bài: {quizze.time}</p>
            </div>
            <div className={cx('list-question')}>
                <h4>Danh sách câu hỏi</h4>
                <ol>
                    {quizze.questions.map((question, index) => (
                        <li className={cx('question')} key={index}>
                            {question.question}
                            <ol>
                                {question.answer.map((answer, index) => (
                                    <li className={cx('answer')} key={index}>
                                        {answer.text}
                                    </li>
                                ))}
                            </ol>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default Quizze
