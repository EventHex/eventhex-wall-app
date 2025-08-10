import { get } from "@/utils/functions";

/**
 * fetchWallFamePhotos
 * Centralized API for Wall-Fame images.
 * Usage in components (e.g., `left.jsx`):
 *   import { fetchWallFamePhotos } from "@/utils/data";
 *   const photos = await fetchWallFamePhotos(); // returns Array<{ src, alt }>
 */
export async function fetchWallFamePhotos(eventId, eventData) {
  try {
    const BASE_CDN = "https://event-hex-saas.s3.amazonaws.com/";
    const toAbsoluteCdnUrl = (path) => {
      if (!path || typeof path !== "string") return null;
      if (/^https?:\/\//i.test(path) || path.startsWith("data:")) return path;
      const base = BASE_CDN.replace(/\/+$/, "");
      const key = path.replace(/^\/+/, "");
      return `${base}/${key}`;
    };

    const responseBody = await get(`/insta-snap/wall-fame?event=${eventId}`);

    const rawItems = Array.isArray(responseBody)
      ? responseBody
      : Array.isArray(responseBody?.response)
      ? responseBody.response
      : Array.isArray(responseBody?.data)
      ? responseBody.data
      : Array.isArray(responseBody?.items)
      ? responseBody.items
      : [];

    return rawItems
      .map((item, index) => {
        const preferredKey =
          item?.thumbnail ||
          item?.compressed ||
          item?.image ||
          item?.key ||
          item?.url ||
          item?.src ||
          item?.imageUrl ||
          item?.photoUrl ||
          item?.photo;

        const absolute = toAbsoluteCdnUrl(preferredKey);
        if (!absolute) return null;

        const alt =
          item?.alt ||
          item?.title ||
          item?.caption ||
          (item?.type ? `Wall photo (${item.type})` : undefined) ||
          `Wall photo ${index + 1}`;

        return { src: absolute, alt };
      })
      .filter(Boolean);
  } catch (error) {
    console.error("fetchWallFamePhotos failed", error);
    return [];
  }
}

export async function fetchSessionDetail(eventId, sessionId) {
  try {
    const baseUrl = "https://instarecap-app.ambitiousforest-1ab41110.centralindia.azurecontainerapps.io/api/sessions/event"
    const responseBody = await fetch(`${baseUrl}?eventId=${eventId}`);
    const data = await responseBody.json();
    console.log(data, "data from fetchSessionDetail");
    return data;
  } catch (error) {
    console.error("fetchSessionDetail failed", error);
    return [];
  }
}
