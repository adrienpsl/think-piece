import React, { useEffect, useState } from 'react';
import { firestore, getPostsCollection } from '../firebase';
import { collectIdsAndDocs } from '../utilities';

import Posts from './Posts';

async function fetchAllPosts( setPost ) {
	const snapshot = await firestore.collection( 'posts' )
																	.get();
	const posts = snapshot.docs.map( collectIdsAndDocs );
	setPost( { posts } );
}

async function createNewPosts( { post, addPostToState, state } ) {
	const { posts } = state;

	// put in the database, and get back document ref
	const docReference = await
			getPostsCollection()
			.add( post );

	// return the document
	const doc = await docReference.get();
	const newPost = collectIdsAndDocs( doc );

	addPostToState( { posts: [ newPost, ...posts ] } );
}

export default function Application() {

	const [ state, setState ] = useState( { posts: [] } );

	const handleCreate = ( post ) => createNewPosts( { post, setState, state } );

	useEffect(
			() => setState |> fetchAllPosts,
			[]
	);

	return (
			<main className="Application">
				<h1>Think Piece</h1>
				<Posts posts={ state.posts } onCreate={ handleCreate }/>
			</main>
	);
}
