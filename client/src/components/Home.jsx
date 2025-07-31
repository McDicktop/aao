import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Gallery from "./common/site/Gallery";

function Home() {
  const gallery = useSelector((state) => state.gallery);
  const [sorted, setSorted] = useState(null);

  useEffect(() => {
    if (gallery.galleries.length) {
      const newArr = [...gallery.galleries];
      setSorted(newArr.sort((a, b) => a.position - b.position));
    }
  }, [gallery]);

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-5rem)] overflow-auto pt-50 pb-10">
      <div className="flex w-250 min-w-250 flex-wrap gap-16 justify-center mt-10">
        {sorted &&
          sorted.filter((item) => item.title.en !== 'root').map((el, ind) => (
            <div
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