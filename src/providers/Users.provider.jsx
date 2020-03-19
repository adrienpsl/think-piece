import React, { createContext, useEffect, useState } from 'react';
import { auth, createUserProfileDocument } from '../firebase';


export const UserContext = createContext( null );

export default function UserProvider( { children } ) {

	const [ user, setUser ] = useState( undefined );

	useEffect( userSubscription, [] );

	function userSubscription() {
		const unsubscribeFromAuth =
							auth.onAuthStateChanged( async userAuth => {
								if ( userAuth ) {
									const userRef = await createUserProfileDocument( userAuth );

									userRef.onSnapshot( snapshot => {
										const user = { uid: snapshot.id, ...snapshot.data() };
										setUser( user );
									} );

								}
							} );
		return () => unsubscribeFromAuth();
	}

	const value = { user };
	return (
			<UserContext.Provider value={ value }>
				{ children }
			</UserContext.Provider>
	);
}
