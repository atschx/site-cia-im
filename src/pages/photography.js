import * as React from 'react'
import { useState } from 'react'
import Layout from '../components/layout'
import PhotoGrid from '../components/PhotoGrid'
import PhotoLightbox from '../components/PhotoLightbox'
import { StaticImage } from 'gatsby-plugin-image'

// 创建默认图片组件以在PhotoGrid中使用
const DefaultImage = () => (
    <StaticImage
        src="../images/icon.png"
        alt="Default image"
        placeholder="blurred"
        layout="fullWidth"
    />
)

// 这里只是示例数据，实际应用中应该从GraphQL查询获取
const MOCK_CATEGORIES = [
    { id: 'all', name: '全部' },
    { id: 'landscape', name: '风景' },
    { id: 'portrait', name: '人像' },
    { id: 'street', name: '街拍' },
    { id: 'wildlife', name: '野生动物' },
]

// 由于StaticImage不能在map中使用，我们暂时将此页面修改为静态布局演示
const PhotographyPage = () => {
    // 状态：当前选中的分类
    const [activeCategory, setActiveCategory] = useState('all')
    // 状态：灯箱是否打开
    const [lightboxOpen, setLightboxOpen] = useState(false)

    return (
        <Layout pageTitle="摄影作品">
            <div className="w-full py-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-light text-center mb-6">我的摄影作品</h1>
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {MOCK_CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                className={`px-3 py-1 rounded-full transition-colors ${activeCategory === cat.id
                                    ? 'bg-link-blue text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </header>

                {/* 静态照片网格（演示用） */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <article className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group">
                        <div className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105">
                            <StaticImage
                                src="../images/icon.png"
                                alt="示例照片1"
                                placeholder="blurred"
                                className="w-full h-full"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-white text-lg font-medium">青海湖日落</h3>
                            <p className="text-gray-200 text-sm">青海省 · 2022-08-15</p>
                        </div>
                    </article>

                    <article className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group">
                        <div className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105">
                            <StaticImage
                                src="../images/icon.png"
                                alt="示例照片2"
                                placeholder="blurred"
                                className="w-full h-full"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-white text-lg font-medium">西藏纳木错</h3>
                            <p className="text-gray-200 text-sm">西藏自治区 · 2022-07-20</p>
                        </div>
                    </article>

                    <article className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group">
                        <div className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105">
                            <StaticImage
                                src="../images/icon.png"
                                alt="示例照片3"
                                placeholder="blurred"
                                className="w-full h-full"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-white text-lg font-medium">城市街头</h3>
                            <p className="text-gray-200 text-sm">上海 · 2022-06-10</p>
                        </div>
                    </article>
                </div>

                <footer className="mt-12 text-center">
                    <button className="px-6 py-2 bg-link-blue text-white rounded-full hover:bg-blue-700 transition-colors">
                        加载更多
                    </button>
                </footer>
            </div>
        </Layout>
    )
}

export default PhotographyPage