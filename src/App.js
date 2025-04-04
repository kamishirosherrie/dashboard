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
import AddChapter from './pages/Chapter/AddChapter'
import UpdateChapter from './pages/Chapter/UpdateChapter'
import ListChapter from './pages/Chapter/ListChapter'
import { routes } from './routes/route'

function App() {
    const { user } = useContext(AuthContext)
    return (
        <Router>
            <Routes>
                <Route path={routes.home} element={user ? <Navigate to={routes.listUser} /> : <Login />} />
                <Route path={routes.login} element={user ? <Navigate to={routes.listUser} /> : <Login />} />

                <Route path={routes.listUser} element={user ? <ListUser /> : <Navigate to="/login" />} />
                <Route path={routes.addUser} element={user ? <AddUser /> : <Navigate to="/login" />} />
                <Route path={`${routes.updateUser}/:userName`} element={user ? <UpdateUser /> : <Navigate to="/login" />} />

                <Route path={routes.listCourse} element={user ? <ListCourse /> : <Navigate to="/login" />} />
                <Route path={routes.addCourse} element={user ? <AddCourse /> : <Navigate to="/login" />} />
                <Route path={`${routes.updateCourse}/:slug`} element={user ? <UpdateCourse /> : <Navigate to="/login" />} />

                <Route path={routes.listChapter} element={user ? <ListChapter /> : <Navigate to="/login" />} />
                <Route path={routes.addChapter} element={user ? <AddChapter /> : <Navigate to="/login" />} />
                <Route path={`${routes.updateChapter}/:id`} element={user ? <UpdateChapter /> : <Navigate to="/login" />} />

                <Route path={routes.listLesson} element={user ? <ListLesson /> : <Navigate to="/login" />} />
                <Route path={routes.addLesson} element={user ? <AddLesson /> : <Navigate to="/login" />} />
                <Route path={`${routes.updateLesson}/:slug`} element={user ? <UpdateLesson /> : <Navigate to="/login" />} />

                <Route path={routes.listQuizze} element={user ? <ListQuizze /> : <Navigate to="/login" />} />
                <Route path={routes.addQuizze} element={user ? <AddQuizze /> : <Navigate to="/login" />} />
                <Route path={`${routes.updateQuizze}/:slug`} element={user ? <UpdateQuizze /> : <Navigate to="/login" />} />

                {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </Routes>
        </Router>
    )
}

export default App
