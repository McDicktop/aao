import { getGalleries } from "../api/images";
import { getImages } from "../api/images";
import { getPosters } from "../api/posters";

export async function fetchAllData() {
  const galleries = await getGalleries();

  if (galleries.message) {
    alert(
      `Error: ${galleries?.response?.data?.message || galleries.message
      }. Reload page`
    );
    return;
  }

  const images = await getImages();

  if (images.message) {
    alert(
      `Error: ${images?.response?.data?.message || images.message}. Reload page`
    );
    return;
  }

  const posters = await getPosters();

  if (posters.message) {
    alert(
      `Error: ${posters?.response?.data?.message || posters.message}. Reload page`
    );
    return;
  }

  return { galleries, images, posters };
}
