import React, { useContext, useRef, useState } from 'react';
import { auth, fstore, storage } from '../firebase';
import { UserContext } from '../providers/Users.provider';

const getUid = () => auth.currentUser.uid;
const getUserRef = () => fstore.doc( 'users/' + getUid() );
const getFile = imageInput => imageInput && imageInput.files[ 0 ];

export default function UserProfile() {
	const { user } = useContext( UserContext );

	const [ displayName, setDisplayName ] = useState( user ? user.displayName : '' );

	const refInput = useRef( undefined );

	const handleSubmit = async event => {
		event.preventDefault();
		console.log( displayName, user );

		if ( displayName ) {
			await getUserRef( user )
			.update( { displayName } );
		}

		const file = getFile( refInput.current );
		if ( file ) {
			storage.ref()
						 .child( 'user-profiles' )
						 .child( getUid() )
						 .child( file.name )
						 .put( file )
						 .then( ( { ref } ) => ref.getDownloadURL() )
						 .then( photoURL =>
								 getUserRef()
								 .update( { photoURL } )
						 );
		}

	};

	return (
			<div>
				<section className="UserProfile">
					<form onSubmit={ handleSubmit }>

						<input type="text"
									 onChange={ e => setDisplayName( e.target.value ) }
									 value={ displayName }
									 name="displayName"/>

						<input type="file" ref={ refInput }/>

						<button type="submit">ok</button>
					</form>
				</section>
			</div>
	);
}
