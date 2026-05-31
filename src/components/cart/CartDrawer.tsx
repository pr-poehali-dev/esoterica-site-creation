import { useCart } from '@/context/CartContext';
import Icon from '@/components/ui/icon';
import { categoryLabels } from '@/data/products';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md z-50 bg-card border-l border-gold/30 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold/20">
          <div>
            <h2 className="font-cinzel text-base tracking-widest text-foreground uppercase">Корзина</h2>
            <p className="text-muted-foreground text-sm font-cormorant mt-0.5">{totalItems} {declension(totalItems, ['предмет', 'предмета', 'предметов'])}</p>
          </div>
          <button onClick={closeCart} className="p-2 text-muted-foreground hover:text-gold transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Items */}
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
                {/* Placeholder image */}
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
                      >
                        −
                      </button>
                      <span className="text-sm font-cinzel w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 border border-gold/30 text-muted-foreground hover:text-gold hover:border-gold/60 transition-colors flex items-center justify-center text-xs"
                      >
                        +
                      </button>
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

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gold/20 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-cinzel text-sm tracking-widest text-muted-foreground uppercase">Итого</span>
              <span className="font-cinzel text-xl text-gold">{totalPrice.toLocaleString('ru')} ₽</span>
            </div>
            <button className="w-full py-3 bg-gold text-primary-foreground font-cinzel text-xs tracking-widest uppercase hover:bg-gold-light transition-colors">
              Оформить заказ
            </button>
            <button
              onClick={closeCart}
              className="w-full py-2 border border-gold/30 text-muted-foreground font-cinzel text-xs tracking-widest uppercase hover:border-gold/60 hover:text-gold transition-colors"
            >
              Продолжить покупки
            </button>
          </div>
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
