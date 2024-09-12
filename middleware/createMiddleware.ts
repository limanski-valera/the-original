import { statuses } from '~/constants/data';

export default defineNuxtRouteMiddleware((to) => {
	const paramsStatus = to.params.status as statuses;

	if (paramsStatus) {
		const isStatusValid = Object.values(statuses).includes(paramsStatus);

		if (!isStatusValid) return abortNavigation();
	}
});
