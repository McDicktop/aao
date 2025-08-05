import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleForm } from "../features/appSlice";
import ViewGalleries from "./common/admin/ViewGalleries";
import ViewImages from "./common/admin/ViewImages";
import ViewPosts from "./common/admin/ViewPosts";
import Loader from "./common/Loader";
import UploadImageForm from "./common/Forms/UploadImageForm";
import EditArtworkForm from "./common/Forms/EditArtworkForm";
import CreateGalleryForm from "./common/Forms/CreateGalleryForm";
import EditGalleryForm from "./common/Forms/EditGalleryForm";
import ArtworkView from "./common/Forms/ArtworkView";


function AdminPanel() {

  const gallery = useSelector((state) => state.gallery);
  const app = useSelector((state) => state.app);

  const dispatch = useDispatch();

  const closeForm = (form) => {
    dispatch(handleForm({ form, isOpen: false }));
  };
  const openForm = (form) => {
    dispatch(handleForm({ form, isOpen: true }));
  };

  const [search, setSearch] = useState("");

  const handleSearch = (str) => {
    setSearch(str);
  };

  if (!gallery.galleries || gallery.galleries.length === 0) return <Loader />;

  return (
    <div className="bg-neutral-800 flex">
      <ViewGalleries
        modalOpen={openForm}
        gallery={gallery}
        search={search}
        handleSearch={handleSearch}
      />
      <ViewImages gallery={gallery} search={search} />
      <ViewPosts gallery={gallery} />

      {app.uploadArtworkForm && (
        <UploadImageForm
          isOpen={app.uploadArtworkForm}
          onClose={() => closeForm("uploadArtwork")}
          gallery={gallery}
        />
      )}
      {app.editArtworkForm && (
        <EditArtworkForm
          isOpen={app.editArtworkForm}
          onClose={() => closeForm("editArtwork")}
          gallery={gallery}
        />
      )}
      {app.createGalleryForm && (
        <CreateGalleryForm
          isOpen={app.createGalleryForm}
          onClose={() => closeForm("createGallery")}
        />
      )}
      {app.editGalleryForm && (
        <EditGalleryForm
          isOpen={app.editGalleryForm}
          onClose={() => closeForm("editGallery")}
          gallery={gallery}
        />
      )}
      {app.artworkView && (
        <ArtworkView
          isOpen={app.artworkView}
          onClose={() => closeForm("artworkView")}
          gallery={gallery}
        />
      )}
    </div>
  );
}

export default AdminPanel;
