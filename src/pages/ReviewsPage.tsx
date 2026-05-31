const reviews = [
  { id: 1, name: 'Марина В.', date: 'Ноябрь 2024', rating: 5, product: 'Таро «Ночной Лес»', text: 'Колода просто невероятная. Образы очень живые, карты сразу заговорили со мной. Энергетика сильная и чистая. Упаковка была идеальной — ткань, бумага с травами. Буду заказывать ещё.', avatar: 'М' },
  { id: 2, name: 'Александра К.', date: 'Октябрь 2024', rating: 5, product: 'Свеча «Чёрная Луна»', text: 'Заказывала для очищения после переезда. Эффект почувствовала сразу — в квартире стало легче дышать в буквальном смысле. Аромат мускуса очень глубокий, не навязчивый. Жгла три дня подряд.', avatar: 'А' },
  { id: 3, name: 'Елена Р.', date: 'Октябрь 2024', rating: 5, product: 'Руны «Elder Futhark»', text: 'Руны из лавового камня — это что-то особенное. Они тёплые на ощупь даже без нагрева. Мешочек удобный, инструкция понятная. Ответы получаю очень точные. Спасибо мастеру!', avatar: 'Е' },
  { id: 4, name: 'Ольга Т.', date: 'Сентябрь 2024', rating: 5, product: 'Молд «Луна и Звёзды»', text: 'Отлила целую серию украшений и декора. Молд сделан качественно — детали чёткие, ничего не размазывается. Уже продала несколько изделий на ярмарке. Всем советую!', avatar: 'О' },
  { id: 5, name: 'Дарья М.', date: 'Сентябрь 2024', rating: 5, product: 'Таро «Тёмный Храм»', text: 'Колода пришла с золотыми краями — это просто произведение искусства. Эстетика готических соборов в каждой карте. Для чтений подходит идеально, особенно для теневой работы.', avatar: 'Д' },
  { id: 6, name: 'Наталья С.', date: 'Август 2024', rating: 4, product: 'Свеча «Золотое Изобилие»', text: 'Использовала на растущую луну для денежного ритуала. Аромат корицы чудесный. Ждать результатов пришлось около месяца, но они пришли. Буду заказывать ещё раз с бо́льшим намерением.', avatar: 'Н' },
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="py-16 text-center mystic-bg border-b border-gold/20">
        <p className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase mb-3">Голоса практиков</p>
        <h1 className="font-cinzel text-4xl md:text-5xl text-foreground">Отзывы</h1>
        <div className="ornament mt-4 max-w-xs mx-auto">
          <span className="text-gold/40 text-xs">✦</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-16 max-w-2xl mx-auto text-center">
          {[['98%', 'довольных покупателей'], ['500+', 'отзывов'], ['4.9', 'средняя оценка']].map(([val, label]) => (
            <div key={label} className="gothic-border bg-card p-6">
              <p className="font-cinzel text-3xl text-gold mb-1">{val}</p>
              <p className="font-cormorant text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map(review => (
            <div key={review.id} className="gothic-border bg-card p-6 card-hover">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <span className="font-cinzel text-gold text-sm">{review.avatar}</span>
                </div>
                <div>
                  <p className="font-cinzel text-xs tracking-wide text-foreground">{review.name}</p>
                  <p className="font-cormorant text-xs text-muted-foreground">{review.date}</p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-gold text-xs">✦</span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-[10px] font-cinzel tracking-widest text-gold/60 uppercase mb-2">{review.product}</p>
              <p className="font-cormorant text-sm text-muted-foreground leading-relaxed italic">
                «{review.text}»
              </p>
            </div>
          ))}
        </div>

        {/* Leave review CTA */}
        <div className="mt-16 gothic-border bg-card p-10 text-center max-w-xl mx-auto">
          <p className="font-cinzel text-xs tracking-widest text-gold/60 uppercase mb-3">Поделитесь опытом</p>
          <h3 className="font-cinzel text-xl text-foreground mb-3">Оставьте отзыв</h3>
          <p className="font-cormorant text-muted-foreground mb-6">Ваш опыт помогает другим практикам найти нужные инструменты</p>
          <button className="px-8 py-3 bg-gold text-primary-foreground font-cinzel text-xs tracking-widest uppercase hover:bg-gold-light transition-colors">
            Написать отзыв
          </button>
        </div>
      </div>
    </div>
  );
}
