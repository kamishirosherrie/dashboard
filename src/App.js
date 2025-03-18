import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddLesson from './pages/Lesson/AddLesson'
import ListLesson from './pages/Lesson/ListLesson'
import ListQuizze from './pages/Quizze/ListQuizze'
import AddQuizze from './pages/Quizze/AddQuizze'
import ListUser from './pages/User/ListUser'
import AddUser from './pages/User/AddUser'
import AddCourse from './pages/Course/AddCourse'
import ListCourse from './pages/Course/ListCourse'
import UpdateUser from './pages/User/UpdateUser'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ListUser />} />
                <Route path="/admin/user/add-user" element={<AddUser />} />
                <Route path="/admin/user/updateUser/:userName" element={<UpdateUser />} />
                <Route path="/admin/course/add-course" element={<AddCourse />} />
                <Route path="/admin/course" element={<ListCourse />} />
                <Route path="/admin/lesson/add-lesson" element={<AddLesson />} />
                <Route path="/admin/lesson" element={<ListLesson />} />
                <Route path="/admin/quizze/add-quizze" element={<AddQuizze />} />
                <Route path="/admin/quizze" element={<ListQuizze />} />
            </Routes>
        </Router>
    )
}

export default App
