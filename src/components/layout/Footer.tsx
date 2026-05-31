import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-background mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gold">✦</span>
              <span className="font-cinzel text-lg tracking-widest gold-gradient font-semibold">OBSCURA</span>
              <span className="text-gold">✦</span>
            </div>
            <p className="text-muted-foreground text-sm font-cormorant leading-relaxed">
              Магический магазин редких инструментов для духовных практик. Каждый предмет создан с намерением.
            </p>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="font-cinzel text-xs tracking-widest text-gold uppercase mb-4">Каталог</h4>
            <ul className="space-y-2">
              {[['Молды', '/catalog?category=molds'], ['Свечи', '/catalog?category=candles'], ['Карты Таро', '/catalog?category=tarot'], ['Руны', '/catalog?category=runes']].map(([label, href]) => (
                <li key={href}>
                  <Link to={href} className="text-muted-foreground hover:text-gold text-sm transition-colors font-cormorant">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-cinzel text-xs tracking-widest text-gold uppercase mb-4">Магазин</h4>
            <ul className="space-y-2">
              {[['Курсы', '/courses'], ['Блог', '/blog'], ['Отзывы', '/reviews'], ['Контакты', '/contacts']].map(([label, href]) => (
                <li key={href}>
                  <Link to={href} className="text-muted-foreground hover:text-gold text-sm transition-colors font-cormorant">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-cinzel text-xs tracking-widest text-gold uppercase mb-4">Связь</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-cormorant">
              <li>obscura@magic.ru</li>
              <li>+7 (999) 000-00-00</li>
              <li className="pt-2">
                <div className="flex gap-3">
                  {['Instagram', 'Telegram', 'VK'].map(s => (
                    <span key={s} className="text-gold/60 hover:text-gold cursor-pointer transition-colors text-xs font-cinzel tracking-wider">{s}</span>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs font-cormorant tracking-wide">
            © 2024 OBSCURA. Все права защищены.
          </p>
          <div className="ornament w-32">
            <span className="text-gold/40 text-xs font-cinzel tracking-widest">✦</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
