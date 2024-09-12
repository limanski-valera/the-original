<template>
	<form @submit="onSubmit" class="flex flex-col gap-2 max-w-[36rem] mx-auto">
		<FormField v-slot="{ componentField }" name="title">
			<FormItem>
				<FormLabel>Title</FormLabel>
				<FormControl>
					<Input type="text" placeholder="Make some work" v-bind="componentField" />
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<FormField v-slot="{ componentField }" name="description">
			<FormItem>
				<FormLabel>Description</FormLabel>
				<FormControl>
					<Input type="text" placeholder="This is description" v-bind="componentField" />
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<FormField v-slot="{ componentField }" name="responsible">
			<FormItem>
				<FormLabel>Responsible</FormLabel>
				<FormControl>
					<Select v-bind="componentField">
						<SelectTrigger>
							<SelectValue placeholder="Select a responsible person" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem v-for="user in mainStore.users" :key="user" :value="user"> {{ user }} </SelectItem>
						</SelectContent>
					</Select>
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<FormField v-slot="{ componentField }" name="performer">
			<FormItem>
				<FormLabel>Performers</FormLabel>
				<FormControl>
					<Multiselect :label="performersSelectLabel" :list="mainStore.users" v-model:modelValue="selectedPerformers" />
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<FormField v-slot="{ componentField }" name="status">
			<FormItem>
				<FormLabel>Status</FormLabel>
				<FormControl>
					<Select v-bind="componentField">
						<SelectTrigger>
							<SelectValue placeholder="Select task status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem v-for="status in statuses" :key="status" :value="status"> {{ status }} </SelectItem>
						</SelectContent>
					</Select>
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<FormField v-slot="{ componentField }" name="priority">
			<FormItem>
				<FormLabel>Priority</FormLabel>
				<FormControl>
					<Select v-bind="componentField">
						<SelectTrigger>
							<SelectValue placeholder="Select priority" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem v-for="priority in priorities" :key="priority" :value="priority.toString()"> {{ priority }} </SelectItem>
						</SelectContent>
					</Select>
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<Button type="submit">{{ buttonText }}</Button>
	</form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

import { statuses, priorities } from '~/constants/data';
import type { ITask } from '~/constants/interfaces';

type TProps = {
	isNew: boolean;
};

const props = defineProps<TProps>();

const mainStore = useMainStore();
const route = useRoute();
const router = useRouter();

const performersSelectLabel = computed(() => (selectedPerformers.value.length ? selectedPerformers.value.join(', ') : 'Select user'));
const defaultTaskStatus = computed(() => (route.params.status ? route.params.status : statuses.TODO));
const buttonText = computed(() => (props.isNew ? 'Create' : 'Update'));

const formSchema = toTypedSchema(
	z.object({
		title: z.string().min(2).max(30),
		description: z.string().min(2).max(100),
		responsible: z.string().min(2).max(100),
		performers: z.array(z.string()),
		status: z.string(),
		priority: z.string(),
	})
);

const form = useForm({
	validationSchema: formSchema,
});

const selectedPerformers = computed({
	get() {
		return form.values.performers || [];
	},
	set(v) {
		form.setFieldValue('performers', v);
	},
});

const onSubmit = form.handleSubmit((values) => {
	const id = props.isNew ? Date.now().toString() : (route.params.id as string);

	const task: ITask = JSON.parse(JSON.stringify(values));
	task.id = id;

	props.isNew ? mainStore.addTask(task) : mainStore.updateTask(task);

	router.push('/');
});

function setStartValues() {
	form.setFieldValue('status', defaultTaskStatus.value as string);
	form.setFieldValue('priority', priorities.LOW);
}

function fillForm(taskId: string | number) {
	const task = mainStore.getTaskByTaskId(taskId);

	if (!task) return;

	form.setValues({
		title: task.title,
		description: task.description,
		responsible: task.responsible,
		performers: [...task.performers],
		status: task.status,
		priority: task.priority,
	});
}

onMounted(() => {
	route.params.id ? fillForm(route.params.id as string) : setStartValues();
});
</script>

<style scoped></style>
