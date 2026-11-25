// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const variants = {
    primary: 'border border-[#D4AF37] bg-[#D4AF37] text-[#11140F] hover:border-[#E5C158] hover:bg-[#E5C158] focus-visible:ring-[#D4AF37]',
    secondary: 'border border-white/10 bg-white/[0.05] text-slate-100 hover:border-white/25 hover:bg-white/[0.08] focus-visible:ring-white/30',
    outline: 'border border-[#D4AF37]/60 bg-transparent text-[#E5C158] hover:border-[#E5C158] hover:bg-[#D4AF37]/[0.08] focus-visible:ring-[#D4AF37]',
    ghost: 'border border-transparent bg-transparent text-slate-400 hover:bg-white/[0.04] hover:text-slate-100 focus-visible:ring-white/30',
    neon: 'border border-[#D4AF37] bg-[#D4AF37] text-[#11140F] hover:border-[#E5C158] hover:bg-[#E5C158] focus-visible:ring-[#D4AF37]',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-sm sm:text-base',
    xl: 'px-7 py-4 text-base',
  };

  return (
    <motion.button
      type={type}
      className={`inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080B11] disabled:cursor-not-allowed disabled:opacity-45 ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.16 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
