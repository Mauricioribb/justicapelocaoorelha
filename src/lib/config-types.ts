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

export interface BoxWhatsappConfig {
  ativo: boolean;
  titulo: string;
  descricao: string;
  texto_botao: string;
  whatsapp: string;
  mensagem: string;
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
  box_whatsapp: BoxWhatsappConfig;
  codigos?: CodigosCustomizados;
}

export const DEFAULT_CONFIG: AppConfig = {
  titulo: "Justiça pelo Cão Orelha — Proteção animal e punição a maus-tratos",
  seo: {
    titulo: "Home - Justiça pelo Cão Orelha",
    descricao:
      "Assine para apoiar a criação da Lei de Proteção Animal e punição rigorosa para crimes de maus-tratos na sua cidade.",
    imagem: "/img/logo-caoorelha.png",
    nome_site: "Justiça pelo Cão Orelha",
  },
  lightbox_titulo: "Obrigado por apoiar a Justiça pelo Cão Orelha!",
  lightbox_texto:
    "Vamos unir forças? Envie para seus amigos e familiares clicando no botão \"Compartilhar no WhatsApp\" e ajude a combater a impunidade contra maus-tratos.",
  meta_geral: 500,
  mostrar_placar: true,
  box_whatsapp: {
    ativo: false,
    titulo: "Fale conosco pelo WhatsApp",
    descricao:
      "Entre em contato conosco e saiba como apoiar a <b>Justiça pelo Cão Orelha</b> na sua cidade.",
    texto_botao: "Chamar no WhatsApp",
    whatsapp: "",
    mensagem:
      "Olá! Obrigado pelo seu interesse em (nome_site). Gostaria de saber mais.",
  },
  codigos: {
    head: "",
    body: "",
    footer: "",
  },
  niveis: {
    nivel_1: {
      meta: 50,
      status: "Começando",
      frase: "Seja um dos primeiros a assinar nesta cidade!",
      cta: "Assine agora",
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
      cta: "Participe da Missão da Família e ajude a protocolar o projeto",
      link: "",
    },
    nivel_4: {
      meta: 500,
      status: "Cidade pronta para protocolo",
      frase:
        "A população falou alto. É hora de levar a proteção animal à Câmara Municipal.",
      cta: "Clique para participar da entrega do projeto",
      link: "",
    },
    nivel_5: {
      status: "Missão cumprida ✅",
      frase:
        "Esta cidade deu um passo histórico pela proteção da infância.",
      cta: "Veja como sua cidade conseguiu",
    },
  },
};

export const CONFIG_KEY = "abaixo_assinado_config";
