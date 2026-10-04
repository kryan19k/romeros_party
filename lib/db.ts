import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { SEED_DB, DEFAULT_SETTINGS } from "./seed";
import type { DB } from "./types";

const DIR = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(process.cwd(), "data");
const FILE = path.join(DIR, "db.json");
export const UPLOAD_DIR = path.join(DIR, "uploads");

async function load(): Promise<DB> {
  let raw: string;
  try {
    raw = await fs.readFile(FILE, "utf8");
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e;
    await save(SEED_DB);
    return structuredClone(SEED_DB);
  }
  try {
    const parsed = JSON.parse(raw) as Partial<DB>;
    return {
      items: parsed.items ?? [],
      requests: parsed.requests ?? [],
      settings: { ...DEFAULT_SETTINGS, ...(parsed.settings ?? {}) },
    };
  } catch {
    // Never overwrite a damaged file: keep a copy and start from the sample data.
    await fs.rename(FILE, path.join(DIR, `db.corrupt-${Date.now()}.json`));
    await save(SEED_DB);
    return structuredClone(SEED_DB);
  }
}

async function save(db: DB) {
  await fs.mkdir(DIR, { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
  await fs.rename(tmp, FILE);
}

export const readDB = () => load();

// Writes run one at a time so two quick edits can never clobber each other.
let queue: Promise<unknown> = Promise.resolve();
export function mutate<T>(fn: (db: DB) => T | Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    const db = await load();
    const result = await fn(db);
    await save(db);
    return result;
  });
  queue = run.catch(() => undefined);
  return run;
}
