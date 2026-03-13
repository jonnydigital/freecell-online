import type { Metadata } from "next";
import EmbedFreecellClient from "@/components/embed/EmbedFreecellClient";

export const metadata: Metadata = {
  title: "FreeCell — Embed",
  robots: { index: false, follow: false },
};

export default function EmbedFreecellPage() {
  return <EmbedFreecellClient />;
}
