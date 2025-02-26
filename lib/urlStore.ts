// lib/urlStore.ts
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "urlStore.json");

// Initialize the file if it doesn’t exist
async function initializeStore() {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify([], null, 2), "utf-8");
  }
}

export async function getUrlStore(): Promise<{ shortCode: string; url: string }[]> {
  await initializeStore();
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function saveUrlStore(store: { shortCode: string; url: string }[]) {
  await initializeStore();
  await fs.writeFile(filePath, JSON.stringify(store, null, 2), "utf-8");
}