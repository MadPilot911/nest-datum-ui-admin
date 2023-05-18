import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import { 
	selectorMainExtract,
	actionApiFormDrop, 
} from '@nest-datum-ui/Store';
import Box from '@mui/material/Box';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import Dialog from '@nest-datum-ui/Dialog';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';

let Many = ({
	id,
	content,
	...props
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: { 
				storeName, 
				system: {
					apiFullUrl: systemApiUrl,
				}, 
			}, 
		}, 
	} = React.useContext(ContextProps);
	const ids = useSelector(selectorMainExtract([ 'dialog', id, 'ids' ]));
	const onSubmit = React.useCallback(() => actionApiFormDrop(storeName, { apiUrl: systemApiUrl, ids })(), [
		storeName,
		systemApiUrl,
		ids,
	]);

	return <Dialog actions={<ButtonPrimary onClick={onSubmit}>OK</ButtonPrimary>} id={id} { ...props }>
		{content 
			&& <DialogContentText component="div">
				{content}
				<Box pt={2}>
					<Typography component="div" variant="caption">
						Items:
					</Typography>
					<ul style={{ margin: '0px' }}>
						{(ids || []).map((id) => <li key={id}>{id}</li>)}
					</ul>
				</Box>
			</DialogContentText>}
	</Dialog>;
};

Many = React.memo(Many);
Many.defaultProps = {
	id: 'drop-many',
	title: 'Delete selected items?',
	content: 'Are you sure you want to delete selected items? This operation is irreversible and may compromise data integrity.',
	onSubmit: () => {},
};
Many.propTypes = {
	onSubmit: PropTypes.func,
};

export default Many;