// I ask only for the app,
// That's avoid all other bundle, like message...
import * as firebase from 'firebase/app';
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
export const firestore = firebase.firestore();

export default firebase;

// collections name
export const POSTS = 'posts';
export const getPostsCollection = () => firestore.collection( POSTS );











