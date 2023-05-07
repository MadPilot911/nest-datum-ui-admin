import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { 
	ContextService,
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import { 
	selectorMainExtract,
	actionDialogOpen,
	actionApiFormRestore,
} from '@nest-datum-ui/Store';
import { 
	strId as utilsCheckStrId,
	strIdExists as utilsCheckStrIdExists, 
} from '@nest-datum-utils/check';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import Field from '@nest-datum-ui/Field';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';
import FormOptionValue from 'components/Form/Option/Value';
import TypographyFetch from '@nest-datum-ui/Typography/Fetch';
import InputFloat from '@nest-datum-ui/Input/Float';
import ListRelation from 'components/List/Relation';
import Select from 'components/Select';
import InputId from 'components/Input/Id';
import InputName from 'components/Input/Name';
import InputDescription from 'components/Input/Description';
import InputIsNotDelete from 'components/Input/IsNotDelete';
import DialogDrop from 'components/Dialog/Drop';
import DialogDisable from 'components/Dialog/Disable';
import DialogDropForce from 'components/Dialog/Drop/Force';
import DialogPostRelation from '../../Dialog/Post/Relation';
import StyledWrapper from './Styled/Wrapper.jsx';
import handlerSubmit from './handler/submit.js';

let Post = () => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: { 
			[routeName]: {
				statusListName,
				optionName,
				optionFormName,
				optionListName,
				storeName,
				apiFullUrl: apiUrl,
				id,
				relationContentListName,
			}, 
			jobsCategoryList: {
				storeName: jobsCategoryStoreName,
				apiFullUrl: jobsCategoryApiUrl,
			},
			jobsCategoryOptionList: {
				apiFullUrl: relationApiUrl,
			},
			jobsCompanyList: {
				storeName: jobsCompanyStoreName,
				apiFullUrl: jobsCompanyApiUrl,
			},
		}, 
		countries: {
			countriesRegionList: {
				storeName: countriesRegionStoreName,
				apiFullUrl: countriesRegionApiUrl,
			},
		}
	} = React.useContext(ContextProps);
	const { 
		[serviceName]: { 
			[statusListName]: { 
				storeName: statusStoreName, 
				apiFullUrl: statusApiUrl,
			}, 
			[optionFormName]: {
				relationListName: optionRelationListName,
			}, 
			[optionListName]: {
				storeName: optionListStoreName,
			},
			[optionName]: {
				fieldsBlock,
			},
		}, 
	} = React.useContext(ContextProps);
	const { 
		[serviceName]: {
			[optionRelationListName]: {
				entity: optionRelationListEntity,
				entityOptionRelation: optionRelationListEntityOptionRelation,
				formName: optionRelationListFormName,
			},
		}, 
	} = React.useContext(ContextProps);
	const { 
		[serviceName]: {
			[optionRelationListFormName]: {
				post: {
					apiFullUrl: optionRelationListApiUrl,
				},
			},
		},
	} = React.useContext(ContextProps);
	const { entityId } = useParams();
	const isNotDelete = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'isNotDelete' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'isDeleted' ]));
	const onDrop = React.useCallback(() => actionDialogOpen(isDeleted ? 'drop' : 'disable', { entityId })(), [
		entityId,
		isDeleted,
	]);
	const onRestore = React.useCallback(() => actionApiFormRestore(storeName, { apiUrl, entityId })(), [
		storeName,
		apiUrl,
		entityId,
	]);
	const onSubmitWrapper = React.useCallback((e) => handlerSubmit(e, { 
		storeName, 
		optionListStoreName, 
		optionRelationListEntity, 
		optionRelationListEntityOptionRelation, 
		apiUrl, 
		optionRelationListApiUrl, 
		entityId, 
	}), [
		entityId,
		storeName,
		optionListStoreName,
		optionRelationListEntity,
		optionRelationListEntityOptionRelation,
		apiUrl,
		optionRelationListApiUrl,
	]);
	const initialFilter = React.useMemo(() => ({ postId: entityId }), [
		entityId,
	]);

	return <StyledWrapper
		storeName={storeName} 
		id={id} 
		apiUrl={apiUrl}
		onSubmit={onSubmitWrapper}
		loadOnFirstRender>
		<Box py={1}>
			<Field
				Component={InputId}
				form={id}
				name="id" />
		</Box>
		<Box py={1}>
			<Field
				Component={InputName}
				form={id}
				name="name"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputDescription}
				form={id}
				name="description" />
		</Box>
		<Box py={1}>
			<Field
				Component={React.memo((props) => <Select 
					{ ...props }
					storeName={jobsCategoryStoreName}
					apiUrl={jobsCategoryApiUrl} />)}
				form={id}
				itemKey="name"
				name="categoryId"
				label="Category"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={React.memo((props) => <Select 
					{ ...props }
					storeName={jobsCompanyStoreName}
					apiUrl={jobsCompanyApiUrl} />)}
				form={id}
				itemKey="name"
				name="companyId"
				label="Company"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={React.memo((props) => <Select 
					{ ...props }
					storeName={countriesRegionStoreName}
					apiUrl={countriesRegionApiUrl} />)}
				form={id}
				itemKey="name"
				name="locationId"
				label="Location"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputFloat}
				form={id}
				name="salary"
				label="Salary"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={React.memo((props) => <Select 
					{ ...props }
					storeName={statusStoreName}
					apiUrl={statusApiUrl} />)}
				form={id}
				itemKey="name"
				name="postStatusId"
				label="Status"
				required />
		</Box>
		<Box py={1}>
			<Field
				Component={InputIsNotDelete}
				form={id}
				type="checkbox"
				name="isNotDelete" />
		</Box>
		{(utilsCheckStrIdExists(entityId) && fieldsBlock) 
			&& <FormOptionValue loadOnFirstRender entityId={entityId} />}
		<Box pb={2}>
			<Grid container spacing={2} justifyContent="flex-end">
				<Grid
					item
					xs={false}>
					<ButtonPrimary form={id} type="submit" startIcon={<SaveIcon />}>
						Save
					</ButtonPrimary>
				</Grid>
				{(!isNotDelete && isDeleted)
					&& <Grid
						item
						xs={false}>
						<ButtonPrimary startIcon={<SettingsBackupRestoreIcon />} onClick={onRestore}>
							Restore
						</ButtonPrimary>
					</Grid>}
				{(!isNotDelete && utilsCheckStrId(entityId))
					&& <Grid
						item
						xs={false}>
						<ButtonPrimary color="error" startIcon={<DeleteIcon />} onClick={onDrop}>
							{isDeleted
								? 'Delete'
								: 'Disable'}
						</ButtonPrimary>
					</Grid>}
			</Grid>
			{utilsCheckStrIdExists(entityId) 
				&& <ContextRoute.Provider value={relationContentListName}>
					<Box py={2}>
						<Divider />
					</Box>
					<ListRelation 
						initialFilter={initialFilter}
						BottomComponent={<React.Fragment>
							<DialogDropForce reloadImmediately type="list" />
							<DialogPostRelation />
						</React.Fragment>}
						Component={({ 
							id, 
							categoryOptionId, 
							isDeleted, 
						}) => <TypographyFetch 
							key={id ?? categoryOptionId} 
							apiUrl={relationApiUrl}>
								{categoryOptionId}
							</TypographyFetch>} />
				</ContextRoute.Provider>}
		</Box>
		<DialogDrop redirect />
		<DialogDisable />
	</StyledWrapper>;
};

Post = React.memo(Post);
Post.defaultProps = {
};
Post.propTypes = {
};

export default Post;
