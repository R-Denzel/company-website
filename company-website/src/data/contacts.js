import { marketList, whatsappLink } from '../content/markets';

export const contactChannels = [
  { label: 'Email', value: 'futuretechafrica1.0@gmail.com', href: 'mailto:futuretechafrica1.0@gmail.com' },
  ...marketList.map((market) => ({
    label: `WhatsApp ${market.name}`,
    value: market.phone,
    href: whatsappLink(market.code),
    isExternal: true,
  })),
];

/** Link attributes that open web destinations in a new tab. */
export const linkTarget = ({ isExternal }) => (isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {});
