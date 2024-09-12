import type { statuses } from '~/constants/data';
import type { ITask } from '~/constants/interfaces';

export const useDragAndDrop = () => {
	const mainStore = useMainStore();

	const dragTask = ref<any>(null);
	const startStatus = ref<statuses | null>(null);

	function handleDragStart(task: ITask, status: statuses) {
		dragTask.value = task;
		startStatus.value = status;
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
	}

	function handleDrop(targetColumnStatus: statuses) {
		if (dragTask.value && startStatus.value) {
			mainStore.updateTaskStatus(dragTask.value.id, targetColumnStatus);
		}
	}

	return { handleDragStart, handleDragOver, handleDrop };
};
