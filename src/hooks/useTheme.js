import { useState, useEffect } from 'react';

/**
 * 主题管理hook
 * @returns {Object} 包含当前主题和切换主题的方法
 */
const useTheme = () => {
    // 如果支持window，则初始化为浏览器偏好，否则默认为'light'
    const [theme, setTheme] = useState('light');

    // 应用主题到DOM
    const applyTheme = (themeName) => {
        if (typeof document === 'undefined') return;
        
        if (themeName === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    useEffect(() => {
        // 组件挂载时，检查localStorage中是否有保存的主题
        const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;

        // 如果有保存的主题，使用保存的主题
        if (savedTheme) {
            setTheme(savedTheme);
            applyTheme(savedTheme);
        }
        // 如果没有保存的主题，检查系统偏好
        else if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            applyTheme('dark');
        }
    }, []);

    // 切换主题
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);

        // 保存到localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme);
        }

        // 应用主题
        applyTheme(newTheme);
    };

    return { theme, toggleTheme };
};

export default useTheme; 