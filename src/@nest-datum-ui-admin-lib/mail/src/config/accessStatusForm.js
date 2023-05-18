
const accessStatusForm = {
	parentName: 'mailAccessStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'accesses/statuses/:id',
	pageTitle: 'Status',

	id: 'mail-accesses-statuses-form',
	storeName: 'mail-accesses-statuses-form',
	apiUrl: 'access-status',
	orderInHeaderTabMenu: 2,
	manage: {
		create: {
			text: 'Save',
			order: 0,
		},
		dropOnRemovable: {
			text: 'Disable',
			order: 1,
		},
	},
};

export default accessStatusForm;
