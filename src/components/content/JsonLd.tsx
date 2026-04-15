interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
}

/**
 * Renders a JSON-LD script tag with a stable id attribute.
 *
 * The id is required so React can correctly reconcile the server-rendered
 * element during client-side hydration. Without it, React 18 re-inserts the
 * script tag during hydration, producing duplicate JSON-LD on every page.
 *
 * The id is derived from @type and name (slugified) so it is predictable and
 * unique for the schemas we emit (one FAQPage, one BreadcrumbList, etc. per page).
 * Pass an explicit `id` when two schemas of the same type appear on one page.
 */
export default function JsonLd({ data, id }: JsonLdProps) {
  let stableId = id;
  if (!stableId) {
    const type = Array.isArray(data) ? 'list' : ((data['@type'] as string) ?? 'schema');
    const name = Array.isArray(data) ? '' : ((data['name'] as string) ?? '');
    stableId = `ld-${type}-${name}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+$/, '')
      .slice(0, 64);
  }
  return (
    <script
      id={stableId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
