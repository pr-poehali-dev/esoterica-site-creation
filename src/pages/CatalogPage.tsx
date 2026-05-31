import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categoryLabels, energyLabels, purposeLabels } from '@/data/products';
import type { ProductCategory, EnergyType, PurposeType } from '@/data/products';
import ProductCard from '@/components/catalog/ProductCard';
import ProductModal from '@/components/catalog/ProductModal';
import type { Product } from '@/data/products';
import Icon from '@/components/ui/icon';

const allCategories = Object.keys(categoryLabels) as ProductCategory[];
const allEnergies = Object.keys(energyLabels) as EnergyType[];
const allPurposes = Object.keys(purposeLabels) as PurposeType[];

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const initCategory = searchParams.get('category') as ProductCategory | null;

  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(initCategory ? [initCategory] : []);
  const [selectedEnergies, setSelectedEnergies] = useState<EnergyType[]>([]);
  const [selectedPurposes, setSelectedPurposes] = useState<PurposeType[]>([]);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'new'>('default');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = <T,>(arr: T[], val: T, set: (v: T[]) => void) => {
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategories.length) result = result.filter(p => selectedCategories.includes(p.category));
    if (selectedEnergies.length) result = result.filter(p => p.energyTypes.some(e => selectedEnergies.includes(e)));
    if (selectedPurposes.length) result = result.filter(p => p.purposes.some(pu => selectedPurposes.includes(pu)));
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'new') result = result.filter(p => p.isNew).concat(result.filter(p => !p.isNew));
    return result;
  }, [selectedCategories, selectedEnergies, selectedPurposes, sortBy]);

  const activeFiltersCount = selectedCategories.length + selectedEnergies.length + selectedPurposes.length;

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedEnergies([]);
    setSelectedPurposes([]);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="py-16 text-center mystic-bg border-b border-gold/20">
        <p className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase mb-3">Магический магазин</p>
        <h1 className="font-cinzel text-4xl md:text-5xl text-foreground">Каталог</h1>
        <div className="ornament mt-4 max-w-xs mx-auto">
          <span className="text-gold/40 text-xs">✦</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-gold/30 text-muted-foreground hover:text-gold hover:border-gold/60 transition-colors font-cinzel text-xs tracking-widest uppercase"
            >
              <Icon name="SlidersHorizontal" size={14} />
              Фильтры
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 bg-gold text-primary-foreground text-[9px] rounded-full flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            {activeFiltersCount > 0 && (
              <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-gold font-cinzel tracking-wide transition-colors">
                Сбросить
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs font-cormorant">{filtered.length} товаров</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="bg-card border border-gold/20 text-muted-foreground text-xs font-cinzel tracking-wide px-3 py-2 focus:outline-none focus:border-gold/50"
            >
              <option value="default">По умолчанию</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
              <option value="new">Сначала новинки</option>
            </select>
          </div>
        </div>

        {/* Filters panel */}
        {filtersOpen && (
          <div className="gothic-border bg-card p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category */}
            <div>
              <h4 className="font-cinzel text-xs tracking-widest text-gold/70 uppercase mb-4">Тип товара</h4>
              <div className="space-y-2">
                {allCategories.map(cat => (
                  <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      onClick={() => toggle(selectedCategories, cat, setSelectedCategories)}
                      className={`w-4 h-4 border transition-colors flex items-center justify-center cursor-pointer ${
                        selectedCategories.includes(cat)
                          ? 'border-gold bg-gold'
                          : 'border-gold/30 group-hover:border-gold/60'
                      }`}
                    >
                      {selectedCategories.includes(cat) && <Icon name="Check" size={10} className="text-primary-foreground" />}
                    </div>
                    <span
                      onClick={() => toggle(selectedCategories, cat, setSelectedCategories)}
                      className="font-cormorant text-sm text-foreground cursor-pointer group-hover:text-gold transition-colors"
                    >
                      {categoryLabels[cat]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Energy */}
            <div>
              <h4 className="font-cinzel text-xs tracking-widest text-gold/70 uppercase mb-4">Энергетика</h4>
              <div className="space-y-2">
                {allEnergies.map(e => (
                  <label key={e} className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      onClick={() => toggle(selectedEnergies, e, setSelectedEnergies)}
                      className={`w-4 h-4 border transition-colors flex items-center justify-center cursor-pointer ${
                        selectedEnergies.includes(e)
                          ? 'border-gold bg-gold'
                          : 'border-gold/30 group-hover:border-gold/60'
                      }`}
                    >
                      {selectedEnergies.includes(e) && <Icon name="Check" size={10} className="text-primary-foreground" />}
                    </div>
                    <span
                      onClick={() => toggle(selectedEnergies, e, setSelectedEnergies)}
                      className="font-cormorant text-sm text-foreground cursor-pointer group-hover:text-gold transition-colors"
                    >
                      {energyLabels[e]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Purpose */}
            <div>
              <h4 className="font-cinzel text-xs tracking-widest text-gold/70 uppercase mb-4">Назначение</h4>
              <div className="space-y-2">
                {allPurposes.map(p => (
                  <label key={p} className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      onClick={() => toggle(selectedPurposes, p, setSelectedPurposes)}
                      className={`w-4 h-4 border transition-colors flex items-center justify-center cursor-pointer ${
                        selectedPurposes.includes(p)
                          ? 'border-gold bg-gold'
                          : 'border-gold/30 group-hover:border-gold/60'
                      }`}
                    >
                      {selectedPurposes.includes(p) && <Icon name="Check" size={10} className="text-primary-foreground" />}
                    </div>
                    <span
                      onClick={() => toggle(selectedPurposes, p, setSelectedPurposes)}
                      className="font-cormorant text-sm text-foreground cursor-pointer group-hover:text-gold transition-colors"
                    >
                      {purposeLabels[p]}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active filter chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategories.map(c => (
              <button
                key={c}
                onClick={() => toggle(selectedCategories, c, setSelectedCategories)}
                className="flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-[10px] font-cinzel tracking-wider uppercase hover:bg-gold/20 transition-colors"
              >
                {categoryLabels[c]}
                <Icon name="X" size={10} />
              </button>
            ))}
            {selectedEnergies.map(e => (
              <button
                key={e}
                onClick={() => toggle(selectedEnergies, e, setSelectedEnergies)}
                className="flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-[10px] font-cinzel tracking-wider uppercase hover:bg-gold/20 transition-colors"
              >
                {energyLabels[e]}
                <Icon name="X" size={10} />
              </button>
            ))}
            {selectedPurposes.map(p => (
              <button
                key={p}
                onClick={() => toggle(selectedPurposes, p, setSelectedPurposes)}
                className="flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-[10px] font-cinzel tracking-wider uppercase hover:bg-gold/20 transition-colors"
              >
                {purposeLabels[p]}
                <Icon name="X" size={10} />
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <span className="text-gold/20 text-5xl block mb-4">✦</span>
            <p className="font-cinzel text-sm text-muted-foreground tracking-widest">Ничего не найдено</p>
            <button onClick={clearFilters} className="mt-4 text-gold text-sm font-cormorant underline hover:text-gold-light">Сбросить фильтры</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
            ))}
          </div>
        )}
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
