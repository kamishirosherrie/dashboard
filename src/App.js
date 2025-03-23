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
import { useContext } from 'react'
import AuthContext from './context/AuthContext'
import ProctectedRoute from './routes/ProtectedRoute'

function App() {
    const { user } = useContext(AuthContext)
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />

                <Route
                    path="/admin/user"
                    element={
                        <ProctectedRoute>
                            <ListUser />
                        </ProctectedRoute>
                    }
                />
                <Route
                    path="/admin/user/add-user"
                    element={
                        <ProctectedRoute>
                            <AddUser />
                        </ProctectedRoute>
                    }
                />
                <Route
                    path="/admin/user/updateUser/:userName"
                    element={
                        <ProctectedRoute>
                            <UpdateUser />
                        </ProctectedRoute>
                    }
                />

                <Route
                    path="/admin/course"
                    element={
                        <ProctectedRoute>
                            <ListCourse />
                        </ProctectedRoute>
                    }
                />
                <Route
                    path="/admin/course/add-course"
                    element={
                        <ProctectedRoute>
                            <AddCourse />
                        </ProctectedRoute>
                    }
                />
                <Route
                    path="/admin/course/update-course/:slug"
                    element={
                        <ProctectedRoute>
                            <UpdateCourse />
                        </ProctectedRoute>
                    }
                />

                <Route
                    path="/admin/lesson"
                    element={
                        <ProctectedRoute>
                            <ListLesson />
                        </ProctectedRoute>
                    }
                />
                <Route
                    path="/admin/lesson/add-lesson"
                    element={
                        <ProctectedRoute>
                            <AddLesson />
                        </ProctectedRoute>
                    }
                />
                <Route
                    path="/admin/lesson/update-lesson/:slug"
                    element={
                        <ProctectedRoute>
                            <UpdateLesson />
                        </ProctectedRoute>
                    }
                />

                <Route
                    path="/admin/quizze"
                    element={
                        <ProctectedRoute>
                            <ListQuizze />
                        </ProctectedRoute>
                    }
                />
                <Route
                    path="/admin/quizze/add-quizze"
                    element={
                        <ProctectedRoute>
                            <AddQuizze />
                        </ProctectedRoute>
                    }
                />
                <Route
                    path="/admin/quizze/update-quizze/:slug"
                    element={
                        <ProctectedRoute>
                            <UpdateQuizze />
                        </ProctectedRoute>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
