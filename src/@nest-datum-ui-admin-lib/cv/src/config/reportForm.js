
const reportForm = {
	parentName: 'cvReport',
	statusName: 'cvReportStatus',
	statusListName: 'cvReportStatusList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'report',

	pageUrl: 'reports/:id',
	pageTitle: 'Report',

	id: 'cv-report-form',
	storeName: 'cv-report-form',
	apiUrl: 'report',
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

export default reportForm;
