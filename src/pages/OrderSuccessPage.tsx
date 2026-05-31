import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function OrderSuccessPage() {
  const [searchParams] = useSearchParams();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    // Пытаемся получить номер заказа из URL или localStorage
    const fromUrl = searchParams.get('order');
    if (fromUrl) {
      setOrderNumber(fromUrl);
      return;
    }
    try {
      const pending = localStorage.getItem('yookassa_pending_order');
      if (pending) {
        const data = JSON.parse(pending);
        setOrderNumber(data.order_number);
        localStorage.removeItem('yookassa_pending_order');
      }
    } catch {
      // ignore
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center mystic-bg">
      <div className="container mx-auto px-4 max-w-lg text-center">
        <div className="gothic-border bg-card p-12">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 border border-gold/40 flex items-center justify-center">
              <span className="text-gold text-4xl animate-float">✦</span>
            </div>
          </div>

          <h1 className="font-cinzel text-2xl text-foreground mb-3">Заказ принят</h1>

          {orderNumber && (
            <p className="font-cormorant text-muted-foreground mb-2">
              Номер заказа: <span className="text-gold font-cinzel">{orderNumber}</span>
            </p>
          )}

          <div className="ornament my-6 max-w-xs mx-auto">
            <span className="text-gold/40 text-xs">✦</span>
          </div>

          <p className="font-cormorant text-base text-foreground/80 leading-relaxed mb-3">
            Благодарим за покупку. Ваш заказ обрабатывается и будет отправлен в течение 1–2 рабочих дней.
          </p>
          <p className="font-cormorant text-sm text-muted-foreground leading-relaxed mb-8">
            Подтверждение и трек-номер придут на вашу почту. Каждый предмет упакован с намерением и защитными травами.
          </p>

          <div className="space-y-3">
            <Link
              to="/catalog"
              className="flex items-center justify-center gap-2 w-full py-3 bg-gold text-primary-foreground font-cinzel text-xs tracking-widest uppercase hover:bg-gold-light transition-colors"
            >
              <Icon name="ShoppingBag" size={14} />
              Продолжить покупки
            </Link>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 w-full py-2.5 border border-gold/30 text-muted-foreground font-cinzel text-xs tracking-widest uppercase hover:border-gold/60 hover:text-gold transition-colors"
            >
              На главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
