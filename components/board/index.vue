<template>
	<div class="board grid grid-cols-3 gap-4 items-start">
		<TasksList
			v-for="column in columns"
			:key="column.status"
			:list="column.list"
			:status="column.status"
			@start-drag="onDragStart"
			@dragover="dragAndDrop.handleDragOver"
			@drop="() => dragAndDrop.handleDrop(column.status)" />
	</div>
</template>

<script setup lang="ts">
import { statuses } from '~/constants/data';
import type { ITask } from '~/constants/interfaces';
import { useDragAndDrop } from '~/hooks/useDragAndDrop';

const mainStore = useMainStore();
const { sortedTasksInTodo, sortedTasksInProgress, sortedTasksInDone } = storeToRefs(mainStore);

const columns = reactive([
	{
		status: statuses.TODO,
		list: computed(() => sortedTasksInTodo.value),
	},
	{
		status: statuses.PROGRESS,
		list: computed(() => sortedTasksInProgress.value),
	},
	{
		status: statuses.DONE,
		list: computed(() => sortedTasksInDone.value),
	},
]);

const dragAndDrop = useDragAndDrop();

function onDragStart({ task, status }: { task: ITask; status: statuses }) {
	dragAndDrop.handleDragStart(task, status);
}
</script>

<style scoped></style>
