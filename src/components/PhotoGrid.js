import * as React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

/**
 * 摄影作品展示网格组件
 * 
 * @param {Object} props
 * @param {Array} props.photos - 照片数组
 * @param {Function} props.onPhotoClick - 照片点击事件处理函数
 */
const PhotoGrid = ({ photos, onPhotoClick }) => {
    return (
        <div className="photo-grid">
            {photos.map((photo) => (
                <article
                    key={photo.id}
                    className="photo-card"
                    onClick={() => onPhotoClick && onPhotoClick(photo)}
                >
                    <GatsbyImage
                        image={getImage(photo.image)}
                        alt={photo.title}
                        className="photo-image"
                    />
                    <div className="photo-info">
                        <h3 className="photo-title">{photo.title}</h3>
                        <p className="photo-meta">{photo.location} · {photo.date}</p>
                    </div>
                </article>
            ))}
        </div>
    )
}

export default PhotoGrid 