import React from "react";
import AddPost from "./AddPost";
import Post from "./Post";

const Posts = ( { posts, onCreate } ) => {
	return (
			<section className="Posts">
				<AddPost onCreate={ onCreate }/>
				{ posts.map( post => <Post { ...post } key={ post.id }/> ) }
			</section>
	);
};

export default Posts;
