import { Product, categoryLabels, energyLabels } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Icon from '@/components/ui/icon';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="gothic-border bg-card card-hover group cursor-pointer" onClick={onClick}>
      {/* Image */}
      <div className="aspect-square bg-muted relative overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center mystic-bg">
            <span className="text-gold/20 text-6xl animate-float">✦</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="px-2 py-0.5 bg-gold text-primary-foreground font-cinzel text-[9px] tracking-widest uppercase">
              Новинка
            </span>
          )}
          {product.isBestseller && (
            <span className="px-2 py-0.5 bg-purple-mist border border-gold/30 text-gold font-cinzel text-[9px] tracking-widest uppercase">
              Хит
            </span>
          )}
          {product.oldPrice && (
            <span className="px-2 py-0.5 bg-destructive text-destructive-foreground font-cinzel text-[9px] tracking-widest uppercase">
              −{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Quick add button */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={e => { e.stopPropagation(); addItem(product); }}
            className="w-full py-2.5 bg-gold/90 hover:bg-gold text-primary-foreground font-cinzel text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 transition-colors"
          >
            <Icon name="ShoppingBag" size={12} />
            В корзину
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-muted-foreground text-[10px] font-cinzel tracking-widest uppercase mb-1">
          {categoryLabels[product.category]}
        </p>
        <h3 className="font-cinzel text-sm text-foreground leading-tight mb-2">{product.name}</h3>
        <p className="text-muted-foreground text-xs font-cormorant line-clamp-2 mb-3">{product.shortDesc}</p>

        {/* Energy tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.energyTypes.slice(0, 2).map(e => (
            <span key={e} className="px-1.5 py-0.5 border border-gold/20 text-gold/70 text-[9px] font-cinzel tracking-wider uppercase">
              {energyLabels[e]}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-gold text-base">{product.price.toLocaleString('ru')} ₽</span>
            {product.oldPrice && (
              <span className="font-cormorant text-muted-foreground text-sm line-through">{product.oldPrice.toLocaleString('ru')} ₽</span>
            )}
          </div>
          <button
            onClick={e => { e.stopPropagation(); addItem(product); }}
            className="p-1.5 border border-gold/30 text-muted-foreground hover:text-gold hover:border-gold/60 transition-colors"
          >
            <Icon name="ShoppingBag" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
