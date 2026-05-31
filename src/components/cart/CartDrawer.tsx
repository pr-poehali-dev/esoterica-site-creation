import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Icon from '@/components/ui/icon';
import { categoryLabels } from '@/data/products';
import { useYookassa, openPaymentPage } from '@/components/extensions/yookassa/useYookassa';
import func2url from '../../../func2url.json';

type Step = 'cart' | 'checkout';

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const [step, setStep] = useState<Step>('cart');
  const [form, setForm] = useState<CheckoutForm>({ name: '', email: '', phone: '' });
  const [formError, setFormError] = useState('');

  const apiUrl = (func2url as Record<string, string>)['yookassa-yookassa'] ?? '';
  const returnUrl = `${window.location.origin}/order-success`;

  const { createPayment, isLoading } = useYookassa({
    apiUrl,
    onError: () => setFormError('Ошибка при создании платежа. Попробуйте ещё раз.'),
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!form.email.includes('@')) {
      setFormError('Введите корректный email');
      return;
    }

    const cartItems = items.map(i => ({
      id: i.product.id,
      name: i.product.name,
      price: i.product.price,
      quantity: i.quantity,
    }));

    const response = await createPayment({
      amount: totalPrice,
      userEmail: form.email,
      userName: form.name,
      userPhone: form.phone,
      returnUrl,
      cartItems,
    });

    if (response?.payment_url) {
      clearCart();
      closeCart();
      openPaymentPage(response.payment_url);
    }
  };

  const handleClose = () => {
    closeCart();
    setTimeout(() => setStep('cart'), 300);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={handleClose} />
      )}

      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md z-50 bg-card border-l border-gold/30 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold/20">
          <div className="flex items-center gap-3">
            {step === 'checkout' && (
              <button onClick={() => setStep('cart')} className="p-1 text-muted-foreground hover:text-gold transition-colors">
                <Icon name="ArrowLeft" size={16} />
              </button>
            )}
            <div>
              <h2 className="font-cinzel text-base tracking-widest text-foreground uppercase">
                {step === 'cart' ? 'Корзина' : 'Оформление'}
              </h2>
              {step === 'cart' && (
                <p className="text-muted-foreground text-sm font-cormorant mt-0.5">
                  {totalItems} {declension(totalItems, ['предмет', 'предмета', 'предметов'])}
                </p>
              )}
            </div>
          </div>
          <button onClick={handleClose} className="p-2 text-muted-foreground hover:text-gold transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Cart step */}
        {step === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto scrollbar-thin py-4 px-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <span className="text-4xl text-gold/30">✦</span>
                  <p className="font-cinzel text-sm text-muted-foreground tracking-widest">Корзина пуста</p>
                  <p className="text-muted-foreground text-sm font-cormorant">Добавьте магические инструменты из каталога</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.product.id} className="flex gap-4 p-3 gothic-border">
                    <div className="w-16 h-16 bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-gold/40 text-xl">✦</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-cinzel text-xs tracking-wide text-foreground leading-tight">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground font-cormorant mt-0.5">{categoryLabels[item.product.category]}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 border border-gold/30 text-muted-foreground hover:text-gold hover:border-gold/60 transition-colors flex items-center justify-center text-xs"
                          >−</button>
                          <span className="text-sm font-cinzel w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 border border-gold/30 text-muted-foreground hover:text-gold hover:border-gold/60 transition-colors flex items-center justify-center text-xs"
                          >+</button>
                        </div>
                        <span className="text-gold font-cinzel text-sm">{(item.product.price * item.quantity).toLocaleString('ru')} ₽</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="self-start p-1 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-gold/20 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-sm tracking-widest text-muted-foreground uppercase">Итого</span>
                  <span className="font-cinzel text-xl text-gold">{totalPrice.toLocaleString('ru')} ₽</span>
                </div>
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full py-3 bg-gold text-primary-foreground font-cinzel text-xs tracking-widest uppercase hover:bg-gold-light transition-colors"
                >
                  Оформить заказ
                </button>
                <button
                  onClick={handleClose}
                  className="w-full py-2 border border-gold/30 text-muted-foreground font-cinzel text-xs tracking-widest uppercase hover:border-gold/60 hover:text-gold transition-colors"
                >
                  Продолжить покупки
                </button>
              </div>
            )}
          </>
        )}

        {/* Checkout step */}
        {step === 'checkout' && (
          <form onSubmit={handleCheckout} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-5 space-y-5">

              {/* Order summary */}
              <div className="gothic-border p-4 space-y-2">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="font-cormorant text-foreground/80 truncate pr-2">{item.product.name} × {item.quantity}</span>
                    <span className="font-cinzel text-gold flex-shrink-0">{(item.product.price * item.quantity).toLocaleString('ru')} ₽</span>
                  </div>
                ))}
                <div className="border-t border-gold/20 pt-2 flex justify-between">
                  <span className="font-cinzel text-xs tracking-widest text-muted-foreground uppercase">Итого</span>
                  <span className="font-cinzel text-gold">{totalPrice.toLocaleString('ru')} ₽</span>
                </div>
              </div>

              {/* Fields */}
              {[
                { name: 'name', label: 'Имя', type: 'text', placeholder: 'Ваше имя', required: false },
                { name: 'email', label: 'Email *', type: 'email', placeholder: 'для подтверждения заказа', required: true },
                { name: 'phone', label: 'Телефон', type: 'tel', placeholder: '+7 (999) 000-00-00', required: false },
              ].map(field => (
                <div key={field.name}>
                  <label className="block font-cinzel text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={form[field.name as keyof CheckoutForm]}
                    onChange={e => setForm({ ...form, [field.name]: e.target.value })}
                    className="w-full bg-muted border border-gold/20 text-foreground font-cormorant text-sm px-4 py-2.5 focus:outline-none focus:border-gold/50 placeholder:text-muted-foreground/40"
                  />
                </div>
              ))}

              {formError && (
                <p className="text-destructive text-xs font-cormorant">{formError}</p>
              )}

              {/* Payment methods */}
              <div>
                <p className="font-cinzel text-[10px] tracking-widest text-muted-foreground uppercase mb-3">Способы оплаты</p>
                <div className="flex flex-wrap gap-2">
                  {['Карта', 'СБП', 'Сбербанк', 'Т-Банк', 'ЮMoney'].map(m => (
                    <span key={m} className="px-2.5 py-1 border border-gold/20 text-muted-foreground font-cinzel text-[9px] tracking-wider uppercase">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gold/20 p-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gold text-primary-foreground font-cinzel text-xs tracking-widest uppercase hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={14} className="animate-spin" />
                    Создаём заказ...
                  </>
                ) : (
                  <>
                    <Icon name="Lock" size={14} />
                    Перейти к оплате — {totalPrice.toLocaleString('ru')} ₽
                  </>
                )}
              </button>
              <p className="text-center text-xs text-muted-foreground font-cormorant mt-3">
                Защищённая оплата через ЮKassa
              </p>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

function declension(n: number, forms: [string, string, string]) {
  const abs = Math.abs(n) % 100;
  const n1 = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
}
