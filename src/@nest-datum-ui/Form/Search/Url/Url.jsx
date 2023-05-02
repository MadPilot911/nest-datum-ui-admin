import React from 'react';
import PropTypes from 'prop-types';
import { 
	ContextService,
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import { 
	actionApiListProp,
	actionUrlQuery, 
} from '@nest-datum-ui/Store';
import Search from '../Search.jsx';

let Url = ({ onSearch, ...props }) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: { 
				storeName, 
			}, 
		}, 
	} = React.useContext(ContextProps);
	const onSearchWrapper = React.useCallback((value) => {
		actionApiListProp(storeName, 'loader', true)(() => {
			actionUrlQuery(value);
			onSearch(value);
		});
	}, [
		onSearch,
		storeName,
	]);

	return <Search { ...props } onSearch={onSearchWrapper} />;
};

Url = React.memo(Url);
Url.defaultProps = {
	onSearch: () => {},
};
Url.propTypes = {
	onSearch: PropTypes.func,
};

export default Url;
