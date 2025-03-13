import className from "classnames/bind";
import styles from "./ListLesson.module.scss";
import { useEffect, useState } from "react";
import { getAllLesson } from "../../api/lessonApi";

const cx = className.bind(styles);

function ListLesson() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const getLesson = async () => {
      try {
        const response = await getAllLesson();
        setLessons(response.data.lessons);
        console.log("Lessons:", response.data.lessons);
      } catch (error) {
        console.log("Get all lesson failed: ", error);
      }
    };

    getLesson();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <h2>Danh sách bài học</h2>
      {lessons.map((lesson) => (
        <div key={lesson._id}>
          <p>{lesson.courseName}</p>
          <h3>{lesson.title}</h3>
          <p>{lesson.videoUrl}</p>
          <div dangerouslySetInnerHTML={{ __html: lesson.content }}></div>
        </div>
      ))}
    </div>
  );
}

export default ListLesson;
