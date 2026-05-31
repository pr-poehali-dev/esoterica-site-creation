import { Product, categoryLabels, energyLabels, purposeLabels } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Icon from '@/components/ui/icon';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem } = useCart();

  if (!product) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-4 md:inset-10 lg:inset-20 z-50 bg-card border border-gold/30 overflow-y-auto scrollbar-thin">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-muted-foreground hover:text-gold transition-colors"
        >
          <Icon name="X" size={20} />
        </button>

        <div className="grid md:grid-cols-2 h-full">
          {/* Image */}
          <div className="aspect-square md:aspect-auto bg-muted min-h-64 flex items-center justify-center mystic-bg">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gold/15 text-8xl animate-float">✦</span>
            )}
          </div>

          {/* Details */}
          <div className="p-8 md:p-10 flex flex-col">
            <p className="text-muted-foreground text-[10px] font-cinzel tracking-widest uppercase mb-2">
              {categoryLabels[product.category]}
            </p>
            <h2 className="font-cinzel text-xl md:text-2xl text-foreground mb-2 leading-tight">{product.name}</h2>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-cinzel text-2xl text-gold">{product.price.toLocaleString('ru')} ₽</span>
              {product.oldPrice && (
                <span className="font-cormorant text-muted-foreground text-lg line-through">{product.oldPrice.toLocaleString('ru')} ₽</span>
              )}
            </div>

            <div className="ornament mb-6">
              <span className="text-gold/40 text-xs font-cinzel tracking-widest">✦ Энергетика ✦</span>
            </div>

            {/* Energy desc */}
            <p className="text-foreground font-cormorant text-base leading-relaxed mb-6">{product.energyDesc}</p>

            {/* Properties */}
            <div className="mb-6">
              <h4 className="font-cinzel text-xs tracking-widest text-muted-foreground uppercase mb-3">Свойства</h4>
              <ul className="space-y-1.5">
                {product.properties.map(p => (
                  <li key={p} className="flex items-center gap-2 text-sm font-cormorant text-foreground">
                    <span className="text-gold text-xs">✦</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {product.energyTypes.map(e => (
                <span key={e} className="px-2 py-1 border border-gold/30 text-gold/80 text-[10px] font-cinzel tracking-wider uppercase">
                  {energyLabels[e]}
                </span>
              ))}
              {product.purposes.map(p => (
                <span key={p} className="px-2 py-1 border border-border text-muted-foreground text-[10px] font-cinzel tracking-wider uppercase">
                  {purposeLabels[p]}
                </span>
              ))}
            </div>

            <div className="mt-auto space-y-3">
              <button
                onClick={() => { addItem(product); onClose(); }}
                className="w-full py-3.5 bg-gold text-primary-foreground font-cinzel text-xs tracking-widest uppercase hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="ShoppingBag" size={14} />
                Добавить в корзину
              </button>
              <p className="text-center text-xs text-muted-foreground font-cormorant">
                {product.inStock ? '✦ В наличии — отправка 1–3 дня' : 'Нет в наличии'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
