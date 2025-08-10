import { get, put } from "@/utils/functions";

const AZURE_API_BASE_URL =
  process.env.NEXT_PUBLIC_INSTARECAP_API_BASE_URL ??
  "https://instarecap-app.ambitiousforest-1ab41110.centralindia.azurecontainerapps.io/api/";

/**
 * fetchWallFamePhotos
 * Centralized API for Wall-Fame images.
 * Usage in components (e.g., `left.jsx`):
 *   import { fetchWallFamePhotos } from "@/utils/data";
 *   const photos = await fetchWallFamePhotos(); // returns Array<{ src, alt }>
 */
export async function fetchWallFamePhotos() {
  try {
    const responseBody = await get("/wall-fame");

    const rawItems = Array.isArray(responseBody)
      ? responseBody
      : Array.isArray(responseBody?.data)
      ? responseBody.data
      : Array.isArray(responseBody?.items)
      ? responseBody.items
      : [];

    return rawItems
      .map((item, index) => {
        const src =
          item?.src || item?.url || item?.image || item?.imageUrl || item?.photoUrl || item?.photo;
        if (!src) return null;
        const alt = item?.alt || item?.title || item?.caption || `Wall fame photo ${index + 1}`;
        return { src, alt };
      })
      .filter(Boolean);
  } catch (error) {
    console.error("fetchWallFamePhotos failed", error);
    return [];
  }
}

// Resolve event by hostname (with fallbacks)
export async function getEventByDomain(domain = null) {
  const fallbackDomains = [
   
    "localhost:3000",

  ];

  let hostname = domain ?? null;
  if (typeof window !== "undefined") {
    hostname = window.location.hostname;
    console.log("hostnamewwwwww", hostname);
  }
  if (!hostname || fallbackDomains.includes(hostname)) {
    hostname = "testing.eventhex.ai";
  }

  const response = await get("/auth/domain-event", { params: { domain: hostname } });
  return response;
}

export async function getEventDetails(domain = null) {
  const eventByDomain = await getEventByDomain(domain);
  console.log("eventByDomain", eventByDomain);
  return eventByDomain;
}
