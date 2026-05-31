import { useState } from 'react';
import Icon from '@/components/ui/icon';

const posts = [
  {
    id: 1,
    tag: 'Руны',
    title: 'Руна Альгиз: символ защиты и связи с высшими силами',
    excerpt: 'Альгиз — одна из самых мощных защитных рун Elder Futhark. Её форма напоминает раскрытую ладонь или след лосиного рога, что символизирует защиту через связь с высшими планами.',
    date: '15 ноября 2024',
    readTime: '5 мин',
    image: '',
  },
  {
    id: 2,
    tag: 'Свечи',
    title: 'Магия свечей: как выбрать цвет для вашего намерения',
    excerpt: 'Каждый цвет свечи несёт определённую вибрацию и соответствует конкретным магическим целям. Правильный выбор цвета — это половина успеха вашего ритуала.',
    date: '3 ноября 2024',
    readTime: '7 мин',
    image: '',
  },
  {
    id: 3,
    tag: 'Таро',
    title: 'Расклад «Кельтский крест»: полное руководство для начинающих',
    excerpt: 'Один из самых подробных и информативных раскладов таро. Состоит из 10 карт и даёт полную картину ситуации — от корней проблемы до возможного исхода.',
    date: '20 октября 2024',
    readTime: '12 мин',
    image: '',
  },
  {
    id: 4,
    tag: 'Молды',
    title: 'Как использовать молды для создания магических талисманов',
    excerpt: 'Подробное руководство по работе с силиконовыми молдами — от подготовки материалов до зарядки готового изделия. Используем смолу, воск и гипс.',
    date: '8 октября 2024',
    readTime: '9 мин',
    image: '',
  },
  {
    id: 5,
    tag: 'Практика',
    title: 'Ритуал на новолуние: очищение и постановка намерений',
    excerpt: 'Новолуние — лучшее время для нового начала. Пошаговый ритуал с использованием чёрной свечи, кристаллов и рун для очищения пространства и программирования намерений.',
    date: '25 сентября 2024',
    readTime: '8 мин',
    image: '',
  },
  {
    id: 6,
    tag: 'Энергетика',
    title: 'Сакральная геометрия в быту: как работает Цветок Жизни',
    excerpt: 'Цветок Жизни — один из древнейших символов. Почему он встречается в архитектуре Египта, Индии и Китая, и как его энергетика влияет на пространство вашего дома.',
    date: '12 сентября 2024',
    readTime: '6 мин',
    image: '',
  },
];

const tags = ['Все', 'Руны', 'Свечи', 'Таро', 'Молды', 'Практика', 'Энергетика'];

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState('Все');
  const filtered = activeTag === 'Все' ? posts : posts.filter(p => p.tag === activeTag);

  return (
    <div className="min-h-screen pt-16">
      <div className="py-16 text-center mystic-bg border-b border-gold/20">
        <p className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase mb-3">Знания и практики</p>
        <h1 className="font-cinzel text-4xl md:text-5xl text-foreground">Блог</h1>
        <div className="ornament mt-4 max-w-xs mx-auto">
          <span className="text-gold/40 text-xs">✦</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-1.5 font-cinzel text-[10px] tracking-widest uppercase transition-colors ${
                activeTag === tag
                  ? 'bg-gold text-primary-foreground'
                  : 'border border-gold/30 text-muted-foreground hover:text-gold hover:border-gold/60'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(post => (
            <article key={post.id} className="gothic-border bg-card card-hover group cursor-pointer">
              {/* Image */}
              <div className="aspect-video bg-muted flex items-center justify-center mystic-bg relative overflow-hidden">
                <span className="text-gold/15 text-5xl">✦</span>
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 bg-gold text-primary-foreground font-cinzel text-[9px] tracking-widest uppercase">
                    {post.tag}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 mb-3 text-muted-foreground">
                  <span className="font-cormorant text-xs">{post.date}</span>
                  <span className="text-gold/30">·</span>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={11} />
                    <span className="font-cormorant text-xs">{post.readTime}</span>
                  </div>
                </div>

                <h3 className="font-cinzel text-sm text-foreground leading-snug mb-3 group-hover:text-gold transition-colors">
                  {post.title}
                </h3>
                <p className="font-cormorant text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center gap-1 text-gold/60 group-hover:text-gold transition-colors">
                  <span className="font-cinzel text-[10px] tracking-widest uppercase">Читать</span>
                  <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
