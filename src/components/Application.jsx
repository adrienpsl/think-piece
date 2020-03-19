import React from 'react';

import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import PostsProvider from '../providers/Posts.provider';
import UserProvider from '../providers/Users.provider';
import Authentication from './Authentication';
import PostPage from './PostPage';

import Posts from './Posts';
import UserProfile from './UserProfile.component';

export default function Application() {

	return (
			<BrowserRouter>
				<PostsProvider>
					<UserProvider>
						<main className="Application">
							<Link to="/"><h1>Think Piece</h1></Link>
							<Authentication/>

							<Switch>

								<Route exact path="/" children={ <Posts/> }/>

								<Route exact path="/profile">
									<UserProfile/>
								</Route>

								<Route exact path="/post/:id">
									<PostPage/>
								</Route>

							</Switch>

						</main>
					</UserProvider>
				</PostsProvider>
			</BrowserRouter>
	);
}

