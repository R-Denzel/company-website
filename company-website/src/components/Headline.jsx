/** Headline text with its closing two words picked out in the logo's blue. */
const Headline = ({ text }) => {
  const words = text.split(' ');
  // A name or a very short title stays one colour.
  if (words.length < 3) return text;

  return (
    <>
      {words.slice(0, -2).join(' ')}{' '}
      <span className="headline-accent">{words.slice(-2).join(' ')}</span>
    </>
  );
};

export default Headline;
