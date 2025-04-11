import classNames from 'classnames/bind'
import styles from './ListChapter.module.scss'
import { useEffect, useState } from 'react'

import MainAccount from '../../layouts/MainAccount/MainAccount'
import Table from '../../components/Table/Table'
import ModalDelete from '../../components/ModalDelete/ModalDelete'
import Button from '../../components/Button/Button'
import { routes } from '../../routes/route'
import { deleteChapter, getChapters } from '../../api/chapterApi'

const cx = classNames.bind(styles)

function ListChapter() {
    const [chapters, setChapters] = useState([])
    const [chapterId, setchapterId] = useState({})
    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = (chapterId) => {
        setIsOpen(true)
        setchapterId(chapterId)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    const handleDeleteChapter = async (chapterId) => {
        try {
            await deleteChapter(chapterId)
            setIsOpen(false)
            setChapters(chapters.filter((course) => course._id !== chapterId))
        } catch (error) {
            console.log('Delete chapter failed: ', error)
        }
    }

    useEffect(() => {
        const getAllChapters = async () => {
            try {
                const response = await getChapters()
                setChapters(response.chapters)
            } catch (error) {
                console.log('Get course failed: ', error)
            }
        }

        getAllChapters()
    }, [])
    return (
        <MainAccount>
            <div className={cx('wrapper')}>
                <h1>Chapters</h1>
                {chapters.length === 0 ? (
                    <div className={cx('no-data')}>You haven't added any chapters yet.</div>
                ) : (
                    <Table headings={['Order', 'Chapter', 'Course']}>
                        {chapters.map((chapter, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{chapter.title}</td>
                                <td>{chapter.courseId?.title}</td>
                                <td>
                                    <Button editBtn href={`${routes.updateChapter}/${chapter._id}`}>
                                        Edit
                                    </Button>

                                    <Button deleteBtn onClick={() => handleDelete(chapter._id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                )}
            </div>
            <ModalDelete isOpen={isOpen} handleCancel={handleCancel} handleDelete={() => handleDeleteChapter(chapterId)} />
        </MainAccount>
    )
}

export default ListChapter
