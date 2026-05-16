/**
 * Seed Supabase con los datos estáticos de Hoy Es Fiesta.
 *
 *   Uso:
 *     1. Asegúrate de tener en .env.local:
 *          NEXT_PUBLIC_SUPABASE_URL=...
 *          SUPABASE_SERVICE_ROLE_KEY=...   (no la anon, hace falta service-role)
 *     2. Instala tsx si aún no lo tienes:
 *          npm i -D tsx dotenv
 *     3. Ejecuta:
 *          npx tsx scripts/seed-supabase.ts
 *
 *   Idempotente: trunca las tablas antes de insertar.
 */

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import {
  comunidades,
  festivosNacionales2026,
  festivosRegionales2026,
  festivosLocales2026,
} from "../src/lib/holidays-data";
import { municipios } from "../src/lib/municipalities-data";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

async function clear() {
  console.log("→ Limpiando tablas existentes…");
  // Holidays primero (tiene FK a locations)
  const { error: hErr } = await supabase
    .from("holidays")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (hErr) throw hErr;
  const { error: lErr } = await supabase
    .from("locations")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (lErr) throw lErr;
}

async function insertAndMap(
  rows: { name: string; type: string; code: string | null; parent_id: string | null }[],
  label: string,
): Promise<Map<string, string>> {
  const { data, error } = await supabase
    .from("locations")
    .insert(rows)
    .select("id, code");
  if (error) throw error;
  console.log(`✓ ${label}: insertados ${data?.length ?? 0}`);
  const map = new Map<string, string>();
  for (const row of data ?? []) {
    if (row.code) map.set(row.code, row.id);
  }
  return map;
}

async function seed() {
  await clear();

  // 1) País
  console.log("→ Insertando país…");
  const country = comunidades.find((c) => c.type === "country")!;
  const { data: countryRows, error: countryErr } = await supabase
    .from("locations")
    .insert([
      { name: country.name, type: country.type, code: country.code, parent_id: null },
    ])
    .select("id, code");
  if (countryErr) throw countryErr;
  const countryUuid = countryRows![0].id;

  // staticId → uuid: lo iremos completando capa a capa
  const staticToUuid = new Map<string, string>();
  staticToUuid.set(country.id, countryUuid);

  // 2) Comunidades autónomas
  console.log("→ Insertando comunidades autónomas…");
  const comAutonomas = comunidades.filter((c) => c.type === "autonomous_region");
  const comInsert = comAutonomas.map((c) => ({
    name: c.name,
    type: c.type,
    code: c.code,
    parent_id: countryUuid,
  }));
  const codeToUuidCom = await insertAndMap(comInsert, "comunidades autónomas");
  for (const c of comAutonomas) {
    if (c.code) staticToUuid.set(c.id, codeToUuidCom.get(c.code)!);
  }

  // 3) Provincias
  console.log("→ Insertando provincias…");
  const provincias = comunidades.filter((c) => c.type === "province");
  const provInsert = provincias.map((p) => ({
    name: p.name,
    type: p.type,
    code: p.code,
    parent_id: staticToUuid.get(p.parent_id ?? "")!,
  }));
  const codeToUuidProv = await insertAndMap(provInsert, "provincias");
  for (const p of provincias) {
    if (p.code) staticToUuid.set(p.id, codeToUuidProv.get(p.code)!);
  }

  // 4) Municipios
  console.log("→ Insertando municipios…");
  const muniInsert = municipios.map((m) => ({
    name: m.name,
    type: m.type,
    code: m.code,
    parent_id: staticToUuid.get(m.parent_id ?? "")!,
  }));
  const codeToUuidMuni = await insertAndMap(muniInsert, "municipios");
  for (const m of municipios) {
    if (m.code) staticToUuid.set(m.id, codeToUuidMuni.get(m.code)!);
  }

  // 5) Festivos
  console.log("→ Insertando festivos…");
  const allHolidays = [
    ...festivosNacionales2026,
    ...festivosRegionales2026,
    ...festivosLocales2026,
  ];
  const holidayInsert = allHolidays
    .map((h) => {
      const location_id = h.location_id
        ? staticToUuid.get(h.location_id) ?? null
        : null;
      // Si era regional/local pero no encontramos uuid, descartamos para no romper la FK
      if (h.scope !== "national" && !location_id) {
        console.warn(
          `  ! ${h.scope} festivo "${h.name}" sin location_id válido (${h.location_id}) — saltado`,
        );
        return null;
      }
      return {
        date: h.date,
        name: h.name,
        scope: h.scope,
        location_id,
        is_replaceable: h.is_replaceable,
      };
    })
    .filter((h): h is NonNullable<typeof h> => h !== null);

  // Inserta en lotes de 200 para no saturar la API
  const batchSize = 200;
  let inserted = 0;
  for (let i = 0; i < holidayInsert.length; i += batchSize) {
    const slice = holidayInsert.slice(i, i + batchSize);
    const { error } = await supabase.from("holidays").insert(slice);
    if (error) throw error;
    inserted += slice.length;
  }
  console.log(`✓ festivos: insertados ${inserted}`);

  console.log("\n✓ Seed completado correctamente");
}

seed().catch((err) => {
  console.error("✗ Seed falló:", err);
  process.exit(1);
});
