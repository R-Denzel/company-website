import { Check } from 'lucide-react';
import { segments } from '../content/segments';

/** Three business categories, each explained beside the choice. */
const SegmentPicker = ({ value, onChange }) => (
  <div role="radiogroup" aria-label="Business size" className="grid gap-4 lg:grid-cols-3">
    {segments.map((segment) => {
      const isSelected = value === segment.id;
      return (
        <label
          key={segment.id}
          className={`flex cursor-pointer flex-col rounded-xl border p-6 transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-deep ${
            isSelected ? 'border-brand-deep bg-mist' : 'border-line hover:border-brand-deep'
          }`}
        >
          <input type="radio" name="segment" value={segment.id} checked={isSelected} onChange={() => onChange(segment.id)} className="sr-only" />
          <span className="flex items-start justify-between gap-4">
            <span className="text-subheading">{segment.name}</span>
            <span aria-hidden="true" className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${isSelected ? 'bg-brand text-ink' : 'bg-mist text-transparent'}`}>
              <Check className="h-4 w-4" />
            </span>
          </span>
          <span className="mt-1 text-sm text-muted">{segment.size}</span>
          <span className="mt-4 text-base leading-7">“{segment.voice}”</span>
          <span className="mt-4 text-sm leading-6 text-muted">{segment.profile}</span>
          <span className="mt-3 text-sm leading-6 text-muted"><span className="font-medium text-ink">Typical needs:</span> {segment.needs}</span>
        </label>
      );
    })}
  </div>
);

export default SegmentPicker;
