import React from 'react';

/**
 * 灯箱导航按钮组件 - 负责前后照片导航
 */
const LightboxNavigation = ({ withStopPropagation, onNext, onPrev }) => {
    return (
        <nav className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-5 z-10" aria-label="照片导航">
            <button
                className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70"
                onClick={withStopPropagation(onPrev)}
                aria-label="查看上一张照片"
            >
                <span aria-hidden="true">&#10094;</span>
            </button>

            <button
                className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70"
                onClick={withStopPropagation(onNext)}
                aria-label="查看下一张照片"
            >
                <span aria-hidden="true">&#10095;</span>
            </button>
        </nav>
    );
};

export default LightboxNavigation; 