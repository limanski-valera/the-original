<template>
	<div class="page p-4 pt-5">
		<NuxtLink to="/" class="inline-flex gap-1 items-center cursor-pointer mb-5 hover:text-muted-foreground transition-colors"><ArrowLeftIcon /> Back to all tasks</NuxtLink>
		<h2 class="text-3xl font-medium text-center">Create new Task</h2>
		<TaskForm :is-new="true" />
	</div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from '@radix-icons/vue';

useSeoMeta({
	title: 'Create task',
});

definePageMeta({
	middleware: ['create-middleware'],
});
</script>

<style scoped></style>
