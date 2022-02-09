<template>
	<div class="flex flex-col p-3">
		<router-link class="py-2" v-for="({ name, path }, index) of projects" :to="path">
			{{ index + 1 }} &rarrc; {{ name }}
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Home',

	setup() {
		const projects = [
			{
				name: 'Ethereum Units Converter',
				path: '/convert'
			}
		]

		return {
			projects
		}
	}
})
</script>
