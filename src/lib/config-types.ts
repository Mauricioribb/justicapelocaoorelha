export interface NivelConfig {
  meta?: number;
  status: string;
  frase: string;
  cta: string;
  link?: string;
}

export interface SeoConfig {
  titulo: string;
  descricao: string;
  imagem: string;
  nome_site: string;
}

export interface CodigosCustomizados {
  head?: string;
  body?: string;
  footer?: string;
}

export interface AppConfig {
  titulo: string;
  seo: SeoConfig;
  lightbox_titulo: string;
  lightbox_texto: string;
  meta_geral: number;
  niveis: {
    nivel_1: NivelConfig;
    nivel_2: NivelConfig;
    nivel_3: NivelConfig;
    nivel_4: NivelConfig;
    nivel_5: NivelConfig;
  };
  api_whatswave?: {
    bearer_token?: string;
    phone_number?: string;
    company_id?: string;
    text?: string;
  };
  mostrar_placar: boolean;
  codigos?: CodigosCustomizados;
}

export const DEFAULT_CONFIG: AppConfig = {
  titulo:
    "TARIFA ZERO JA — Transporte público gratuito para Juazeiro do Norte",
  seo: {
    titulo:
      "Tarifa Zero JA | Busão 0800 — Mobilização por transporte público gratuito",
    descricao:
      "Apoie o Tarifa Zero Já! Una-se ao movimento cidadão que luta pelo transporte público gratuito e pelo direito à cidade. Assine e faça a diferença!",
    imagem: "/redes.jpg",
    nome_site: "Tarifa Zero Já",
  },
  lightbox_titulo: "Obrigado por apoiar a Tarifa Zero!",
  lightbox_texto:
    "Vamos unir forças? Envie para seus amigos e familiares clicando no botão \"Compartilhar no WhatsApp\" e ajude Juazeiro do Norte a ter transporte gratuito!",
  meta_geral: 500,
  mostrar_placar: true,
  codigos: {
    head: "",
    body: "",
    footer: "",
  },
  niveis: {
    nivel_1: {
      meta: 50,
      status: "Cidade em mobilização",
      frase: "As pessoas começaram a se unir. Vamos mostrar força.",
      cta: "Assine e ajude sua cidade a sair do zero",
    },
    nivel_2: {
      meta: 100,
      status: "Cidade ativa",
      frase: "Já existe um grupo mobilizado. Falta pouco para avançar.",
      cta: "Convide mais 5 pessoas da sua cidade",
    },
    nivel_3: {
      meta: 250,
      status: "Cidade forte",
      frase:
        "Esta cidade já tem força suficiente para levar o projeto a um vereador.",
      cta: "Participe da mobilização e ajude a protocolar o projeto",
      link: "",
    },
    nivel_4: {
      meta: 500,
      status: "Cidade pronta para protocolo",
      frase:
        "A população falou alto. É hora de levar o Busão 0800 à Câmara Municipal.",
      cta: "Clique para participar da entrega do projeto",
      link: "",
    },
    nivel_5: {
      status: "Missão cumprida",
      frase:
        "Esta cidade deu um passo histórico pela mobilidade urbana acessível.",
      cta: "Parabéns para a cidade!",
    },
  },
};

export const CONFIG_KEY = "abaixo_assinado_config";
