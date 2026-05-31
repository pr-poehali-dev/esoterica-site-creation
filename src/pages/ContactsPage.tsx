import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="py-16 text-center mystic-bg border-b border-gold/20">
        <p className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase mb-3">Связь</p>
        <h1 className="font-cinzel text-4xl md:text-5xl text-foreground">Контакты</h1>
        <div className="ornament mt-4 max-w-xs mx-auto">
          <span className="text-gold/40 text-xs">✦</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Info */}
          <div>
            <h2 className="font-cinzel text-xl text-foreground mb-6">Как с нами связаться</h2>
            <div className="space-y-6">
              {[
                { icon: 'Mail', label: 'Электронная почта', value: 'obscura@magic.ru', sub: 'Ответим в течение 24 часов' },
                { icon: 'Phone', label: 'Телефон', value: '+7 (999) 000-00-00', sub: 'Пн–Пт, 10:00–19:00 МСК' },
                { icon: 'MessageCircle', label: 'Telegram', value: '@obscura_magic', sub: 'Быстрые ответы и поддержка' },
              ].map(item => (
                <div key={item.label} className="flex gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon as 'Mail'} size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-cinzel text-xs tracking-widest text-muted-foreground uppercase mb-0.5">{item.label}</p>
                    <p className="font-cormorant text-base text-foreground">{item.value}</p>
                    <p className="font-cormorant text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="font-cinzel text-xs tracking-widest text-gold/60 uppercase mb-4">Социальные сети</h3>
              <div className="flex gap-4">
                {['Instagram', 'Telegram', 'VK', 'YouTube'].map(s => (
                  <button key={s} className="px-3 py-1.5 border border-gold/20 text-muted-foreground hover:text-gold hover:border-gold/50 font-cinzel text-[9px] tracking-widest uppercase transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 gothic-border bg-card p-5">
              <div className="flex items-start gap-3">
                <span className="text-gold text-lg">✦</span>
                <div>
                  <p className="font-cinzel text-xs tracking-widest text-foreground uppercase mb-1">Условия доставки</p>
                  <p className="font-cormorant text-sm text-muted-foreground leading-relaxed">
                    Отправляем по всей России и СНГ. Срок обработки заказа — 1–2 рабочих дня. Каждый предмет упакован с намерением и защитными травами.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="font-cinzel text-xl text-foreground mb-6">Напишите нам</h2>
            {sent ? (
              <div className="gothic-border bg-card p-10 text-center">
                <span className="text-gold text-3xl block mb-4 animate-float">✦</span>
                <h3 className="font-cinzel text-lg text-foreground mb-2">Сообщение отправлено</h3>
                <p className="font-cormorant text-muted-foreground">Мы ответим вам в течение 24 часов</p>
                <button onClick={() => setSent(false)} className="mt-6 px-6 py-2 border border-gold/30 text-muted-foreground font-cinzel text-xs tracking-widest uppercase hover:text-gold hover:border-gold/60 transition-colors">
                  Написать ещё
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: 'name', label: 'Ваше имя', type: 'text', placeholder: 'Как к вам обращаться?' },
                  { name: 'email', label: 'Электронная почта', type: 'email', placeholder: 'your@email.com' },
                  { name: 'subject', label: 'Тема', type: 'text', placeholder: 'О чём хотите спросить?' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="block font-cinzel text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.name as keyof typeof form]}
                      onChange={e => setForm({ ...form, [field.name]: e.target.value })}
                      className="w-full bg-muted border border-gold/20 text-foreground font-cormorant text-sm px-4 py-2.5 focus:outline-none focus:border-gold/50 placeholder:text-muted-foreground/50"
                      required
                    />
                  </div>
                ))}

                <div>
                  <label className="block font-cinzel text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
                    Сообщение
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Ваш вопрос или пожелание..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-muted border border-gold/20 text-foreground font-cormorant text-sm px-4 py-2.5 focus:outline-none focus:border-gold/50 placeholder:text-muted-foreground/50 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gold text-primary-foreground font-cinzel text-xs tracking-widest uppercase hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
                >
                  <Icon name="Send" size={14} />
                  Отправить
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
