import React, { createContext, useEffect, useState } from 'react';
import { getPostsCollection } from '../firebase';
import { collectIdsAndDocs } from '../utilities';

export const PostsContext = createContext( undefined );

export default function PostsProvider( { children } ) {
	useEffect( postsSubscription, [] );
	const [ posts, setPosts ] = useState( [] );

	function postsSubscription() {
		const onSnapshot = ( { docs } ) => {
			setPosts( docs.map( collectIdsAndDocs ) );
		};

		const unsubscribe =
							getPostsCollection()
							.onSnapshot( onSnapshot );

		return () => unsubscribe();
	}

	const value = { posts };

	return (
			<PostsContext.Provider value={ value }>
				{ children }
			</PostsContext.Provider>
	);
}

