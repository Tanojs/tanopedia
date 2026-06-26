export interface Product {
  id: string;
  name: string;
  category: 'design' | 'stream';
  desc: string;
  price: number;
  originalPrice: number;
  image: string;
  isHot?: boolean;
  isAuto?: boolean;
  isBest?: boolean;
  icon: string;
}
