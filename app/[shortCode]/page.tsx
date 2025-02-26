import { redirect } from "next/navigation";
import { getUrlStore } from "@/lib/urlStore";

export default async function RedirectPage({ params }: { params: Promise<{ shortCode: string }> }) {
  const { shortCode } = await params;
  const store = await getUrlStore();
  console.log("Current store:", store);
  const entry = store.find((item) => item.shortCode === shortCode);
  const originalUrl = entry?.url;

  if (!originalUrl) {
    console.log(`No URL found for shortCode: ${shortCode}`);
    return <div>404 - URL Not Found</div>;
  }

  console.log(`Redirecting ${shortCode} to ${originalUrl}`);
  redirect(originalUrl);
}