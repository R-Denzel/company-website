// Click-to-chat link: country code and number, digits only.
const whatsapp = (number) => `https://wa.me/${number.replace(/\D/g, '')}`;

const phone = (country, number) => ({
  label: `WhatsApp ${country}`,
  value: number,
  href: whatsapp(number),
  isExternal: true,
});

export const contactChannels = [
  { label: 'Email', value: 'futuretechafrica1.0@gmail.com', href: 'mailto:futuretechafrica1.0@gmail.com' },
  phone('Uganda', '+256 774 861 658'),
  phone('Kenya', '+254 797 332 824'),
];

/** Link attributes that open web destinations in a new tab. */
export const linkTarget = ({ isExternal }) => (isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {});
