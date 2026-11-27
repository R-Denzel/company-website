import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const variants = {
  // The azure of the mark, running light to the right as it does in the logo.
  primary: 'bg-gradient-to-r from-brand to-brand-light text-ink hover:from-brand-light',
  secondary: 'border border-ink/20 bg-transparent text-ink hover:border-ink [.on-ink_&]:border-paper/35 [.on-ink_&]:text-paper [.on-ink_&]:hover:border-paper',
  // Solid navy, used by the Voltway sample shop.
  dark: 'bg-ink text-paper hover:bg-violet-deep',
  light: 'bg-paper text-ink hover:bg-mist',
  ghost: 'bg-transparent text-ink hover:bg-mist',
  // For dark grounds (used by the Voltway sample shop).
  glass: 'border border-paper/40 text-paper hover:bg-paper/10',
};

const sizes = {
  md: 'min-h-11 px-5 py-2 text-sm',
  lg: 'min-h-12 px-6 py-2.5 text-base',
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
  const classes = `group inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium transition-colors duration-300 ease-soft disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      <span className="roll leading-6">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {arrow && (
        <Icon aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-500 ease-soft group-hover:rotate-[-45deg] group-disabled:rotate-0" />
      )}
    </>
  );

  if (to) return <Link to={to} className={classes} {...props}>{content}</Link>;
  if (href) return <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>{content}</a>;

  return <button type={type} className={classes} {...props}>{content}</button>;
};

export default Button;
