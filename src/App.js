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
import UpdateCourse from './pages/Course/UpdateCourse'
import UpdateLesson from './pages/Lesson/UpdateLesson'
import UpdateQuizze from './pages/Quizze/UpdateQuizze'
import Login from './pages/Login/Login'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route path="/admin/user" element={<ListUser />} />
                <Route path="/admin/user/add-user" element={<AddUser />} />
                <Route path="/admin/user/updateUser/:userName" element={<UpdateUser />} />

                <Route path="/admin/course" element={<ListCourse />} />
                <Route path="/admin/course/add-course" element={<AddCourse />} />
                <Route path="/admin/course/update-course/:slug" element={<UpdateCourse />} />

                <Route path="/admin/lesson" element={<ListLesson />} />
                <Route path="/admin/lesson/add-lesson" element={<AddLesson />} />
                <Route path="/admin/lesson/update-lesson/:slug" element={<UpdateLesson />} />

                <Route path="/admin/quizze" element={<ListQuizze />} />
                <Route path="/admin/quizze/add-quizze" element={<AddQuizze />} />
                <Route path="/admin/quizze/update-quizze/:slug" element={<UpdateQuizze />} />
            </Routes>
        </Router>
    )
}

export default App
