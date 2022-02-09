import { nextTick } from '@vue/runtime-core'
import { createRouter, createWebHistory, Router, RouterHistory, RouteRecordRaw, isNavigationFailure } from 'vue-router'

import { appName } from '@/config.json'

import Home from '@/pages/Home.vue'
import Convert from '@/pages/Convert.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			title: 'Projects'
		}
	},
	{
		path: '/convert',
		name: 'Convert',
		component: Convert,
		meta: {
			title: 'Ether Units Conversion'
		}
	}
]

const history: RouterHistory = createWebHistory()

const router: Router = createRouter({ routes, history })

router.afterEach((to, from, failure) => {
	if (isNavigationFailure(failure)) {
		console.error('Failed Navigation!')
	}

	nextTick(() => {
		document.title = String(to.meta.title ? `${to.meta.title} • ${appName}` : appName)
	})
})

export default router
