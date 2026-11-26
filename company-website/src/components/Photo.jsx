/** Stock photograph in a parallax frame with its credit. */
const Photo = ({ src, alt, credit, creditUrl, className = '' }) => (
  <figure data-clip className={`relative m-0 overflow-hidden rounded-2xl bg-ink ${className}`}>
    <img data-parallax src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
    <figcaption className="on-ink absolute bottom-3 right-3 rounded-full bg-ink/75 px-3 py-1.5 text-xs text-paper">
      <a href={creditUrl} target="_blank" rel="noopener noreferrer" className="text-link">
        Photo: {credit} / Unsplash
      </a>
    </figcaption>
  </figure>
);

export default Photo;
