"use client";

import { useEffect, useRef, useState } from "react";
import { AppConfig, BoxWhatsappConfig, DEFAULT_CONFIG } from "@/lib/config-types";
import {
  AdminAlert,
  AdminCard,
  AdminPageTitle,
  AdminTabs,
} from "@/components/admin/AdminUI";

const TABS = [
  { id: "informacoes", label: "Informações" },
  { id: "lightbox", label: "Lightbox" },
  { id: "whatswave", label: "Api WhatsWave" },
  { id: "box_whatsapp", label: "Box Whatsapp" },
  { id: "metas", label: "Metas e Níveis" },
  { id: "scripts", label: "Scripts e Analytics" },
  { id: "mais", label: "Mais Configurações" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminConfiguracoesPage() {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("informacoes");
  const [ogUploading, setOgUploading] = useState(false);
  const [ogUploadError, setOgUploadError] = useState("");
  const ogFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/painelpro/configuracoes")
      .then((r) => r.json())
      .then((data) =>
        setConfig({
          ...DEFAULT_CONFIG,
          ...data,
          seo: { ...DEFAULT_CONFIG.seo, ...data.seo },
          codigos: { ...DEFAULT_CONFIG.codigos, ...data.codigos },
          box_whatsapp: {
            ...DEFAULT_CONFIG.box_whatsapp,
            ...data.box_whatsapp,
          },
        })
      )
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/painelpro/configuracoes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function updateNivel(
    key: keyof AppConfig["niveis"],
    field: string,
    value: string | number
  ) {
    setConfig({
      ...config,
      niveis: {
        ...config.niveis,
        [key]: { ...config.niveis[key], [field]: value },
      },
    });
  }

  function updateBoxWhatsapp(updates: Partial<BoxWhatsappConfig>) {
    setConfig((prev) => ({
      ...prev,
      box_whatsapp: {
        ...DEFAULT_CONFIG.box_whatsapp,
        ...prev.box_whatsapp,
        ...updates,
      },
    }));
  }

  async function handleOgImageUpload(file: File) {
    setOgUploadError("");
    setOgUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/painelpro/og-image", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { url?: string; message?: string };

      if (!response.ok || !data.url) {
        setOgUploadError(data.message ?? "Erro ao enviar imagem.");
        return;
      }

      setConfig((prev) => ({
        ...prev,
        seo: { ...prev.seo, imagem: data.url! },
      }));
    } catch {
      setOgUploadError("Erro de conexão ao enviar imagem.");
    } finally {
      setOgUploading(false);
      if (ogFileInputRef.current) {
        ogFileInputRef.current.value = "";
      }
    }
  }

  async function handleRemoveOgImage() {
    const currentImage = config.seo?.imagem?.trim() ?? "";

    if (currentImage.startsWith("/img/og/")) {
      try {
        await fetch(
          `/api/painelpro/og-image?path=${encodeURIComponent(currentImage)}`,
          { method: "DELETE" }
        );
      } catch {
        // limpa a configuração mesmo se a remoção do arquivo falhar
      }
    }

    setOgUploadError("");
    setConfig((prev) => ({
      ...prev,
      seo: { ...prev.seo, imagem: "" },
    }));
  }

  if (loading) return <p className="text-admin-muted">Carregando...</p>;

  return (
    <div>
      <AdminPageTitle
        title="Configurações"
        description="Site, SEO, WhatsWave, lightbox, metas, scripts e níveis de mobilização"
      />

      {saved && <AdminAlert>Configurações salvas com sucesso!</AdminAlert>}

      <AdminTabs
        tabs={[...TABS]}
        active={activeTab}
        onChange={(id) => setActiveTab(id as TabId)}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {activeTab === "informacoes" && (
          <>
            <AdminCard title="Site / Campanha">
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-admin-text">
                    Título da campanha
                  </label>
                  <input
                    type="text"
                    value={config.titulo}
                    onChange={(e) =>
                      setConfig({ ...config, titulo: e.target.value })
                    }
                    className="admin-input"
                  />
                  <p className="mt-1 text-xs text-admin-muted">
                    Usado na variável (titulo) da mensagem WhatsWave.
                  </p>
                </div>
              </div>
            </AdminCard>

            <AdminCard title="SEO / Compartilhamento">
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-admin-text">
                    Título SEO (Google)
                  </label>
                  <input
                    type="text"
                    value={config.seo?.titulo ?? ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        seo: { ...config.seo, titulo: e.target.value },
                      })
                    }
                    className="admin-input"
                  />
                  <p className="mt-1 text-xs text-admin-muted">
                    Aparece na aba do navegador e nos resultados do Google (~60
                    caracteres).
                  </p>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-admin-text">
                    Descrição SEO
                  </label>
                  <textarea
                    rows={3}
                    value={config.seo?.descricao ?? ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        seo: { ...config.seo, descricao: e.target.value },
                      })
                    }
                    className="admin-input"
                  />
                  <p className="mt-1 text-xs text-admin-muted">
                    Meta description para Google e redes sociais (~160 caracteres).
                  </p>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-admin-text">
                    Nome do site
                  </label>
                  <input
                    type="text"
                    value={config.seo?.nome_site ?? ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        seo: { ...config.seo, nome_site: e.target.value },
                      })
                    }
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-admin-text">
                    Imagem para compartilhar (Open Graph)
                  </label>

                  {config.seo?.imagem ? (
                    <div className="rounded-lg border border-admin-border bg-white p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={config.seo.imagem}
                        alt="Preview OG"
                        className="max-h-48 max-w-full rounded object-contain"
                      />
                      <p className="mt-3 break-all text-xs text-admin-muted">
                        {config.seo.imagem}
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-admin-border bg-admin-bg px-4 py-8 text-center">
                      <p className="text-sm text-admin-muted">
                        Nenhuma imagem definida para compartilhamento.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </AdminCard>
          </>
        )}

        {activeTab === "lightbox" && (
          <AdminCard title="Lightbox / Modal">
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-admin-text">
                  Título
                </label>
                <input
                  type="text"
                  value={config.lightbox_titulo}
                  onChange={(e) =>
                    setConfig({ ...config, lightbox_titulo: e.target.value })
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-admin-text">
                  Texto
                </label>
                <textarea
                  rows={4}
                  value={config.lightbox_texto}
                  onChange={(e) =>
                    setConfig({ ...config, lightbox_texto: e.target.value })
                  }
                  className="admin-input"
                />
              </div>
            </div>
          </AdminCard>
        )}

        {activeTab === "whatswave" && (
          <AdminCard title="API WhatsWave">
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Bearer Token
                </label>
                <textarea
                  rows={3}
                  value={config.api_whatswave?.bearer_token ?? ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      api_whatswave: {
                        ...config.api_whatswave,
                        bearer_token: e.target.value,
                      },
                    })
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  phone_number
                </label>
                <input
                  type="text"
                  value={config.api_whatswave?.phone_number ?? ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      api_whatswave: {
                        ...config.api_whatswave,
                        phone_number: e.target.value,
                      },
                    })
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  company_id
                </label>
                <input
                  type="text"
                  value={config.api_whatswave?.company_id ?? ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      api_whatswave: {
                        ...config.api_whatswave,
                        company_id: e.target.value,
                      },
                    })
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Texto da mensagem
                </label>
                <textarea
                  rows={4}
                  value={config.api_whatswave?.text ?? ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      api_whatswave: {
                        ...config.api_whatswave,
                        text: e.target.value,
                      },
                    })
                  }
                  className="admin-input"
                />
                <p className="mt-1 text-xs text-admin-muted">
                  Variáveis: (nomecompleto), (whatsapp), (estado), (cidade),
                  (titulo), (data)
                </p>
              </div>
            </div>
          </AdminCard>
        )}

        {activeTab === "box_whatsapp" && (
          <AdminCard title="Box Whatsapp">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-admin-text">Ativar</p>
                  <p className="mt-0.5 text-xs text-admin-muted">
                    Substitui o formulário de assinatura e oculta o placar na
                    home.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={config.box_whatsapp?.ativo ?? false}
                  onClick={() =>
                    updateBoxWhatsapp({
                      ativo: !(config.box_whatsapp?.ativo ?? false),
                    })
                  }
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                    (config.box_whatsapp?.ativo ?? false)
                      ? "bg-admin-primary"
                      : "bg-admin-border"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${
                      (config.box_whatsapp?.ativo ?? false)
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-admin-text">
                  Título
                </label>
                <input
                  type="text"
                  value={config.box_whatsapp?.titulo ?? ""}
                  onChange={(e) =>
                    updateBoxWhatsapp({ titulo: e.target.value })
                  }
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-admin-text">
                  Descrição
                </label>
                <textarea
                  rows={4}
                  value={config.box_whatsapp?.descricao ?? ""}
                  onChange={(e) =>
                    updateBoxWhatsapp({ descricao: e.target.value })
                  }
                  className="admin-input"
                />
                <p className="mt-1 text-xs text-admin-muted">
                  Aceita HTML básico: <code>&lt;b&gt;texto em negrito&lt;/b&gt;</code>,{" "}
                  <code>&lt;strong&gt;</code>, <code>&lt;em&gt;</code>,{" "}
                  <code>&lt;br&gt;</code>.
                </p>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-admin-text">
                  Texto do botão
                </label>
                <input
                  type="text"
                  value={config.box_whatsapp?.texto_botao ?? ""}
                  onChange={(e) =>
                    updateBoxWhatsapp({ texto_botao: e.target.value })
                  }
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-admin-text">
                  WhatsApp (com DDD)
                </label>
                <input
                  type="text"
                  value={config.box_whatsapp?.whatsapp ?? ""}
                  onChange={(e) =>
                    updateBoxWhatsapp({ whatsapp: e.target.value })
                  }
                  className="admin-input"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-admin-text">
                  Mensagem do WhatsApp
                </label>
                <textarea
                  rows={4}
                  value={config.box_whatsapp?.mensagem ?? ""}
                  onChange={(e) =>
                    updateBoxWhatsapp({ mensagem: e.target.value })
                  }
                  className="admin-input"
                />
                <p className="mt-1 text-xs text-admin-muted">
                  Use <code>(nome_site)</code> para inserir o nome do site
                  automaticamente.
                </p>
              </div>
            </div>
          </AdminCard>
        )}

        {activeTab === "metas" && (
          <>
            <AdminCard title="Meta Geral">
              <input
                type="number"
                min={1}
                value={config.meta_geral}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    meta_geral: parseInt(e.target.value, 10),
                  })
                }
                className="admin-input max-w-xs"
              />
            </AdminCard>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-admin-text">
                Níveis de Mobilização
              </h2>
              {([1, 2, 3, 4, 5] as const).map((i) => {
                const key = `nivel_${i}` as keyof AppConfig["niveis"];
                const nivel = config.niveis[key];
                return (
                  <AdminCard key={key} title={`Nível ${i}`}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {i < 4 && "meta" in nivel && (
                        <div>
                          <label className="mb-1 block text-sm">
                            Meta de Assinaturas
                          </label>
                          <input
                            type="number"
                            min={1}
                            value={nivel.meta ?? ""}
                            onChange={(e) =>
                              updateNivel(
                                key,
                                "meta",
                                parseInt(e.target.value, 10)
                              )
                            }
                            className="admin-input"
                          />
                        </div>
                      )}
                      <div>
                        <label className="mb-1 block text-sm">Status</label>
                        <input
                          type="text"
                          value={nivel.status}
                          onChange={(e) =>
                            updateNivel(key, "status", e.target.value)
                          }
                          className="admin-input"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="mb-1 block text-sm">Frase / Copy</label>
                        <textarea
                          rows={2}
                          value={nivel.frase}
                          onChange={(e) =>
                            updateNivel(key, "frase", e.target.value)
                          }
                          className="admin-input"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm">CTA</label>
                        <input
                          type="text"
                          value={nivel.cta}
                          onChange={(e) =>
                            updateNivel(key, "cta", e.target.value)
                          }
                          className="admin-input"
                        />
                      </div>
                      {i >= 3 && i <= 4 && (
                        <div>
                          <label className="mb-1 block text-sm">
                            Link do CTA
                          </label>
                          <input
                            type="url"
                            value={"link" in nivel ? (nivel.link ?? "") : ""}
                            onChange={(e) =>
                              updateNivel(key, "link", e.target.value)
                            }
                            className="admin-input"
                          />
                        </div>
                      )}
                    </div>
                  </AdminCard>
                );
              })}
            </div>
          </>
        )}

        {activeTab === "scripts" && (
          <AdminCard title="Scripts e Analytics">
            <p className="mb-6 text-sm text-admin-muted">
              Cole códigos de Google Analytics, Google Tag Manager, Meta Pixel e
              similares. Eles são inseridos apenas nas páginas públicas do site
              (não no painel admin).
            </p>
            <div className="space-y-6">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-admin-text">
                  Código no &lt;head&gt;
                </label>
                <textarea
                  rows={8}
                  value={config.codigos?.head ?? ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      codigos: { ...config.codigos, head: e.target.value },
                    })
                  }
                  className="admin-input font-mono text-xs"
                  placeholder="<!-- Google Tag Manager, Meta Pixel, etc. -->"
                  spellCheck={false}
                />
                <p className="mt-1 text-xs text-admin-muted">
                  Inserido no cabeçalho da página. Ideal para tags de analytics e
                  pixels de rastreamento.
                </p>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-admin-text">
                  Código no início do &lt;body&gt;
                </label>
                <textarea
                  rows={6}
                  value={config.codigos?.body ?? ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      codigos: { ...config.codigos, body: e.target.value },
                    })
                  }
                  className="admin-input font-mono text-xs"
                  placeholder="<!-- Ex.: noscript do Google Tag Manager -->"
                  spellCheck={false}
                />
                <p className="mt-1 text-xs text-admin-muted">
                  Inserido logo após a abertura do body. Use para noscript do GTM
                  ou scripts que precisam rodar cedo.
                </p>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-admin-text">
                  Código no final do &lt;body&gt;
                </label>
                <textarea
                  rows={6}
                  value={config.codigos?.footer ?? ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      codigos: { ...config.codigos, footer: e.target.value },
                    })
                  }
                  className="admin-input font-mono text-xs"
                  placeholder="<!-- Chat, scripts adicionais, etc. -->"
                  spellCheck={false}
                />
                <p className="mt-1 text-xs text-admin-muted">
                  Inserido antes do fechamento do body. Ideal para widgets de chat
                  e scripts que podem carregar depois.
                </p>
              </div>
            </div>
          </AdminCard>
        )}

        {activeTab === "mais" && (
          <AdminCard title="Home">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-admin-text">
                  Exibir Placar de Cidades
                </p>
                <p className="mt-0.5 text-xs text-admin-muted">
                  Mostra ou oculta a seção de placar na página inicial.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={config.mostrar_placar ?? true}
                onClick={() =>
                  setConfig({
                    ...config,
                    mostrar_placar: !(config.mostrar_placar ?? true),
                  })
                }
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                  (config.mostrar_placar ?? true)
                    ? "bg-admin-primary"
                    : "bg-admin-border"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${
                    (config.mostrar_placar ?? true) ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </AdminCard>
        )}

        <button type="submit" className="admin-btn-primary px-8 py-3">
          Salvar Configurações
        </button>
      </form>
    </div>
  );
}
