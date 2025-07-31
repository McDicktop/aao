import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Gallery({ gallery }) {

    const app = useSelector((state) => state.app);

    const navigate = useNavigate()
    return (
        <div className='text-neutral-700 hover:text-neutral-500 duration-300'>
            <img
                onClick={() => {
                    navigate(`/gallery/${gallery._id}`);
                }}
                src={gallery.cover}
                alt="image"
                className="aspect-[4/4] w-64 h-64 object-cover cursor-pointer rounded-2xl duration-300 hover:blur-[1px] hover:opacity-80"
            />
            <p className='font-semibold text-2xl  text-center select-none'>{gallery.title[app.language]}</p>
        </div>
    )
}

export default Gallery