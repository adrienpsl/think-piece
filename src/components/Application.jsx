import React from 'react';

import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import PostsProvider from '../providers/Posts.provider';
import UserProvider from '../providers/Users.provider';
import Authentication from './Authentication';

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

								<Route exact path="/">
									<Posts/>
								</Route>

								<Route exact path="/profile">
									<UserProfile/>
								</Route>

							</Switch>

						</main>
					</UserProvider>
				</PostsProvider>
			</BrowserRouter>
	);
}

