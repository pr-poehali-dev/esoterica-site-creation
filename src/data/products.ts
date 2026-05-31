export type ProductCategory = 'molds' | 'candles' | 'tarot' | 'runes';
export type EnergyType = 'protection' | 'love' | 'prosperity' | 'healing' | 'divination' | 'cleansing' | 'power';
export type PurposeType = 'ritual' | 'meditation' | 'decoration' | 'gift' | 'practice';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  oldPrice?: number;
  image: string;
  energyTypes: EnergyType[];
  purposes: PurposeType[];
  shortDesc: string;
  energyDesc: string;
  properties: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const products: Product[] = [
  // Добавьте свои товары здесь. Пример:
  // {
  //   id: '1',
  //   name: 'Название товара',
  //   category: 'molds',        // molds | candles | tarot | runes
  //   price: 1000,
  //   image: '',
  //   energyTypes: ['protection'], // protection | love | prosperity | healing | divination | cleansing | power
  //   purposes: ['ritual'],        // ritual | meditation | decoration | gift | practice
  //   shortDesc: 'Краткое описание',
  //   energyDesc: 'Описание энергетических свойств',
  //   properties: ['Свойство 1', 'Свойство 2'],
  //   inStock: true,
  //   isNew: true,
  //   isBestseller: false,
  // },
];

export const categoryLabels: Record<ProductCategory, string> = {
  molds: 'Молды',
  candles: 'Свечи',
  tarot: 'Таро',
  runes: 'Руны',
};

export const energyLabels: Record<EnergyType, string> = {
  protection: 'Защита',
  love: 'Любовь',
  prosperity: 'Изобилие',
  healing: 'Исцеление',
  divination: 'Предсказание',
  cleansing: 'Очищение',
  power: 'Сила',
};

export const purposeLabels: Record<PurposeType, string> = {
  ritual: 'Ритуал',
  meditation: 'Медитация',
  decoration: 'Декор',
  gift: 'Подарок',
  practice: 'Практика',
};
