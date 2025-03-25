/**
 * 摄影作品数据
 * 
 * 这个文件包含网站中使用的摄影作品的结构化数据。
 * 每个照片包含标题、位置、日期、分类等信息。
 */

const photos = [
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

export default photos; 