import React, { useContext } from 'react';
import { PostsContext } from '../providers/Posts.provider';
import AddPost from './AddPost';
import Post from './Post';

function DisplayAllPosts( posts ) {
	return posts.map( post => <Post { ...post } key={ post.id }/> );
}

const Posts = () => {
	const { posts } = useContext( PostsContext );

	return (
			<section className="Posts">
				<AddPost/>
				{ DisplayAllPosts( posts ) }
			</section>
	);
};

export default Posts;
