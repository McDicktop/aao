import { useSelector } from 'react-redux'

function News() {
    const gallery = useSelector((state) => state.gallery);

    return (
        <div className='flex flex-col gap-10 items-center h-[calc(100vh-5rem)] overflow-auto py-10'>
            {gallery.posters && gallery.posters.length &&
                gallery.posters.filter((item) => item.status).map((poster, ind) =>
                    <img
                        key={`ind_${ind}`}
                        className='w-120 rounded-2xl'
                        src={poster.image}
                        alt={`poster_${ind}`}
                    />
                )
            }
        </div>
    )
}

export default News