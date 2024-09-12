<template>
	<ComboboxRoot v-model="value" class="relative" multiple>
		<ComboboxAnchor>
			<ComboboxTrigger
				class="flex gap-2 items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
				<span class="flex-grow text-left">{{ label }}</span>
				<ChevronDownIcon class="h-4 w-4 text-grass11" />
			</ComboboxTrigger>
		</ComboboxAnchor>

		<ComboboxContent
			class="absolute w-full mt-1 z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
			<ComboboxViewport class="p-[5px]">
				<ComboboxEmpty class="text-mauve8 text-xs font-medium text-center py-2" />

				<ComboboxGroup>
					<ComboboxItem
						v-for="(option, index) in list"
						:key="index"
						class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-grass9 data-[highlighted]:text-grass1"
						:value="option">
						<ComboboxItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
							<CheckIcon />
						</ComboboxItemIndicator>
						<span>
							{{ option }}
						</span>
					</ComboboxItem>
					<ComboboxSeparator class="h-[1px] bg-grass6 m-[5px]" />
				</ComboboxGroup>
			</ComboboxViewport>
		</ComboboxContent>
	</ComboboxRoot>
</template>

<script setup lang="ts">
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxItem, ComboboxItemIndicator, ComboboxRoot, ComboboxSeparator, ComboboxTrigger, ComboboxViewport } from 'radix-vue';
import { CheckIcon, ChevronDownIcon } from '@radix-icons/vue';

type TProps = {
	list: string[];
	label: string;
	modelValue: any;
};

const props = defineProps<TProps>();
const emits = defineEmits(['update:modelValue']);

const value = computed({
	get() {
		return props.modelValue;
	},
	set(v) {
		emits('update:modelValue', v);
	},
});
</script>

<style scoped></style>
