import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fstore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';
import Comments from './Comments';
import Post from './Post';


function usePost( postId ) {
	const postRef = fstore.doc( `posts/${ postId }` );

	const [ post, setPost ] = useState( null );
	useEffect( subscribeToPost, [] );

	function subscribeToPost() {
		const unsubscribe = postRef.onSnapshot( snap => {
			const post = collectIdsAndDocs( snap );
			setPost( post );
		} );
		return () => unsubscribe();
	}

	return { post, postRef };
}

function useComment( postRef ) {
	const [ comments, setComments ] = useState( [] );
	const commentRef = postRef.collection( 'comments' );

	function subscribeToComment() {
		const unsubscribe = commentRef.onSnapshot( snap => {
			const comments = snap.docs.map( collectIdsAndDocs );
			setComments( comments );
		} );
		return () => unsubscribe();
	}

	useEffect( subscribeToComment, [] );

	return { comments, commentRef };
}

function PostPage() {

	const { id } = useParams();
	const { post, postRef } = usePost( id );
	const { comments, commentRef } = useComment( postRef );


	async function createComment( comment ) {
		await commentRef.add( { content: comment } );
	}

	return (
			<section>
				{ post && <Post { ...post }/> }
				<Comments comments={ comments } postId={ post ? post.id : undefined }
									onCreate={ createComment }/>
			</section>
	);
}

export default PostPage;
