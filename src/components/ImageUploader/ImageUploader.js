import classNames from 'classnames/bind'
import styles from './ImageUploader.module.scss'
import Button from '../Button/Button'
import { useState } from 'react'
import axios from 'axios'

const cx = classNames.bind(styles)

function ImageUploader() {
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState('')

    const handleChange = (e) => {
        setImage(e.target.files[0])
    }

    const handleUpload = async () => {
        if (!image) {
            alert('Please choose a image')
            return
        }

        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'elearning')
        data.append('cloud_name', 'dpfuhelee')

        const response = await axios.post('https://api.cloudinary.com/v1_1/dpfuhelee/image/upload', data)
        const url = response.data.secure_url
        setImageUrl(url)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(imageUrl)
    }

    return (
        <div className={cx('wrapper')}>
            <label className={cx('title')}>Upload image</label>
            <div className={cx('upload')}>
                <input type="file" onChange={(e) => handleChange(e)} />
                <Button add onClick={handleUpload}>
                    Get link
                </Button>
            </div>
            <div className={cx('copy')}>
                <input type="text" value={imageUrl} readOnly placeholder="Link goes here..." />
                <Button add onClick={handleCopy}>
                    Copy link
                </Button>
            </div>
        </div>
    )
}

export default ImageUploader
