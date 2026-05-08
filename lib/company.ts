export const company = {
  name: 'Duzi Tech s.r.o.',
  shortName: 'Duzi Tech',
  tagline: 'AI software pro profesionály',
  url: 'https://duzi.tech',
  email: 'info@duzi.tech',
  tel: '+420 704 397 696',
  telHref: 'tel:+420704397696',
  address: {
    street: 'Smetanova 769',
    city: 'Studénka',
    zip: '742 13',
    country: 'CZ',
  },
  ico: '29513898',
  spisovaZnacka: 'C 103790 vedená u Krajského soudu v Ostravě',
  dic: 'CZ29513898',
} as const;

export const formattedAddress = `${company.address.street}, ${company.address.zip} ${company.address.city}`;
