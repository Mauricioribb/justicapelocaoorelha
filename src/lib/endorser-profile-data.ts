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

export const YURY_DO_PAREDAO_PROFILE: EndorserProfile = {
  name: "Yury do Paredão",
  role: "Deputado Federal (MDB/CE) — autor do projeto Busão 0800",
  movement: "Mobilização Tarifa Zero JA",
  connectLabel: "Conecte-se com a gente!",
  imageSrc: "/img/yury-do-paredao.jpg",
  imageAlt: "Yury do Paredão",
  instagramUrl: "https://www.instagram.com/yurydoparedao",
  initials: "YP",
};
