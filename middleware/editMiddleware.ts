export default defineNuxtRouteMiddleware((to, from) => {
	const mainStore = useMainStore();

	if (!mainStore.getTaskByTaskId(to.params.id as string)) {
        return abortNavigation()
	}
});
