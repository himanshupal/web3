<template>
	<div class="flex">
		<div class="flex flex-col justify-center w-3/4">
			<div
				class="flex flex-col md:flex-row md:items-center p-3 w-full"
				v-for="({ base, name, sciName, computed }, index) of units"
				:key="name"
			>
				<div class="font-bold text-lg mr-2 md:w-60">
					{{ sciName }}
				</div>
				<label class="border-purple-700 border pt-1 px-2 flex-1 w-full">
					<input
						min="0"
						type="number"
						class="focus-visible:outline-none w-full"
						:placeholder="`Amount in ${name.toLowerCase()}`"
						@input="(e) => updateAmount(e, index)"
						:value="computed"
					/>
					<div class="text-xs text-purple-700">
						{{ name }}
						(10<sup> {{ base }} </sup>)
					</div>
				</label>
			</div>
		</div>
		<div class="w-1/4" />
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { multiply, divide, bignumber, format } from 'mathjs'

interface IUnit {
	base: number
	name: string
	sciName: string
	computed?: string
}

type IUnits = Array<IUnit>

export default defineComponent({
	name: 'Convert',

	setup() {
		const digits = 18

		const units = reactive<IUnits>([
			{
				base: 18,
				name: 'Attoether',
				sciName: 'Wei'
			},
			{
				base: 15,
				name: 'Femtoether',
				sciName: 'Kwei or Ada'
			},
			{
				base: 12,
				name: 'Picoether',
				sciName: 'Mwei or Babbage'
			},
			{
				base: 9,
				name: 'Nanoether',
				sciName: 'Gwei or Shannon'
			},
			{
				base: 6,
				name: 'Microether',
				sciName: 'Szabo or Micro'
			},
			{
				base: 3,
				name: 'Milliether',
				sciName: 'Finney or Milli'
			},
			{
				base: 0,
				name: 'Ether',
				sciName: 'Ether'
			}
		])

		const updateAmount = (e: Event, index: number) => {
			const amount = (e.currentTarget as HTMLInputElement).value || 0

			units.forEach(({ base }, idx) => {
				if (idx === index) {
					units[idx].computed = String(amount)
					return
				}

				if (idx < index) {
					units[idx].computed = format(multiply(bignumber(amount), bignumber(`1e${base + index * 3 - digits}`)), {
						lowerExp: -Infinity,
						upperExp: Infinity,
						notation: 'fixed'
					})
					return
				}

				{
					units[idx].computed = format(divide(bignumber(amount), bignumber(`1e${digits - base - index * 3}`)), {
						lowerExp: -Infinity,
						upperExp: Infinity,
						notation: 'fixed'
					})
				}
			})
		}

		return {
			units,
			updateAmount
		}
	}
})
</script>
