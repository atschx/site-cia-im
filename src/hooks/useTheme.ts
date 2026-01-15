import { useState, useEffect } from 'react';
import { Theme, ThemeContextType } from '../types/theme';

/**
 * Theme management hook for dark/light mode switching
 * @returns Object containing current theme and theme toggle function
 */
const useTheme = (): ThemeContextType => {
    // Initialize with 'light' theme
    const [theme, setTheme] = useState<Theme>('light');

    /**
     * Apply theme to DOM by adding/removing 'dark' class
     */
    const applyTheme = (themeName: Theme): void => {
        if (typeof document === 'undefined') return;

        if (themeName === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    useEffect(() => {
        // Check localStorage for saved theme on mount
        const savedTheme = typeof window !== 'undefined'
            ? localStorage.getItem('theme') as Theme | null
            : null;

        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
            setTheme(savedTheme);
            applyTheme(savedTheme);
        }
        // If no saved theme, check system preference
        else if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            applyTheme('dark');
        }
    }, []);

    /**
     * Toggle between light and dark themes
     */
    const toggleTheme = (): void => {
        const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);

        // Save to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme);
        }

        // Apply theme to DOM
        applyTheme(newTheme);
    };

    return { theme, toggleTheme };
};

export default useTheme;
