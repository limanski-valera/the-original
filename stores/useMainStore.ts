import type { ITask } from '~/constants/interfaces';

import { statuses, fakeTasks, usersNames } from '~/constants/data';

export const useMainStore = defineStore('main', () => {
	const tasksList = ref<ITask[]>(fakeTasks);
	const users = ref(usersNames);

	const sortedTasksInTodo = computed(() => tasksList.value.filter((task) => task.status === statuses.TODO));
	const sortedTasksInProgress = computed(() => tasksList.value.filter((task) => task.status === statuses.PROGRESS));
	const sortedTasksInDone = computed(() => tasksList.value.filter((task) => task.status === statuses.DONE));
	const getTaskByTaskId = computed(() => (id: string | number) => tasksList.value.find((task) => task.id === id));

	function addTask(task: ITask) {
		tasksList.value.push(task);
	}

	function updateTask(task: ITask) {
		const index = tasksList.value.findIndex((t) => t.id === task.id);

		if (index === -1) throw 'Task for update not defined!';

		tasksList.value[index] = task;
	}

	function deleteTask(id: string | number) {
		tasksList.value = tasksList.value.filter((task) => task.id !== id);
	}

	function updateTaskStatus(taskId: string, status: statuses) {
		tasksList.value.forEach((task) => {
			if (task.id === taskId) {
				task.status = status;
			}
		});
	}

	return { users, sortedTasksInTodo, sortedTasksInProgress, sortedTasksInDone, getTaskByTaskId, addTask, updateTask, deleteTask, updateTaskStatus };
});
