// I ask only for the app,
// That's avoid all other bundle, like message...
import * as firebase from 'firebase/app';
import 'firebase/auth';
// that's the firestore lib.
// I'll export it in bottom
import 'firebase/firestore';


const firebaseConfig = {
	apiKey           : 'AIzaSyD4ml4PBtyiIw99J5O_8OebtEYcnL569gA',
	authDomain       : 'think-piece-live-282ba.firebaseapp.com',
	databaseURL      : 'https://think-piece-live-282ba.firebaseio.com',
	projectId        : 'think-piece-live-282ba',
	storageBucket    : 'think-piece-live-282ba.appspot.com',
	messagingSenderId: '224038955043',
	appId            : '1:224038955043:web:d6d3d90a80cda9af7b6996',
	measurementId    : 'G-C8KDH3LDVK'
};

// Initialize Firebase
firebase.initializeApp( firebaseConfig );
// firebase.analytics();

// todo: comment that
// For debugging in the console with chrome
window.firebase = firebase;

// We now have a database.
export const fstore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup( provider );

//
export const createUserProfileDocument = async ( user, formData ) => {
	// no user, that will blow
	if ( !user ) return;

	// we check if a user exist
	// I first get the location of my document,
	// after and create in that location if its doesn't exits
	// ref = if there is an object => it will be at this ref
	const userRef = fstore.doc( 'users/' + user.uid );
	// I try to fetch the document
	const snapshot = await userRef.get();

	if ( !snapshot.exists ) {
		const { email, displayName, photoURL } = user;
		const createAt = new Date();
		try {
			await userRef.set( {
				email,
				displayName,
				photoURL,
				createAt, ...formData
			} );
		}
		catch ( e ) {
			console.error( e );
		}
	}
	return getUserDocument( user.uid );
};

export const getUserDocument = uid => {
	if ( !uid ) return undefined;

	try {
		return fstore.collection( 'users' )
								 .doc( uid );

	}
	catch ( e ) { console.error( 'getUserDocument', e ); }
};


// collections name
export const POSTS = 'posts';
export const getPostsCollection = () => fstore.collection( POSTS );


export default firebase;
