<template>
	<Dialog>
		<DialogTrigger as-child>
			<div class="p-3 bg-white block rounded-xl shadow-md cursor-pointer hover:shadow-none hover:-translate-y-1 transition-all">{{ task.title }}</div>
		</DialogTrigger>
		<DialogContent class="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>{{ task.title }}</DialogTitle>
				<DialogDescription> {{ task.description }} </DialogDescription>
			</DialogHeader>
			<div class="flex flex-col gap-2 font-light">
				<div>
					Responsible person: <span class="font-bold">{{ task.responsible }}</span>
				</div>
				<div>
					Performers: <span class="font-bold">{{ performers }}</span>
				</div>
				<div>
					Status: <span class="font-bold">{{ task.status }}</span>
				</div>
				<div>
					Priority: <span class="font-bold">{{ task.priority }}</span>
				</div>
			</div>
			<DialogFooter class="block">
				<div class="flex gap-1 justify-end mb-2">
					<Button class="px-3" @click="$router.push(`/edit-${task.id}`)">
						<Pencil1Icon class="w-5 h-5" />
					</Button>
					<Button variant="destructive" class="px-3" @click="showDeleteButton = true">
						<EraserIcon class="w-5 h-5" />
					</Button>
				</div>
				<Button v-if="showDeleteButton" variant="destructive" class="w-full" @click="mainStore.deleteTask(task.id)">Are you sure?</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>

<script setup lang="ts">
import type { ITask } from '@/constants/interfaces.ts';

import { Pencil1Icon, EraserIcon } from '@radix-icons/vue';

type TProps = {
	task: ITask;
};

const props = defineProps<TProps>();

const mainStore = useMainStore();

const showDeleteButton = ref(false);

const performers = computed(() => props.task.performers.join(', '));
</script>

<style scoped></style>
