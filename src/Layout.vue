<template>
	<header class="bg-purple-700 text-white text-xl font-semibold py-3 px-4">
		{{ title }}
	</header>

	<router-view />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'Layout',

	setup() {
		const domain = 'web3.himanshupal.xyz'

		const { afterEach } = useRouter()
		const title = ref<string>()

		afterEach((to) => {
			switch (to.fullPath) {
				case '/convert':
					title.value = 'Ether Units Converter'
					break
				default:
					title.value = domain
			}
		})

		return {
			title
		}
	}
})
</script>

<style>
@import 'tailwindcss/tailwind.css';
@import url('https://fonts.googleapis.com/css2?&family=Special+Elite&family=Spartan&family=Abril+Fatface&display=swap');
</style>
