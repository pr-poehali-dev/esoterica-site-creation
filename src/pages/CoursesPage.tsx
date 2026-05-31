import Icon from '@/components/ui/icon';

const courses = [
  {
    id: 1,
    level: 'Начинающий',
    title: 'Основы работы с рунами',
    desc: 'Познакомьтесь с рунами Elder Futhark с нуля: история, значения 24 рун, техники создания рунических ставов, первые гадания и ритуалы.',
    duration: '4 недели',
    lessons: 12,
    price: 4900,
    features: ['12 видеоуроков', 'Рабочая тетрадь PDF', 'Чат с наставником', 'Сертификат'],
    color: 'border-gold/30',
  },
  {
    id: 2,
    level: 'Средний',
    title: 'Таро: от основ до мастерства',
    desc: 'Полный курс по системе таро: Major и Minor Arcana, техники расклада, медитации с картами, создание собственной системы интерпретаций.',
    duration: '6 недель',
    lessons: 24,
    price: 8900,
    oldPrice: 11900,
    features: ['24 видеоурока', 'Разборы раскладов', 'Еженедельные созвоны', 'Личная консультация', 'Сертификат'],
    color: 'border-gold/60',
    isBestseller: true,
  },
  {
    id: 3,
    level: 'Продвинутый',
    title: 'Магия свечей и ритуальная практика',
    desc: 'Глубокое погружение в ритуальную работу со свечами: создание авторских свечей, работа с лунным календарём, составление персональных ритуалов.',
    duration: '3 недели',
    lessons: 9,
    price: 3900,
    features: ['9 видеоуроков', 'Шаблоны ритуалов', 'Закрытый форум', 'Сертификат'],
    color: 'border-gold/30',
  },
  {
    id: 4,
    level: 'Все уровни',
    title: 'Сакральная геометрия в практике',
    desc: 'Узнайте, как работать с символами сакральной геометрии, создавать защитные мандалы, использовать молды для создания сильных талисманов.',
    duration: '2 недели',
    lessons: 8,
    price: 2900,
    features: ['8 видеоуроков', 'Практические задания', 'Чат участников'],
    color: 'border-gold/30',
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="py-16 text-center mystic-bg border-b border-gold/20">
        <p className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase mb-3">Обучение</p>
        <h1 className="font-cinzel text-4xl md:text-5xl text-foreground">Курсы</h1>
        <p className="font-cormorant text-lg text-muted-foreground mt-4 max-w-lg mx-auto">
          Обучение от практикующих мастеров — в онлайн-формате, в своём темпе
        </p>
        <div className="ornament mt-4 max-w-xs mx-auto">
          <span className="text-gold/40 text-xs">✦</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[['300+', 'выпускников'], ['4', 'курса'], ['4.9★', 'средняя оценка'], ['Всегда', 'доступ к материалам']].map(([val, label]) => (
            <div key={label} className="gothic-border bg-card p-5 text-center">
              <p className="font-cinzel text-2xl text-gold mb-1">{val}</p>
              <p className="font-cormorant text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map(course => (
            <div key={course.id} className={`gothic-border bg-card p-8 card-hover relative ${course.color}`}>
              {course.isBestseller && (
                <div className="absolute top-0 right-6 -translate-y-1/2">
                  <span className="px-3 py-1 bg-gold text-primary-foreground font-cinzel text-[9px] tracking-widest uppercase">
                    Популярный
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-0.5 border border-gold/20 text-gold/60 font-cinzel text-[9px] tracking-widest uppercase">
                  {course.level}
                </span>
                <div className="flex items-center gap-3 text-muted-foreground text-xs font-cormorant">
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={12} />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="BookOpen" size={12} />
                    {course.lessons} уроков
                  </div>
                </div>
              </div>

              <h3 className="font-cinzel text-lg text-foreground mb-3">{course.title}</h3>
              <p className="font-cormorant text-sm text-muted-foreground leading-relaxed mb-5">{course.desc}</p>

              <ul className="space-y-1.5 mb-6">
                {course.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm font-cormorant text-foreground/80">
                    <span className="text-gold text-xs">✦</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-cinzel text-2xl text-gold">{course.price.toLocaleString('ru')} ₽</span>
                  {course.oldPrice && (
                    <span className="font-cormorant text-muted-foreground text-base line-through">{course.oldPrice.toLocaleString('ru')} ₽</span>
                  )}
                </div>
                <button className="px-6 py-2.5 bg-gold text-primary-foreground font-cinzel text-[10px] tracking-widest uppercase hover:bg-gold-light transition-colors">
                  Записаться
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-cinzel text-2xl text-foreground">Часто спрашивают</h2>
            <div className="ornament mt-3 max-w-xs mx-auto">
              <span className="text-gold/40 text-xs">✦</span>
            </div>
          </div>
          <div className="space-y-4">
            {[
              ['Нужен ли предыдущий опыт?', 'Нет. Курсы для начинающих рассчитаны на тех, кто только знакомится с темой. Для продвинутых курсов лучше иметь базовые знания.'],
              ['Как долго доступны материалы?', 'Доступ к материалам курса — бессрочный. Можно возвращаться к урокам в любое время.'],
              ['Есть ли живые занятия?', 'В некоторых курсах есть еженедельные групповые созвоны с куратором. Записи доступны после встречи.'],
            ].map(([q, a]) => (
              <div key={q} className="gothic-border bg-card p-5">
                <h4 className="font-cinzel text-sm text-foreground mb-2">{q}</h4>
                <p className="font-cormorant text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
