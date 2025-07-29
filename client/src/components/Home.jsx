import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Gallery from "./common/site/Gallery";
import Navigation from "./Navigation";

function Home() {
  const navigate = useNavigate();
  const gallery = useSelector((state) => state.gallery);

  return (
    <div className="flex flex-col justify-center items-center">
      <Navigation />
      <div className="flex w-250 min-w-250 flex-wrap gap-16 justify-center mt-10">
        {gallery.galleries.length &&
          gallery.galleries.filter((item) => item.title.en !== 'root').map((el, ind) => (
            <div
              // className="border border-gray-300/0 hover:border-yellow-400 rounded-2xl border-[2px] duration-300"
              key={`ind_${ind}`}
            >
              <Gallery gallery={el} />
            </div>

          ))}
      </div>
    </div>
  );
}

export default Home;