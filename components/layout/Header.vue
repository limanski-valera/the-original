<template>
	<header class="header p-5 border-b flex justify-between gap-10 items-center">
		<NuxtLink to="/">
			<h1 class="header__title font-bold uppercase text-xl">Task App</h1>
		</NuxtLink>
		<Button class="header__button" @click="$router.push('/create')">Create new task</Button>
	</header>
</template>

<script setup lang="ts"></script>

<style scoped></style>
