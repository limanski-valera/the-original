<template>
	<ConfigProvider :use-id="useIdFunction">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'radix-vue';

useSeoMeta({
	title: 'Task App',
});

const useIdFunction = () => useId() as string;
</script>

<style scoped></style>
