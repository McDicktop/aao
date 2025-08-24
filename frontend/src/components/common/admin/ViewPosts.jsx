import Post from "./Post"

function ViewPosts({ gallery }) {

    return (
        <div className="text-neutral-300 rounded-2xl ml-3 my-3 min-w-140 max-w-140 h-[calc(100vh-1.5rem)] overflow-y-auto overflow-x-hidden relative">

            <div className="mt-6 mb-4 flex items-center justify-between px-4">
                <p className="text-xl font-medium truncate pr-4">Posters</p>
            </div>


            <div className="flex flex-col justify-center">
                {/* {console.log(gallery)} */}
                {gallery && gallery.posts && gallery.posts.map((post, ind) => <Post key={`ind_${ind}`} post={post} index={ind} />)}
                {/* {filteredContent.length ? (
                    <div className="">
                        {filteredContent.map((el, ind) => (
                            <Artwork key={`ind_${ind}`} artwork={el} />
                        ))}
                    </div>
                ) : (
                    <p className="p-3">No artworks found</p>
                )} */}
            </div>



        </div>
    )
}

export default ViewPosts