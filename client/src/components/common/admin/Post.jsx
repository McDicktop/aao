import React from 'react'

function Post({ post, ind }) {
    return (
        <div>
            <img
                alt={`Poster_${ind}`}
                className={`cursor-pointer size-18 flex-shrink-0 rounded-lg object-cover duration-50  `}
                src={post.image}
            />
        </div>
    )
}

export default Post;