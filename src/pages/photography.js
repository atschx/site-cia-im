import * as React from 'react'
import { useState, useEffect } from 'react'
import Layout from '../components/layout'
import PhotoGrid from '../components/PhotoGrid'
import PhotoLightbox from '../components/photo-lightbox'

// 模拟照片数据
const ALL_MOCK_PHOTOS = [
    {
        id: 1,
        title: "日落时分",
        location: "青海湖",
        date: "2023年5月",
        categories: ["风景", "旅行"],
        camera: "Sony A7III",
        lens: "24-70mm f/2.8",
        aperture: "f/8",
        thumbnailSrc: "/images/placeholder-1.jpg", // 小图用于快速加载
        originalSrc: "/images/photographs/SUN_5872.jpg" // 原图用于灯箱展示
    },
    {
        id: 2,
        title: "峡谷雪景",
        location: "四川",
        date: "2023年1月",
        categories: ["风景", "旅行"],
        camera: "Canon EOS R5",
        lens: "16-35mm f/2.8",
        aperture: "f/11",
        thumbnailSrc: "/images/placeholder-2.jpg",
        originalSrc: "/images/photographs/DSC_4964.jpg"
    },
    {
        id: 3,
        title: "林间溪流",
        location: "浙江",
        date: "2023年4月",
        categories: ["风景", "自然"],
        camera: "Fujifilm X-T4",
        lens: "10-24mm f/4",
        aperture: "f/5.6",
        thumbnailSrc: "/images/placeholder-3.jpg",
        originalSrc: "/images/photographs/DSC_4927.jpg"
    },
    {
        id: 4,
        title: "山间小屋",
        location: "云南",
        date: "2023年7月",
        categories: ["建筑", "自然"],
        camera: "Nikon Z6 II",
        lens: "24-70mm f/4",
        aperture: "f/8",
        thumbnailSrc: "/images/placeholder-1.jpg",
        originalSrc: "/images/photographs/DSC_3681.jpg"
    },
    {
        id: 5,
        title: "城市天际线",
        location: "上海",
        date: "2023年6月",
        categories: ["城市", "建筑"],
        camera: "Canon EOS R5",
        lens: "16-35mm f/2.8",
        aperture: "f/11",
        src: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=800&h=600&q=80"
    },
    {
        id: 6,
        title: "森林小径",
        location: "莫干山",
        date: "2023年4月",
        categories: ["风景", "自然"],
        camera: "Fujifilm X-T4",
        lens: "10-24mm f/4",
        aperture: "f/5.6",
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&q=80"
    },
    {
        id: 7,
        title: "街头人像",
        location: "北京",
        date: "2023年7月",
        categories: ["人像", "街拍"],
        camera: "Nikon Z6 II",
        lens: "85mm f/1.8",
        aperture: "f/2.0",
        src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&q=80"
    },
    {
        id: 8,
        title: "雪山日出",
        location: "云南",
        date: "2023年1月",
        categories: ["风景", "旅行"],
        camera: "Sony A7III",
        lens: "16-35mm f/2.8",
        aperture: "f/11",
        src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=600&q=80"
    },
    {
        id: 9,
        title: "咖啡馆写真",
        location: "成都",
        date: "2023年8月",
        categories: ["人像", "生活"],
        camera: "Canon EOS R6",
        lens: "50mm f/1.2",
        aperture: "f/1.8",
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&q=80"
    },
    {
        id: 10,
        title: "古镇黄昏",
        location: "乌镇",
        date: "2023年9月",
        categories: ["风景", "文化"],
        camera: "Fujifilm X-T4",
        lens: "18-55mm f/2.8-4",
        aperture: "f/4.0",
        src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&q=80"
    },
    {
        id: 11,
        title: "花卉特写",
        location: "杭州",
        date: "2023年4月",
        categories: ["自然", "微距"],
        camera: "Sony A7R IV",
        lens: "90mm f/2.8 Macro",
        aperture: "f/5.6",
        src: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=800&h=600&q=80"
    },
    {
        id: 12,
        title: "现代建筑",
        location: "深圳",
        date: "2023年10月",
        categories: ["建筑", "城市"],
        camera: "Nikon Z7 II",
        lens: "14-30mm f/4",
        aperture: "f/8",
        src: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=600&q=80"
    }
];

