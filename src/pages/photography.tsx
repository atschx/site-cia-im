import * as React from 'react';
import Layout from '../components/layout';
import PhotoGrid from '../components/PhotoGrid';
import PhotoLightbox from '../components/photo-lightbox';
import CategoryFilter from '../components/common/CategoryFilter';
import LoadMore from '../components/common/LoadMore';
import photos from '../data/photos';
import categories from '../data/categories';
import { usePhotoFilter, usePagination, useLightbox } from '../hooks';
import { Photo } from '../types';
import { PHOTOGRAPHY_CONFIG } from '../config';

/**
 * 摄影作品页面
 * 展示摄影作品并支持分类、分页和灯箱查看
 */
const PhotographyPage: React.FC = () => {
  // 照片筛选Hook
  const { activeCategory, setActiveCategory, filteredPhotos } = usePhotoFilter(photos);

  // 分页加载Hook
  const { paginatedItems: displayedPhotos, hasMore, loadMore } = usePagination(
    filteredPhotos,
    PHOTOGRAPHY_CONFIG.pagination.initialPageSize,
    PHOTOGRAPHY_CONFIG.pagination.incrementSize
  );

  // 灯箱Hook
  const { isOpen, currentPhoto, open, close, next, prev } = useLightbox(filteredPhotos);

  // 处理照片点击
  const handlePhotoClick = (photo: Photo): void => {
    open(photo);
  };

  return (
    <Layout pageTitle="摄影作品" noProse={true}>
      <div className="w-full min-h-full">
        <header className="mb-8">
          {/* <h1 className="text-3xl font-light text-center mb-6">我的摄影作品</h1> */}

          {/* 分类筛选 */}
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </header>

        {/* 照片网格 */}
        <div className="mb-12">
          <PhotoGrid photos={displayedPhotos} onPhotoClick={handlePhotoClick} />
        </div>

        {/* 加载更多按钮 */}
        <div className="mb-8">
          <LoadMore hasMore={hasMore} onClick={loadMore} />
        </div>

        {/* 灯箱组件 */}
        {isOpen && currentPhoto && (
          <PhotoLightbox
            photo={currentPhoto}
            isOpen={isOpen}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </div>
    </Layout>
  );
};

export const Head = () => (
  <>
    <title>摄影作品 | Always-fat's Blog</title>
    <meta name="description" content="浏览我的摄影作品集，包括风景、人像、街拍等多种类型的摄影作品。" />
    <meta name="keywords" content="摄影, 风景摄影, 人像摄影, 街拍, photography" />
    <meta property="og:title" content="摄影作品 | Always-fat's Blog" />
    <meta property="og:description" content="浏览我的摄影作品集，包括风景、人像、街拍等多种类型的摄影作品。" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://cia.im/photography/" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="摄影作品 | Always-fat's Blog" />
    <meta name="twitter:description" content="浏览我的摄影作品集，包括风景、人像、街拍等多种类型的摄影作品。" />
  </>
);

export default PhotographyPage;
