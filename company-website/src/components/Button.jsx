import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const variants = {
  primary: { body: 'bg-ink text-paper hover:bg-violet-deep', dot: 'bg-gradient-to-br from-violet-soft to-coral-soft text-ink' },
  secondary: { body: 'bg-mist text-ink hover:bg-line', dot: 'bg-violet text-paper' },
  light: { body: 'bg-paper text-ink hover:bg-mist', dot: 'bg-violet text-paper' },
  ghost: { body: 'bg-transparent text-ink hover:bg-mist', dot: 'bg-mist text-ink' },
  glass: { body: 'bg-paper/15 text-paper hover:bg-paper/25', dot: 'bg-paper text-ink' },
};

const sizes = {
  md: { body: 'h-11 text-sm', text: 'px-5', arrow: 'pl-5 pr-1.5', dot: 'h-8 w-8' },
  lg: { body: 'h-14 text-base', text: 'px-7', arrow: 'pl-7 pr-2', dot: 'h-10 w-10' },
};

/** Pill button. Renders a router link with `to`, an external link with `href`, otherwise a button. */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  arrow = true,
  icon = ArrowRight,
  className = '',
  to,
  href,
  type = 'button',
  ...props
}) => {
  const Icon = icon;
  const tone = variants[variant];
  const scale = sizes[size];
  const classes = `group inline-flex shrink-0 items-center justify-center gap-4 whitespace-nowrap rounded-full font-medium transition-colors duration-300 ease-soft disabled:cursor-not-allowed disabled:opacity-40 ${tone.body} ${scale.body} ${arrow ? scale.arrow : scale.text} ${className}`;

  const content = (
    <>
      <span className="roll leading-6">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {arrow && (
        <span aria-hidden="true" className={`grid place-items-center rounded-full ${tone.dot} ${scale.dot}`}>
          <Icon className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:rotate-[-45deg] group-disabled:rotate-0" />
        </span>
      )}
    </>
  );

  if (to) return <Link to={to} className={classes} {...props}>{content}</Link>;
  if (href) return <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>{content}</a>;

  return <button type={type} className={classes} {...props}>{content}</button>;
};

export default Button;
