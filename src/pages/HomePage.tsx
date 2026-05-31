import { Link } from 'react-router-dom';
import { useState } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/catalog/ProductCard';
import ProductModal from '@/components/catalog/ProductModal';
import type { Product } from '@/data/products';
import Icon from '@/components/ui/icon';

const categories = [
  { key: 'molds', label: 'Молды', icon: '⬡', desc: 'Силиконовые формы для сакральных символов', href: '/catalog?category=molds' },
  { key: 'candles', label: 'Свечи', icon: '🕯', desc: 'Ритуальные свечи с магическими травами', href: '/catalog?category=candles' },
  { key: 'tarot', label: 'Таро', icon: '✦', desc: 'Редкие колоды для глубинного гадания', href: '/catalog?category=tarot' },
  { key: 'runes', label: 'Руны', icon: 'ᚱ', desc: 'Резные руны из натуральных камней', href: '/catalog?category=runes' },
];

const featured = products.filter(p => p.isBestseller || p.isNew).slice(0, 4);

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mystic-bg">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/3 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-mist/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Top ornament */}
          <div className="flex justify-center mb-8">
            <div className="ornament w-48">
              <span className="text-gold/60 text-sm animate-flicker">✦ ✦ ✦</span>
            </div>
          </div>

          <p className="font-cinzel text-xs tracking-[0.4em] text-gold/70 uppercase mb-4">
            Магический Магазин
          </p>

          <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none">
            <span className="gold-gradient">OBSCURA</span>
          </h1>

          <p className="font-cormorant text-xl md:text-2xl text-muted-foreground italic max-w-xl mx-auto mb-4 leading-relaxed">
            Инструменты для тех, кто слышит зов древних тайн
          </p>

          <p className="font-cormorant text-base text-muted-foreground/70 max-w-lg mx-auto mb-12">
            Редкие молды, ритуальные свечи, карты таро и руны — каждый предмет создан с намерением и наполнен энергией.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/catalog"
              className="px-10 py-3.5 bg-gold text-primary-foreground font-cinzel text-xs tracking-widest uppercase hover:bg-gold-light transition-colors"
            >
              Открыть каталог
            </Link>
            <Link
              to="/courses"
              className="px-10 py-3.5 border border-gold/40 text-gold font-cinzel text-xs tracking-widest uppercase hover:border-gold hover:bg-gold/5 transition-colors"
            >
              Наши курсы
            </Link>
          </div>

          {/* Bottom ornament */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
            <Icon name="ChevronDown" size={20} className="text-gold/40" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase mb-3">Что вы ищете</p>
          <h2 className="font-cinzel text-3xl md:text-4xl text-foreground">Категории</h2>
          <div className="ornament mt-4 max-w-xs mx-auto">
            <span className="text-gold/40 text-xs">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.key}
              to={cat.href}
              className="gothic-border bg-card p-6 text-center card-hover group"
            >
              <div className="text-4xl mb-3 text-gold/60 group-hover:text-gold transition-colors">{cat.icon}</div>
              <h3 className="font-cinzel text-sm tracking-widest uppercase text-foreground mb-2">{cat.label}</h3>
              <p className="text-muted-foreground text-xs font-cormorant">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* About strip */}
      <section className="py-16 bg-card border-y border-gold/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: 'Gem', title: 'Только оригинальное', text: 'Все предметы создаются вручную мастерами с многолетним опытом магической практики' },
              { icon: 'Sparkles', title: 'Энергетика', text: 'Каждый предмет проходит ритуал очищения и зарядки перед отправкой покупателю' },
              { icon: 'Package', title: 'Бережная упаковка', text: 'Магические предметы упакованы в защитную ткань и отправляются с намерением' },
            ].map(item => (
              <div key={item.title} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center">
                  <Icon name={item.icon} size={20} className="text-gold" />
                </div>
                <h3 className="font-cinzel text-sm tracking-widest uppercase text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-cormorant leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase mb-3">Избранное</p>
          <h2 className="font-cinzel text-3xl md:text-4xl text-foreground">Хиты & Новинки</h2>
          <div className="ornament mt-4 max-w-xs mx-auto">
            <span className="text-gold/40 text-xs">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 px-10 py-3.5 border border-gold/40 text-gold font-cinzel text-xs tracking-widest uppercase hover:border-gold hover:bg-gold/5 transition-colors"
          >
            Смотреть весь каталог
            <Icon name="ArrowRight" size={14} />
          </Link>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 bg-card border-y border-gold/20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <span className="text-gold/40 text-3xl block mb-6">❝</span>
          <p className="font-cormorant text-xl md:text-2xl italic text-foreground/80 leading-relaxed mb-6">
            Магия — это искусство изменять мир в соответствии со своей волей. Правильные инструменты усиливают намерение.
          </p>
          <div className="ornament max-w-xs mx-auto">
            <span className="text-gold/40 text-xs font-cinzel tracking-widest">✦ Алистер Кроули ✦</span>
          </div>
        </div>
      </section>

      {/* CTA Courses */}
      <section className="py-20 container mx-auto px-4">
        <div className="gothic-border bg-card p-10 md:p-16 text-center mystic-bg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <p className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase mb-4">Знания</p>
          <h2 className="font-cinzel text-3xl md:text-4xl text-foreground mb-4">Курсы по магии</h2>
          <p className="font-cormorant text-lg text-muted-foreground max-w-lg mx-auto mb-8">
            Онлайн-курсы от практикующих ведьм и магов. От работы с рунами до составления индивидуальных ритуалов.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-10 py-3.5 bg-gold text-primary-foreground font-cinzel text-xs tracking-widest uppercase hover:bg-gold-light transition-colors"
          >
            Смотреть курсы
            <Icon name="ArrowRight" size={14} />
          </Link>
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}