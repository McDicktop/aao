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
    <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] overflow-auto py-10 select-none border ">
      <div className="flex w-250 min-w-250 min-h-72 max-h-full flex-wrap gap-16 justify-center">
        {sorted &&
          sorted.filter((item) => item.title.en !== 'root' && item.status).map((el, ind) => (
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