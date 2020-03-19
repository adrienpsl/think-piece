import React, { useContext, useRef, useState } from 'react';
import { auth, fstore } from '../firebase';
import { UserContext } from '../providers/Users.provider';

const getUid = () => auth.currentUser.uid;
const getUserRef = () => fstore.doc( 'users/' + getUid() );

export default function UserProfile() {
	const { user } = useContext( UserContext );

	const [ displayName, setDisplayName ] = useState( user ? user.displayName : '' );
	const [ imageInput, setImageInput ] = useState( null );

	const refInput = useRef( undefined );

	const handleSubmit = async event => {
		event.preventDefault();
		console.log( displayName, user );

		if ( displayName ) {
			const userRef = getUserRef( user );
			await userRef.update( { displayName } );
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
