import { eq } from "drizzle-orm";
import { db } from "./db";
import { config } from "./db/schema";
import {
  AppConfig,
  CONFIG_KEY,
  DEFAULT_CONFIG,
} from "./config-types";

export async function getAppConfig(): Promise<AppConfig> {
  try {
    const row = await db.query.config.findFirst({
      where: eq(config.key, CONFIG_KEY),
    });

    if (!row) {
      return DEFAULT_CONFIG;
    }

    const stored = JSON.parse(row.value) as Partial<AppConfig>;
    return {
      ...DEFAULT_CONFIG,
      ...stored,
      seo: { ...DEFAULT_CONFIG.seo, ...stored.seo },
      codigos: { ...DEFAULT_CONFIG.codigos, ...stored.codigos },
      box_whatsapp: {
        ...DEFAULT_CONFIG.box_whatsapp,
        ...stored.box_whatsapp,
      },
      niveis: {
        nivel_1: { ...DEFAULT_CONFIG.niveis.nivel_1, ...stored.niveis?.nivel_1 },
        nivel_2: { ...DEFAULT_CONFIG.niveis.nivel_2, ...stored.niveis?.nivel_2 },
        nivel_3: { ...DEFAULT_CONFIG.niveis.nivel_3, ...stored.niveis?.nivel_3 },
        nivel_4: { ...DEFAULT_CONFIG.niveis.nivel_4, ...stored.niveis?.nivel_4 },
        nivel_5: { ...DEFAULT_CONFIG.niveis.nivel_5, ...stored.niveis?.nivel_5 },
      },
    };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export async function saveAppConfig(newConfig: AppConfig): Promise<void> {
  await db
    .insert(config)
    .values({ key: CONFIG_KEY, value: JSON.stringify(newConfig) })
    .onConflictDoUpdate({
      target: config.key,
      set: { value: JSON.stringify(newConfig) },
    });
}
