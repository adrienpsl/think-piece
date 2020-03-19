import React from 'react';
import { UserContext } from '../providers/Users.provider';

function getDisplayName( WrappedComponent ) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withUser = Component => {

	const WrappedComponent = props => {
		return (
				<UserContext.Consumer>
					{ user => <Component user={ user } { ...props }/> }
				</UserContext.Consumer>
		);
	};

	WrappedComponent.displayName = `withUser(${ getDisplayName( Component ) })`;

	return WrappedComponent;
};


export default withUser;
