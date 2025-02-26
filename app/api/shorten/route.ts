import { NextResponse } from "next/server";
import { getUrlStore, saveUrlStore } from "@/lib/urlStore";

function generateShortKey(): string {
  return Math.random().toString(36).substring(2, 8);
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url || !/^https?:\/\/[^\s]+$/.test(url)) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const shortKey = generateShortKey();
    const store = await getUrlStore();
    store.push({ shortCode: shortKey, url });
    await saveUrlStore(store);
    console.log("After storing:", store);

    const shortUrl = `${request.headers.get("host")}/${shortKey}`;
    return NextResponse.json({ shortUrl });
  } catch (_error) {
    console.error("Error in POST /api/shorten:", _error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}