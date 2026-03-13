import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.__embedMode = true;
            try {
              var params = new URLSearchParams(window.location.search);
              var ref = params.get('ref');
              if (ref) window.__embedRef = ref;
            } catch(e) {}
          `,
        }}
      />
      <div style={{ overflow: "hidden", height: "100vh" }}>
        {children}
      </div>
    </>
  );
}
