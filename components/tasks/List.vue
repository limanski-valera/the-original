<template>
	<div class="column p-3 rounded-lg bg-slate-200">
		<h3 class="column__label font-bold text-xl mb-2">{{ status }}</h3>
		<ul v-if="list.length" class="mb-3 flex flex-col gap-3">
			<li v-for="task in list" draggable="true" @dragstart="$emit('startDrag', { task, status })">
				<TasksListItem :key="task.id" :task="task" />
			</li>
		</ul>
		<div v-else class="mb-3">This column do not have tasks...</div>
		<Button class="flex items-center gap-1 w-full" @click="$router.push(`/create${status}`)"> <PlusIcon /> Add task </Button>
	</div>
</template>

<script setup lang="ts">
import type { ITask } from '@/constants/interfaces.ts';

import { PlusIcon } from '@radix-icons/vue';
import type { statuses } from '~/constants/data';

type TProps = {
	list: ITask[];
	status: statuses;
};

defineProps<TProps>();

defineEmits(['startDrag']);
</script>

<style scoped></style>
