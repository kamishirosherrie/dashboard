import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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
import { useContext } from 'react'
import AuthContext from './context/AuthContext'

function App() {
    const { user } = useContext(AuthContext)
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />

                <Route path="/admin/user" element={user ? <ListUser /> : <Navigate to="/login" />} />
                <Route path="/admin/user/add-user" element={user ? <AddUser /> : <Navigate to="/login" />} />
                <Route path="/admin/user/updateUser/:userName" element={user ? <UpdateUser /> : <Navigate to="/login" />} />

                <Route path="/admin/course" element={user ? <ListCourse /> : <Navigate to="/login" />} />
                <Route path="/admin/course/add-course" element={user ? <AddCourse /> : <Navigate to="/login" />} />
                <Route path="/admin/course/update-course/:slug" element={user ? <UpdateCourse /> : <Navigate to="/login" />} />

                <Route path="/admin/lesson" element={user ? <ListLesson /> : <Navigate to="/login" />} />
                <Route path="/admin/lesson/add-lesson" element={user ? <AddLesson /> : <Navigate to="/login" />} />
                <Route path="/admin/lesson/update-lesson/:slug" element={user ? <UpdateLesson /> : <Navigate to="/login" />} />

                <Route path="/admin/quizze" element={user ? <ListQuizze /> : <Navigate to="/login" />} />
                <Route path="/admin/quizze/add-quizze" element={user ? <AddQuizze /> : <Navigate to="/login" />} />
                <Route path="/admin/quizze/update-quizze/:slug" element={user ? <UpdateQuizze /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    )
}

export default App