// 分类数据
const CATEGORIES = [
    { id: 'all', name: '全部' },
    { id: '风景', name: '风景' },
    { id: '人像', name: '人像' },
    { id: '街拍', name: '街拍' },
    { id: '建筑', name: '建筑' },
    { id: '自然', name: '自然' },
    { id: '旅行', name: '旅行' },
    { id: '文化', name: '文化' },
    { id: '生活', name: '生活' },
    { id: '微距', name: '微距' },
    { id: '城市', name: '城市' }
];

const PhotographyPage = () => {
    // 状态：当前选中的分类
    const [activeCategory, setActiveCategory] = useState('all');

    // 灯箱状态
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    // 加载更多功能的状态
    const [visibleCount, setVisibleCount] = useState(6);
    const [filteredPhotos, setFilteredPhotos] = useState([]);

    // 根据选中的分类筛选照片
    useEffect(() => {
        if (activeCategory === 'all') {
            setFilteredPhotos(ALL_MOCK_PHOTOS);
        } else {
            const filtered = ALL_MOCK_PHOTOS.filter(photo =>
                photo.categories && photo.categories.includes(activeCategory)
            );
            setFilteredPhotos(filtered);
        }
        // 重置显示数量
        setVisibleCount(6);
    }, [activeCategory]);

    // 显示照片（限制数量）
    const displayedPhotos = filteredPhotos.slice(0, visibleCount);

    // 加载更多照片
    const loadMorePhotos = () => {
        setVisibleCount(prev => Math.min(prev + 3, filteredPhotos.length));
    };

    // 处理照片点击
    const handlePhotoClick = (photo, index) => {
        // 找到点击照片在筛选后的数组中的位置
        const realIndex = filteredPhotos.findIndex(p => p.id === photo.id);
        setCurrentPhotoIndex(realIndex >= 0 ? realIndex : 0);
        setLightboxOpen(true);
    };

    // 关闭灯箱
    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    // 查看上一张照片
    const prevPhoto = () => {
        setCurrentPhotoIndex((prevIndex) =>
            prevIndex === 0 ? filteredPhotos.length - 1 : prevIndex - 1
        );
    };

    // 查看下一张照片
    const nextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) =>
            prevIndex === filteredPhotos.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <Layout pageTitle="摄影作品">
            <div className="w-full py-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-light text-center mb-6">我的摄影作品</h1>
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                className={`px-3 py-1 rounded-full transition-colors ${activeCategory === cat.id
                                    ? 'bg-link-blue text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'}`}
                                onClick={() => setActiveCategory(cat.id)}
                                aria-pressed={activeCategory === cat.id}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </header>

                {/* 使用PhotoGrid组件展示照片 */}
                <PhotoGrid
                    photos={displayedPhotos}
                    onPhotoClick={handlePhotoClick}
                />

                {/* 显示加载更多按钮，仅当还有更多照片可加载时 */}
                {visibleCount < filteredPhotos.length && (
                    <footer className="mt-12 text-center">
                        <button
                            className="px-6 py-2 bg-link-blue text-white rounded-full hover:bg-blue-700 transition-colors"
                            onClick={loadMorePhotos}
                        >
                            加载更多
                        </button>
                    </footer>
                )}

                {/* 没有匹配的照片时显示提示 */}
                {filteredPhotos.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">该分类下暂无照片</p>
                    </div>
                )}

                {/* 灯箱组件 */}
                {filteredPhotos.length > 0 && (
                    <PhotoLightbox
                        photo={filteredPhotos[currentPhotoIndex]}
                        isOpen={lightboxOpen}
                        onClose={closeLightbox}
                        onNext={nextPhoto}
                        onPrev={prevPhoto}
                    />
                )}
            </div>
        </Layout>
    );
};

export default PhotographyPage;