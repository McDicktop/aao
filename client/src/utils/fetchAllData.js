import { getGalleries } from "../api/images";
import { getImages } from "../api/images";
import { getPosts } from "../api/posts";

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

  const posts = await getPosts();

  if (posts.message) {
    alert(
      `Error: ${posts?.response?.data?.message || posts.message}. Reload page`
    );
    return;
  }

  return { galleries, images, posts };
}
