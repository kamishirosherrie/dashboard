import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddLesson from "./pages/Lesson/AddLesson";
import ListLesson from "./pages/Lesson/ListLesson";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/lesson/add-lesson" element={<AddLesson />} />
        <Route path="/admin/lesson" element={<ListLesson />} />
      </Routes>
    </Router>
  );
}

export default App;
