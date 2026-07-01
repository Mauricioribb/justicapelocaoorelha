export type EndorserProfile = {
  name: string;
  role: string;
  movement: string;
  connectLabel?: string;
  imageSrc: string;
  imageAlt?: string;
  instagramUrl?: string;
  initials?: string;
};

export const MARCELO_ORTEGA_PROFILE: EndorserProfile = {
  name: "Dr. Marcelo Ortega",
  role: "Advogado e defensor do Transporte Público gratuito",
  movement: "Movimento Tarifa Zero Já",
  connectLabel: "Conecte-se com a gente!",
  imageSrc: "/img/marcelo-ortega.jpg",
  imageAlt: "Dr. Marcelo Ortega",
  instagramUrl:
    "https://www.instagram.com/marceloortegasp?igsh=aXM0eG0ycGt0OWxt",
  initials: "MO",
};
