import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Heading, ShopButton } from '../components/ui';
import { allNotes, families, notesOf, products } from '../data';

const audiences = [
  { value: '', label: 'Everyone' },
  { value: 'women', label: 'For women' },
  { value: 'men', label: 'For men' },
];

const Select = ({ label, value, options, onChange }) => (
  <label className="block min-w-[11rem] flex-1 text-xs font-semibold uppercase tracking-[0.18em] sm:flex-none">
    {label}
    <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 block h-12 w-full border border-k-line bg-white px-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-k-night">
      <option value="">All</option>
      {options.map((option) => <option key={option}>{option}</option>)}
    </select>
  </label>
);

/** Filters live in the address, so the home page and menu can link straight to them. */
const Collection = () => {
  const [params, setParams] = useSearchParams();
  const audience = params.get('for') || '';
  const family = params.get('family') || '';
  const note = params.get('note') || '';

  const change = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const shown = products.filter((product) => (!audience || product.audience === audience)
    && (!family || product.family === family)
    && (!note || notesOf(product).includes(note)));

  const title = audience === 'women' ? 'Perfumes for women' : audience === 'men' ? 'Perfumes for men' : 'All perfumes';

  return (
    <>
      <section className="on-ink bg-k-night px-6 py-16 text-center text-white sm:py-24">
        <Heading as="h1" className="text-[clamp(1.6rem,4vw,3rem)]">{title}</Heading>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-white/75">Choose by person, aroma type or a single ingredient.</p>
      </section>

      <div className="shell flex flex-wrap items-end justify-between gap-6 border-b border-k-line py-8">
        <div role="group" aria-label="Who is it for" className="flex flex-wrap gap-2">
          {audiences.map((option) => (
            <button
              key={option.label}
              type="button"
              aria-pressed={audience === option.value}
              onClick={() => change('for', option.value)}
              className={`h-12 border px-5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
                audience === option.value ? 'border-k-night bg-k-night text-white' : 'border-k-line hover:border-k-night'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="flex w-full flex-wrap gap-4 sm:w-auto">
          <Select label="Aroma type" value={family} options={families} onChange={(value) => change('family', value)} />
          <Select label="Ingredient" value={note} options={allNotes} onChange={(value) => change('note', value)} />
        </div>
      </div>

      <section className="shell py-10 sm:py-14">
        <p role="status" className="text-sm text-k-smoke">{shown.length} {shown.length === 1 ? 'perfume' : 'perfumes'}</p>
        {shown.length ? (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((product) => (
              <li key={product.id}><ProductCard product={product} /></li>
            ))}
          </ul>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg">No perfume matches those choices together.</p>
            <ShopButton tone="outline" className="mt-6" onClick={() => setParams({}, { replace: true })}>Clear the filters</ShopButton>
          </div>
        )}
      </section>
    </>
  );
};

export default Collection;
