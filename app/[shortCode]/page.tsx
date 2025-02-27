import { redirect } from "next/navigation";
import { getUrlStore } from "@/lib/urlStore";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function RedirectPage({ params }: { params: Promise<{ shortCode: string }> }) {
  const { shortCode } = await params;
  const store = await getUrlStore();
  console.log("Current store:", store);
  const entry = store.find((item) => item.shortCode === shortCode);
  const originalUrl = entry?.url;

  if (!originalUrl) {
    console.log(`No URL found for shortCode: ${shortCode}`);
    return <NotFoundPage />;
  }

  console.log(`Redirecting ${shortCode} to ${originalUrl}`);
  redirect(originalUrl);
}

// ✅ Custom 404 Page Component
function NotFoundPage() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg"
      >
        <h1 className="text-5xl font-bold text-gray-800">404</h1>
        <p className="text-lg text-gray-600 mt-2">
          Oops! The URL you are looking for doesn't exist or has expired.
        </p>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-32 h-32 text-gray-400 mx-auto"
          >
            <path d="M9 18v-6m6 6v-6M5 6h14M9 6v6m6-6v6M2 18h20" />
          </svg>
        </motion.div>

        {/* Back Home Button */}
        <Link href="/">
          <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
            Go Back Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
