import { get } from "@/utils/functions";

/**
 * fetchWallFamePhotos
 * Centralized API for Wall-Fame images.
 * Usage in components (e.g., `left.jsx`):
 *   import { fetchWallFamePhotos } from "@/utils/data";
 *   const photos = await fetchWallFamePhotos(); // returns Array<{ src, alt }>
 */
export async function fetchWallFamePhotos() {
  try {
    const responseBody = await get("wall-fame");

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

