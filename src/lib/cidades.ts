import { readFile } from "fs/promises";
import path from "path";

let cache: Record<string, string[]> | null = null;

export async function getCidadesPorEstado(estado: string): Promise<string[]> {
  const data = await loadCidades();
  return data[estado.toUpperCase()] ?? [];
}

export async function getAllCidades(): Promise<Record<string, string[]>> {
  return loadCidades();
}

export async function countTotalCidades(): Promise<number> {
  const data = await loadCidades();
  return Object.values(data).reduce((acc, cidades) => acc + cidades.length, 0);
}

export async function filterCidades(
  estado?: string,
  busca?: string
): Promise<Record<string, string[]>> {
  const data = await loadCidades();

  if (estado) {
    const cidades = data[estado.toUpperCase()] ?? [];
    if (!busca) {
      return { [estado.toUpperCase()]: cidades };
    }
    const filtered = cidades.filter((c) =>
      c.toLowerCase().includes(busca.toLowerCase())
    );
    return filtered.length ? { [estado.toUpperCase()]: filtered } : {};
  }

  if (busca) {
    const result: Record<string, string[]> = {};
    for (const [uf, cidades] of Object.entries(data)) {
      const filtered = cidades.filter((c) =>
        c.toLowerCase().includes(busca.toLowerCase())
      );
      if (filtered.length) {
        result[uf] = filtered;
      }
    }
    return result;
  }

  return data;
}

async function loadCidades(): Promise<Record<string, string[]>> {
  if (cache) return cache;

  const filePath = path.join(
    process.cwd(),
    "public/data/cidades-brasil.json"
  );
  const content = await readFile(filePath, "utf-8");
  cache = JSON.parse(content) as Record<string, string[]>;
  return cache;
}
