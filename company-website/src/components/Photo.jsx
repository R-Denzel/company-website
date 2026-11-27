/** Stock photograph with its credit, shown in its own colours. */
const Photo = ({ src, alt, credit, creditUrl, className = '' }) => (
  <figure data-clip className={`relative m-0 overflow-hidden rounded-xl bg-mist ${className}`}>
    <img src={src} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
    <figcaption className="on-ink absolute bottom-3 right-3 rounded-full bg-ink/80 px-3 py-1 text-xs text-paper">
      <a href={creditUrl} target="_blank" rel="noopener noreferrer" className="text-link">
        Photo: {credit} / Unsplash
      </a>
    </figcaption>
  </figure>
);

export default Photo;
