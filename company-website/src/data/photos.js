import collaborators from '../assets/stock/collaborators.jpg';
import developer from '../assets/stock/developer.jpg';
import microchip from '../assets/stock/microchip.jpg';
import monitors from '../assets/stock/monitors.jpg';
import nairobi from '../assets/stock/nairobi.jpg';
import shopLaptop from '../assets/stock/shop-laptop.jpg';
import shopPhone from '../assets/stock/shop-phone.jpg';

const unsplash = (slug) => `https://unsplash.com/photos/${slug}`;

// Stock imagery under the Unsplash License. These people are not FutureTech staff,
// so never caption them as the team.
export const photos = {
  collaborators: {
    src: collaborators,
    alt: 'Two people working through a spreadsheet together on laptops',
    credit: 'Francis Odeyemi',
    creditUrl: unsplash('a-couple-of-people-sitting-at-a-table-with-a-laptop-T4QfHGrqT5k'),
  },
  developer: {
    src: developer,
    alt: 'A developer writing code on a laptop at a desk',
    credit: 'Ibrahim Yusuf',
    creditUrl: unsplash('a-man-sitting-in-front-of-a-laptop-computer-vWJtYRfE_rw'),
  },
  microchip: {
    src: microchip,
    alt: 'A glowing processor on a circuit board lit in violet',
    credit: 'Brecht Corbeel',
    creditUrl: unsplash('a-glowing-square-microchip-on-a-futuristic-circuit-board-HxMFCiK2hOA'),
  },
  monitors: {
    src: monitors,
    alt: 'Two monitors showing code and a design preview in a dim workspace',
    credit: 'Fotis Fotopoulos',
    creditUrl: unsplash('two-black-flat-screen-computer-monitors-LJ9KY8pIH3E'),
  },
  nairobi: {
    src: nairobi,
    alt: 'The Nairobi skyline rising above trees',
    credit: 'Jay Omari',
    creditUrl: unsplash('nairobi-skyline-with-modern-glass-skyscrapers-gi7vWlzNGOc'),
  },
  shopPhone: {
    src: shopPhone,
    alt: 'A hand holding a smartphone with a glowing pink screen',
    credit: 'Jakub Żerdzicki',
    creditUrl: unsplash('a-person-holding-a-cell-phone-in-their-hand-Xb1myRNASiM'),
  },
  shopLaptop: {
    src: shopLaptop,
    alt: 'Hands typing code on a laptop on a dark desk',
    credit: 'Rahul Mishra',
    creditUrl: unsplash('hands-typing-code-on-a-laptop-computer-8pMT3J_gxJA'),
  },
};
