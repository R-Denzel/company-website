import { ArrowUpRight, ArrowUp, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t border-white/[0.08] bg-[#07090E]">
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="grid gap-12 md:grid-cols-[1.4fr_0.8fr_1fr]">
        <div className="max-w-md">
          <Link to="/" className="inline-flex items-center gap-3" aria-label="FutureTech Africa home">
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/[0.08] text-sm font-bold text-[#E5C158]">
              FT
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold tracking-wide text-slate-100">FutureTech</span>
              <span className="mt-0.5 block text-[10px] uppercase tracking-[0.24em] text-slate-500">Africa</span>
            </span>
          </Link>
          <p className="mt-5 text-sm leading-7 text-slate-400">
            We help businesses and institutions turn practical ideas into useful digital products.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-400">
            <li><Link className="transition hover:text-[#E5C158]" to="/about">About us</Link></li>
            <li><Link className="transition hover:text-[#E5C158]" to="/team">Meet the team</Link></li>
            <li><Link className="transition hover:text-[#E5C158]" to="/projects">Services</Link></li>
            <li><Link className="transition hover:text-[#E5C158]" to="/#pricing">Pricing</Link></li>
            <li><Link className="transition hover:text-[#E5C158]" to="/opportunities">Opportunities</Link></li>
            <li><Link className="transition hover:text-[#E5C158]" to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">Talk to our team</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-400">
            <li>
              <a className="inline-flex items-center gap-3 transition hover:text-[#E5C158]" href="mailto:futuretechafrica1.0@gmail.com">
                <Mail className="h-4 w-4 text-[#D4AF37]" />
                futuretechafrica1.0@gmail.com
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-3 transition hover:text-[#E5C158]" href="tel:+256774861658">
                <Phone className="h-4 w-4 text-[#D4AF37]" />
                Uganda · +256 774 861 658
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-3 transition hover:text-[#E5C158]" href="tel:+254797332824">
                <Phone className="h-4 w-4 text-[#D4AF37]" />
                Kenya · +254 797 332 824
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.08] pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} FutureTech Africa. All rights reserved.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 transition hover:text-[#E5C158]">
          Start a conversation
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="inline-flex items-center gap-2 self-start transition hover:text-[#E5C158] sm:self-auto"
        >
          Back to top
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
