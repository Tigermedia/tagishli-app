import { NextResponse } from "next/server";

// data.gov.il open data - Companies Registry (רשם החברות)
const RESOURCE_ID = "f004176c-b85f-4542-8901-7b3176f9a054";
const DATA_GOV_URL = "https://data.gov.il/api/3/action/datastore_search";

// In-memory cache (per serverless instance)
const cache = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  // Check cache
  const cacheKey = q.toLowerCase();
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return NextResponse.json(cached.data, {
      headers: { "X-Cache": "HIT" },
    });
  }

  try {
    const res = await fetch(
      `${DATA_GOV_URL}?resource_id=${RESOURCE_ID}&q=${encodeURIComponent(q)}&limit=10`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error(`data.gov.il returned ${res.status}`);
    }

    const data = await res.json();
    const records = data?.result?.records || [];

    const results = records.map((r: Record<string, string>) => {
      // data.gov.il field names (Hebrew keys)
      const name = r["שם חברה"] || "";
      const number = String(r["מספר חברה"] || "");
      const type = r["סוג תאגיד"] || "";
      const status = r["סטטוס חברה"] || "";
      const city = r["שם עיר"] || "";
      const street = r["שם רחוב"] || "";
      const houseNumber = String(r["מספר בית"] || "");
      // Clean up ~ in names (data.gov.il uses ~ instead of ")
      const cleanName = name.replace(/~/g, '"');
      return { name: cleanName, number, type, status, city, street, houseNumber };
    });

    const response = { results, total: data?.result?.total || 0 };

    // Cache it
    cache.set(cacheKey, { data: response, ts: Date.now() });

    // Prune old cache entries (keep under 500)
    if (cache.size > 500) {
      const oldest = [...cache.entries()].sort((a, b) => a[1].ts - b[1].ts);
      for (let i = 0; i < 100; i++) cache.delete(oldest[i][0]);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Company search error:", error);
    return NextResponse.json(
      { results: [], error: "חיפוש חברות זמנית לא זמין" },
      { status: 502 }
    );
  }
}
