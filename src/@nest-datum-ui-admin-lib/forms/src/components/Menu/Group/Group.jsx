import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContextProps } from '@nest-datum-ui/Context';
import StyledWrapper from './Styled/Wrapper.jsx';

let Group = (props) => {
	const { 
		forms: { 
			formsAccess,
			formsSetting,
			formsForm,
			formsField,
			formsContent,
		}, 
	} = React.useContext(ContextProps);
	const { pathname, search } = useLocation();
	const isFormGroup = pathname.indexOf(formsForm.pageFullUrl) === 0;
	const isFormGroupOptions = pathname.indexOf(`${formsForm.pageFullUrl}/options`) === 0;
	const isFormGroupStatuses = pathname.indexOf(`${formsForm.pageFullUrl}/statuses`) === 0;
	const isFieldGroup = pathname.indexOf(formsField.pageFullUrl) === 0;
	const isFieldGroupOptions = pathname.indexOf(`${formsField.pageFullUrl}/options`) === 0;
	const isFieldGroupStatuses = pathname.indexOf(`${formsField.pageFullUrl}/statuses`) === 0;
	const isContentGroup = pathname.indexOf(formsContent.pageFullUrl) === 0;
	const isContentGroupStatuses = pathname.indexOf(`${formsContent.pageFullUrl}/statuses`) === 0;
	const isAccessesGroup = pathname.indexOf(formsAccess.pageFullUrl) === 0;
	const isAccessesGroupOptions = pathname.indexOf(`${formsAccess.pageFullUrl}/options`) === 0;
	const isAccessesGroupStatuses = pathname.indexOf(`${formsAccess.pageFullUrl}/statuses`) === 0;

	return (pathname.indexOf(formsSetting.pageFullUrl) === -1)
		&& <StyledWrapper { ...props }>
			{([{
				text: 'Data',
				check: isFormGroup
					? [{
						flag: (pathname.length > formsForm.pageFullUrl.length && (isFormGroupOptions || isFormGroupStatuses)),
						to: formsForm.pageFullUrl + search,
					}]
					: (isFieldGroup
						? [{
							flag: (pathname.length > formsField.pageFullUrl.length && (isFieldGroupOptions || isFieldGroupStatuses)),
							to: formsField.pageFullUrl + search,
						}]
						: (isContentGroup
							? [{
								flag: (pathname.length > formsContent.pageFullUrl.length && isContentGroupStatuses),
								to: formsContent.pageFullUrl + search,
							}]
							: (isAccessesGroup
								? [{
									flag: (pathname.length > formsAccess.pageFullUrl.length && (isAccessesGroupOptions || isAccessesGroupStatuses)),
									to: formsAccess.pageFullUrl + search,
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
							to: `${formsForm.pageFullUrl}/options${search}`,
						}]
						: (isFieldGroup
							? [{
								flag: !isFieldGroupOptions,
								to: `${formsField.pageFullUrl}/options${search}`,
							}]
							: (isAccessesGroup
								? [{
									flag: !isAccessesGroupOptions,
									to: `${formsAccess.pageFullUrl}/options`,
								}]
								: [])),
				}], 
			{
				text: 'Statuses',
				check: isFormGroup
					? [{
						flag: !isFormGroupStatuses,
						to: `${formsForm.pageFullUrl}/statuses${search}`,
					}]
					: (isFieldGroup
						? [{
							flag: !isFieldGroupStatuses,
							to: `${formsField.pageFullUrl}/statuses${search}`,
						}]
						: (isContentGroup
							? [{
								flag: !isContentGroupStatuses,
								to: `${formsContent.pageFullUrl}/statuses${search}`,
							}]
							: (isAccessesGroup
								? [{
									flag: !isAccessesGroupStatuses,
									to: `${formsAccess.pageFullUrl}/statuses${search}`,
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
