import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Group = (props) => {
	const { 
		dictionary: { 
			dictionaryAccess,
			dictionaryetting,
			dictionaryForm,
			dictionaryField,
			dictionaryContent,
		}, 
	} = React.useContext(ContextProps);
	const { pathname } = useLocation();
	const isFormGroup = pathname.indexOf(dictionaryForm.pageFullUrl) === 0;
	const isFormGroupOptions = pathname.indexOf(`${dictionaryForm.pageFullUrl}/options`) === 0;
	const isFormGroupStatuses = pathname.indexOf(`${dictionaryForm.pageFullUrl}/statuses`) === 0;
	const isFieldGroup = pathname.indexOf(dictionaryField.pageFullUrl) === 0;
	const isFieldGroupOptions = pathname.indexOf(`${dictionaryField.pageFullUrl}/options`) === 0;
	const isFieldGroupStatuses = pathname.indexOf(`${dictionaryField.pageFullUrl}/statuses`) === 0;
	const isContentGroup = pathname.indexOf(dictionaryContent.pageFullUrl) === 0;
	const isContentGroupStatuses = pathname.indexOf(`${dictionaryContent.pageFullUrl}/statuses`) === 0;
	const isAccessesGroup = pathname.indexOf(dictionaryAccess.pageFullUrl) === 0;
	const isAccessesGroupOptions = pathname.indexOf(`${dictionaryAccess.pageFullUrl}/options`) === 0;
	const isAccessesGroupStatuses = pathname.indexOf(`${dictionaryAccess.pageFullUrl}/statuses`) === 0;

	return (pathname.indexOf(dictionaryetting.pageFullUrl) === -1)
		&& <StyledWrapper { ...props }>
			{([{
				text: 'Data',
				check: isFormGroup
					? [{
						flag: (pathname.length > dictionaryForm.pageFullUrl.length && (isFormGroupOptions || isFormGroupStatuses)),
						to: dictionaryForm.pageFullUrl,
					}]
					: (isFieldGroup
						? [{
							flag: (pathname.length > dictionaryField.pageFullUrl.length && (isFieldGroupOptions || isFieldGroupStatuses)),
							to: dictionaryField.pageFullUrl,
						}]
						: (isContentGroup
							? [{
								flag: (pathname.length > dictionaryContent.pageFullUrl.length && isContentGroupStatuses),
								to: dictionaryContent.pageFullUrl,
							}]
							: (isAccessesGroup
								? [{
									flag: (pathname.length > dictionaryAccess.pageFullUrl.length && (isAccessesGroupOptions || isAccessesGroupStatuses)),
									to: dictionaryAccess.pageFullUrl,
								}]
								: []))),
			}, 
			...isContentGroup
				? []
				: [{
					text: 'Options',
					check: isFormGroup
						? [{
							flag: !isFormGroupOptions,
							to: `${dictionaryForm.pageFullUrl}/options`,
						}]
						: (isFieldGroup
							? [{
								flag: !isFieldGroupOptions,
								to: `${dictionaryField.pageFullUrl}/options`,
							}]
							: (isAccessesGroup
								? [{
									flag: !isAccessesGroupOptions,
									to: `${dictionaryAccess.pageFullUrl}/options`,
								}]
								: [])),
				}], 
			{
				text: 'Statuses',
				check: isFormGroup
					? [{
						flag: !isFormGroupStatuses,
						to: `${dictionaryForm.pageFullUrl}/statuses`,
					}]
					: (isFieldGroup
						? [{
							flag: !isFieldGroupStatuses,
							to: `${dictionaryField.pageFullUrl}/statuses`,
						}]
						: (isContentGroup
							? [{
								flag: !isContentGroupStatuses,
								to: `${dictionaryContent.pageFullUrl}/statuses`,
							}]
							: (isAccessesGroup
								? [{
									flag: !isAccessesGroupStatuses,
									to: `${dictionaryAccess.pageFullUrl}/statuses`,
								}]
								: []))),
			}])}
		</StyledWrapper>;
};

Group = React.memo(Group);
Group.defaultProps = {
};
Group.propTypes = {
};

export default Group;
