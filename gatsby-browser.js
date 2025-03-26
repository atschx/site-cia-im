/**
 * 引入全局样式
 */
import './src/styles/tailwind.css';

// 导入Prism主题
require("prismjs/themes/prism-solarizedlight.css")

// 检查并应用保存的主题
export const onClientEntry = () => {
    if (
        typeof window !== 'undefined' &&
        localStorage.getItem('theme') === 'dark'
    ) {
        document.documentElement.classList.add('dark');
    }
};