import { marketList } from '../content/markets';
import { setMarket, usePreferences } from '../lib/preferences';

const MarketSelector = ({ compact = false, tone = 'light', className = '' }) => {
  const { market } = usePreferences();
  const idle = tone === 'dark' ? 'text-paper hover:bg-ink-soft' : 'text-ink hover:bg-line';

  return (
    <div role="group" aria-label="Choose your market" className={`inline-flex rounded-full p-1 ${tone === 'dark' ? 'bg-ink-soft/60' : 'bg-mist'} ${className}`}>
      {marketList.map((option) => (
        <button
          key={option.code}
          type="button"
          aria-pressed={market === option.code}
          aria-label={`${option.name}, prices in ${option.currency}`}
          onClick={() => setMarket(option.code)}
          className={`h-9 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors duration-300 ${
            market === option.code ? 'bg-violet text-paper' : idle
          }`}
        >
          {compact ? option.code.toUpperCase() : `${option.name} (${option.currency})`}
        </button>
      ))}
    </div>
  );
};

export default MarketSelector;
