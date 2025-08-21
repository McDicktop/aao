import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentGallery } from "../../../features/gallerySlice";
import { ArrowBigRight } from "lucide-react";
import Modal from "../../layout/Modal";

function ArtworkView({ isOpen, onClose, gallery }) {
    const dispatch = useDispatch();
    const [artwork, setArtwork] = useState(null);
    const [targetGallery, setTargetGallery] = useState(null);

    useEffect(() => {
        if (gallery.currentArtwork) {
            const current = gallery.galleries.find((item) =>
                item.content.includes(gallery.currentArtwork)
            );

            setTargetGallery(current);

            setArtwork(
                gallery.images.find(
                    (item) => item._id === gallery.currentArtwork
                )
            );
        }
    }, [gallery]);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                {artwork && targetGallery && (
                    <div>
                        <div className="relative w-6xl h-[80vh] rounded-md overflow-hidden pointer-events-none">
                            <img
                                src={artwork.filename}
                                alt={`Photo ${artwork.title.en}`}
                                className="absolute z-20 w-fit max-w-[90%] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-fit max-h-full rounded-md object-contain scale-98 duration-300 transition-all"
                            />

                            <img
                                src={artwork.filename}
                                alt={`Photo ${artwork.title.en}`}
                                className="absolute z-10 w-full h-full object-cover blur-md opacity-70 scale-120 duration-300 transition-all"
                            />
                        </div>

                        <div className="w-full h-28 flex gap-[] justify-between text-neutral-300 mt-4 text-sm">
                            <div className="w-7 font-semibold text-neutral-950">
                                <p>EN:</p>
                                <p>ES:</p>
                                <p>RU:</p>
                            </div>

                            <div className="w-160">
                                <p className="truncate">{artwork.title.en}</p>
                                <p className="truncate">{artwork.title.es}</p>
                                <p className="truncate">{artwork.title.ru}</p>
                            </div>

                            <div className="w-40">
                                <p className="truncate">{artwork.description.en}</p>
                                <p className="truncate">{artwork.description.es}</p>
                                <p className="truncate">{artwork.description.ru}</p>
                            </div>

                            <div className=" w-40 flex flex-col">
                                <p className="truncate">{`${artwork.size.width} x ${artwork.size.height} cm`}</p>
                                <p className="truncate">{`${(
                                    artwork.size.width / 2.54
                                ).toFixed(1)} x ${(
                                    artwork.size.height / 2.54
                                ).toFixed(1)} in`}</p>
                                <div
                                    className="flex items-center  cursor-pointer text-center"
                                    onClick={() => {
                                        dispatch(
                                            setCurrentGallery(targetGallery._id)
                                        );
                                        onClose();
                                    }}
                                >
                                    <p className="truncate font-semibold w-40">
                                        {`TO ${targetGallery.title.en.toUpperCase()}`}
                                    </p>

                                    <ArrowBigRight className="size-10" />
                                </div>
                            </div>

                            <div className="w-28 flex justify-center flex-col">
                                <img
                                    className="cursor-pointer rounded-md"
                                    onClick={() => {
                                        dispatch(
                                            setCurrentGallery(targetGallery._id)
                                        );
                                        onClose();
                                    }}
                                    src={`${targetGallery.cover}`}
                                    alt={`gallery ${targetGallery.title.en}`}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}

export default ArtworkView;