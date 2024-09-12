export default defineNuxtRouteMiddleware((to) => {
	const mainStore = useMainStore();

	if (!mainStore.getTaskByTaskId(to.params.id as string)) {
        return abortNavigation()
	}
});
