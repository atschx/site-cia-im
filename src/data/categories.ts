/**
 * 摄影作品分类数据
 *
 * 这个文件包含网站中使用的摄影作品分类数据。
 * 每个分类包含ID和显示名称。
 */

import { Category } from '../types/category';

const categories: Category[] = [
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
  { id: '城市', name: '城市' },
];

export default categories;
