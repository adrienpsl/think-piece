import React, { useEffect, useState } from 'react';
import { auth, getPostsCollection } from '../firebase';
import { collectIdsAndDocs } from '../utilities';
import Authentication from './Authentication';

import Posts from './Posts';


export default function Application() {

	useEffect( postsSubscription, [] );
	useEffect( userSubscription, [] );

	const [ posts, setPosts ] = useState( [] );
	const [ user, setUser ] = useState( undefined );

	function userSubscription() {
		const unsubscribeFromAuth =
							auth.onAuthStateChanged( userResult => {
								setUser( userResult );
							} );
		return () => unsubscribeFromAuth();
	}

	function postsSubscription() {
		const onSnapshot = ( { docs } ) => {
			setPosts( docs.map( collectIdsAndDocs ) );
		};

		const unsubscribe =
							getPostsCollection()
							.onSnapshot( onSnapshot );

		return () => unsubscribe();
	}


	return (
			<main className="Application">
				<h1>Think Piece</h1>
				<Authentication user={ user }/>
				<Posts posts={ posts }/>
			</main>
	);
}

