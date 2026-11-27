// One site, two markets. Phone numbers must be confirmed as live WhatsApp lines.
export const markets = {
  ug: {
    code: 'ug',
    name: 'Uganda',
    currency: 'UGX',
    locale: 'en-UG',
    path: '/uganda',
    phone: '+256 774 861 658',
    teamCta: 'Talk to our Uganda team',
    quoteCta: 'Request a UGX quote',
    headline: 'Software for businesses and institutions in Uganda.',
    summary: 'See indicative prices in Ugandan shillings and reach the team on the Uganda WhatsApp line.',
    paymentsNote: 'Mobile money and payment integrations are scoped for each project. Provider support is confirmed in your quotation.',
  },
  ke: {
    code: 'ke',
    name: 'Kenya',
    currency: 'KES',
    locale: 'en-KE',
    path: '/kenya',
    phone: '+254 797 332 824',
    teamCta: 'Talk to our Kenya team',
    quoteCta: 'Request a KES quote',
    headline: 'Software for businesses and institutions in Kenya.',
    summary: 'See indicative prices in Kenyan shillings and reach the team on the Kenya WhatsApp line.',
    paymentsNote: 'M-Pesa and other mobile money integrations are scoped for each project. Provider support is confirmed in your quotation.',
  },
};

export const DEFAULT_MARKET = 'ug';
export const marketList = [markets.ug, markets.ke];

export const whatsappLink = (market, text) => {
  const number = markets[market].phone.replace(/\D/g, '');
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
};
